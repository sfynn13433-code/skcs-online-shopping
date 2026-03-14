// scripts/populate-products-from-ebay.ts
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Product {
  title: string;
  price: number;
  affiliate_url: string;
  image_url: string;
  category: string;
  description: string;
}

async function searchEbay(query: string): Promise<Product[]> {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&_sacat=0&_ipg=10`;
  console.log('🌐 Fetching URL:', url);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
  });

  const html = await res.text();
  console.log('📄 Response status:', res.status);
  console.log('📄 HTML preview (first 10000 chars):\n', html.substring(0, 10000));

  // Save full HTML to a file for debugging
  const filePath = path.join(__dirname, 'ebay_debug.html');
  fs.writeFileSync(filePath, html);
  console.log(`💾 Full HTML saved to ${filePath}`);

  const $ = cheerio.load(html);
  const products: Product[] = [];

  // Try multiple possible selectors (including new ones from the HTML)
  const itemSelectors = [
    '.s-item',
    '.lvresult',
    '.sresult',
    '.items__list li',
    '.srp-results .s-item',
    'li.s-item',
    'div[data-view*="srp"] .s-item',
    '.b-list__items__item',
    '.brwrvr__item-card'
  ];
  let items = $();
  for (const sel of itemSelectors) {
    items = $(sel);
    if (items.length > 0) {
      console.log(`🔍 Using selector "${sel}" – found ${items.length} items`);
      break;
    }
  }

  if (items.length === 0) {
    console.log('⚠️ No items found with any known selector');
    return [];
  }

  items.each((i, el) => {
    // Try multiple title selectors
    const titleSel = $(el).find('.s-item__title, .vip, .lvtitle, .title, a[href*="itm/"]').first().text().trim();
    if (!titleSel || titleSel.includes('Shop on eBay')) return;

    // Price extraction
    let priceText = $(el).find('.s-item__price, .lvprice, .bid, .price, .s-item__details .s-item__price').first().text().trim();
    priceText = priceText.replace(/[^0-9.]/g, '');
    const price = parseFloat(priceText) || 0;

    // URL
    let url = $(el).find('.s-item__link, a.vip, a[href*="itm/"]').attr('href');
    if (url && !url.startsWith('http')) {
      url = 'https://www.ebay.com' + url;
    }

    // Image
    let image = $(el).find('.s-item__image-img, img').attr('src');
    if (image && image.startsWith('//')) image = 'https:' + image;

    if (titleSel && url && image) {
      products.push({
        title: titleSel,
        price,
        affiliate_url: url.split('?')[0],
        image_url: image,
        category: 'TV',
        description: '',
      });
    }
  });

  console.log(`✅ Extracted ${products.length} products from eBay`);
  return products;
}

async function run() {
  try {
    console.log('🚀 Starting eBay TV product population...');
    const products = await searchEbay('Samsung 40 inch TV');

    if (products.length === 0) {
      console.log('❌ No products found – stopping.');
      return;
    }

    console.log(`📦 Inserting ${products.length} products into Supabase...`);

    for (const product of products) {
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('affiliate_url', product.affiliate_url)
        .maybeSingle();

      if (existing) {
        console.log(`⏭️ Skipping existing: ${product.title.substring(0, 50)}...`);
        continue;
      }

      const { error } = await supabase.from('products').insert(product);
      if (error) {
        console.error(`❌ Failed to insert ${product.title.substring(0, 50)}:`, error.message);
      } else {
        console.log(`✅ Inserted: ${product.title.substring(0, 50)}...`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('🎉 Done!');
  } catch (err) {
    console.error('💥 Fatal error:', err);
  }
}

run();