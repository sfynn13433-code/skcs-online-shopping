const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// ==========================================
// 1. YOUR KEYS 
// ==========================================
const SUPABASE_URL = 'https://iyowygnnygzodueirxys.supabase.co';
// Use SERVICE_ROLE_KEY for imports to bypass any RLS blocks
const SUPABASE_SERVICE_ROLE_KEY = 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE'; 
const RAINFOREST_API_KEY = '05A3648C712E45698F3DB78A9BFE5FBD';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const AMAZON_AFFILIATE_TAG = 'skcsshopping2-20';

// 3. The 10 High-Converting Hit List
const topSearches = [
  { term: 'Wireless Earbuds', category: 'Electronics', group: 'Headphones & Audio' },
  { term: 'Air Fryer', category: 'Home & Kitchen', group: 'Kitchen Appliances' },
  { term: 'Smart Watch', category: 'Electronics', group: 'Wearable Technology' },
  { term: 'Vitamin C Serum', category: 'Beauty & Personal Care', group: 'Skin Care' },
  { term: 'Protein Powder', category: 'Health & Household', group: 'Vitamins & Supplements' },
  { term: 'Yoga Mat', category: 'Sports & Outdoors', group: 'Fitness Equipment' },
  { term: 'Portable Power Bank', category: 'Cell Phones & Accessories', group: 'Power Banks' },
  { term: 'Dog Treats', category: 'Pet Supplies', group: 'Dog Supplies' },
  { term: 'Coffee Maker', category: 'Home & Kitchen', group: 'Kitchen Appliances' },
  { term: 'Bluetooth Speaker', category: 'Electronics', group: 'Headphones & Audio' }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runBestsellerImport() {
  console.log('🚀 Starting SKCS Global Import...');
  let totalImported = 0;

  for (const target of topSearches) {
    console.log(`\nSearching Amazon for: ${target.term}...`);

    try {
      const response = await axios.get('https://api.rainforestapi.com/request', {
        params: {
          api_key: RAINFOREST_API_KEY,
          type: 'search',
          amazon_domain: 'amazon.com',
          search_term: target.term,
          sort_by: 'featured'
        }
      });

      const searchResults = response.data.search_results;
      
      if (!searchResults || searchResults.length === 0) {
        console.log(`No results for ${target.term}.`);
        continue;
      }

      const top10 = searchResults.slice(0, 10);
      
      const formattedBatch = top10.map(product => {
        const baseUrl = product.link;
        // ✅ YOUR AFFILIATE TAG LOGIC
        const affiliateUrl = baseUrl.includes('?') 
          ? `${baseUrl}&tag=${AMAZON_AFFILIATE_TAG}` 
          : `${baseUrl}?tag=${AMAZON_AFFILIATE_TAG}`;

        return {
          title: product.title, // Changed from listing_title to title to match website
          brand: product.brand || 'SKCS Verified',
          price: product.price ? product.price.value : null, 
          category: target.category, 
          product_group: target.group, 
          affiliate_url: affiliateUrl,
          store: 'Amazon',
          image_url: product.image
        };
      }).filter(p => p.price !== null && p.image_url); 

      if (formattedBatch.length > 0) {
        // Send directly to the main 'products' table
        const { error } = await supabase
          .from('products') 
          .insert(formattedBatch);

        if (error) {
          console.error(`❌ DB Error:`, error.message);
        } else {
          console.log(`✅ Success: Added ${formattedBatch.length} items to ${target.term}`);
          totalImported += formattedBatch.length;
        }
      }

      await sleep(1500); // Respect API limits

    } catch (error) {
      console.error(`Error:`, error.message);
    }
  }

  console.log(`\n=== MISSION COMPLETE ===`);
  console.log(`Total SKCS Inventory Increased by: ${totalImported} products`);
}

runBestsellerImport();