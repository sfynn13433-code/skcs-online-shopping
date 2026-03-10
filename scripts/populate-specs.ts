import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

console.log('SCRIPT STARTED - populate-specs.ts');

// --- Validate environment variables ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// --- Initialize Supabase client ---
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Helper: extract specs from a product URL ---
async function extractSpecs(url: string): Promise<Array<{ name: string; value: string }>> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const specs: Array<{ name: string; value: string }> = [];

    // eBay specific selectors – adjust if needed
    $('#productDetails_techSpec_section_1 tr').each((i, el) => {
      const name = $(el).find('th').text().trim();
      const value = $(el).find('td').text().trim();
      if (name && value) specs.push({ name, value });
    });

    $('.ux-layout-section__row').each((i, el) => {
      const name = $(el).find('.ux-labels-values__labels').text().trim();
      const value = $(el).find('.ux-labels-values__values').text().trim();
      if (name && value) specs.push({ name, value });
    });

    $('.product-specs tr').each((i, el) => {
      const name = $(el).find('th').text().trim();
      const value = $(el).find('td').text().trim();
      if (name && value) specs.push({ name, value });
    });

    return specs;
  } catch (err) {
    console.error(`Spec extraction failed for ${url}:`, err instanceof Error ? err.message : err);
    return [];
  }
}

// --- Main function ---
async function run() {
  try {
    console.log('Fetching products...');

    const { data: products, error } = await supabase
      .from('products')
      .select('id, title, affiliate_url');

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!products || products.length === 0) {
      console.log('No products found');
      return;
    }

    console.log(`Found ${products.length} products`);

    // Process products sequentially to avoid overwhelming the target server
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      if (!product.affiliate_url) {
        console.log(`Skipping "${product.title}" (no affiliate_url)`);
        continue;
      }

      console.log(`Processing (${i + 1}/${products.length}): ${product.title}`);

      const specs = await extractSpecs(product.affiliate_url);

      if (!specs.length) {
        console.log('  No specs found');
        continue;
      }

      console.log(`  Found ${specs.length} specs, inserting...`);

      // Insert specs in batches of 100 to reduce number of database calls
      const batchSize = 100;
      for (let j = 0; j < specs.length; j += batchSize) {
        const batch = specs.slice(j, j + batchSize).map((spec) => ({
          product_id: product.id,
          name: spec.name,
          value: spec.value,
        }));

        const { error: insertError } = await supabase
          .from('product_specs')
          .insert(batch);

        if (insertError) {
          console.error(`  Batch insert failed for product ${product.id}:`, insertError.message);
          // Continue with next product or batch? Here we break to avoid partial data
          break;
        }
      }

      console.log(`  Inserted ${specs.length} specs`);

      // Small delay to be polite to the target server
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log('DONE');
  } catch (err) {
    console.error('Fatal error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

// --- Execute and ensure clean exit ---
run().finally(() => {
  // If using a Supabase client that holds connections (e.g., realtime), close them here.
  // The standard @supabase/supabase-js is stateless (HTTP), so no explicit close is needed.
  // However, we still exit to let Node finish any pending microtasks.
  process.exit(0);
});