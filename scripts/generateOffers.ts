import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client with service role key
const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define types for our data
interface Product {
  id: number;
  title: string;
}

interface ExistingOffer {
  product_id: number;
  store: string;
}

interface NewOffer {
  product_id: number;
  store: string;
  price: number;
  affiliate_url: string;
}

// List of stores you want to add
const STORES: string[] = [
  'Amazon',
  'eBay',
  'AliExpress',
  'Takealot',
  'Wootware',
  'Evetech',
  'Makro',
  'Loot'
];

// Helper: random price between min and max
function randomPrice(min: number = 10, max: number = 3000): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// Helper: create a basic affiliate URL (replace with real tracking later)
function createAffiliateUrl(productTitle: string, store: string): string {
  const encodedTitle = encodeURIComponent(productTitle);
  switch (store.toLowerCase()) {
    case 'amazon':
      return `https://www.amazon.com/s?k=${encodedTitle}&tag=skcs-20`;
    case 'ebay':
      return `https://www.ebay.com/sch/i.html?_nkw=${encodedTitle}&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339123456&customid=&toolid=10001`;
    case 'aliexpress':
      return `https://www.aliexpress.com/wholesale?SearchText=${encodedTitle}&g=y&tag=skcs`;
    case 'takealot':
      return `https://www.takealot.com/pl/all?qsearch=${encodedTitle}&ref=skcs`;
    default:
      return `https://www.google.com/search?q=${encodedTitle}+${store}`;
  }
}

async function generateOffers(): Promise<void> {
  console.log("🚀 Starting offer generation...");

  // 1. Fetch all products from products_new
  const { data: products, error: productError } = await supabase
    .from('products_new')
    .select('id, title');

  if (productError) {
    console.error("❌ Error fetching products:", productError);
    return;
  }

  console.log(`📦 Found ${products.length} products`);

  // 2. Get existing offers to avoid duplicates
  const { data: existingOffers, error: existingError } = await supabase
    .from('product_offers')
    .select('product_id, store');

  if (existingError) {
    console.error("❌ Error fetching existing offers:", existingError);
    return;
  }

  const existingSet = new Set<string>();
  (existingOffers as ExistingOffer[]).forEach(offer => {
    existingSet.add(`${offer.product_id}-${offer.store}`);
  });

  // 3. Prepare new offers
  const newOffers: NewOffer[] = [];

  for (const product of products as Product[]) {
    // Decide number of offers for this product (2 to 4)
    const numOffers = Math.floor(Math.random() * 3) + 2;

    // Shuffle stores and pick unique ones
    const shuffled = [...STORES].sort(() => 0.5 - Math.random());
    const selectedStores = shuffled.slice(0, numOffers);

    for (const store of selectedStores) {
      const key = `${product.id}-${store}`;
      if (!existingSet.has(key)) {
        const price = randomPrice();
        const affiliateUrl = createAffiliateUrl(product.title, store);

        newOffers.push({
          product_id: product.id,
          store: store,
          price: price,
          affiliate_url: affiliateUrl
        });
        existingSet.add(key); // prevent duplicates within this run
      }
    }
  }

  console.log(`📝 Prepared ${newOffers.length} new offers to insert`);

  // 4. Insert in batches of 500
  const batchSize = 500;
  let inserted = 0;

  for (let i = 0; i < newOffers.length; i += batchSize) {
    const batch = newOffers.slice(i, i + batchSize);
    const { error } = await supabase
      .from('product_offers')
      .insert(batch);

    if (error) {
      console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
    } else {
      inserted += batch.length;
      console.log(`✅ Inserted batch ${i / batchSize + 1} (${batch.length} offers)`);
    }
  }

  console.log(`🎉 Done! Inserted ${inserted} new offers.`);
}

generateOffers().catch(console.error);