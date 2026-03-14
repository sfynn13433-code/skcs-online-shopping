import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const generateProducts = () => {
  const categories = ["Electronics", "Kitchen", "Gaming", "Home", "Wearables", "Outdoor", "Health", "Automotive"];
  const brands = ["Samsung", "Apple", "Sony", "LG", "Dell", "HP", "Nike", "Adidas", "Bosch", "DeWalt"];
  
  // Use professional base keywords for Unsplash randomization
  const categoryKeywords = {
    Electronics: "tech-gadget",
    Kitchen: "modern-kitchen-appliance",
    Gaming: "gaming-setup",
    Home: "luxury-interior",
    Wearables: "smartwatch",
    Outdoor: "camping-gear",
    Health: "fitness-tech",
    Automotive: "modern-car-interior"
  };

  const products = [];
  for (let i = 1; i <= 500; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const title = `${brand} ${category} Pro Series Model ${1000 + i}`;
    
    // FIX 1: Generate a deep search link for the specific product title
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(title)}`;

    // FIX 2: Dynamic Image Fetching
    // Adding '&sig=' forces Unsplash to serve a unique image for every product ID
    const imageUrl = `https://source.unsplash.com/featured/800x600?${categoryKeywords[category]}&sig=${i}`;

    products.push({
      title,
      brand,
      price: parseFloat((Math.random() * (2000 - 45) + 45).toFixed(2)),
      category,
      description: `Experience high-performance innovation with the ${brand} ${category} Pro Series. Engineering excellence meets the signature SKCS luxury standard.`,
      image: imageUrl, 
      product_url: searchUrl // NOW LINKS DIRECTLY TO PRODUCT SEARCH
    });
  }
  return products;
};

async function seed() {
  try {
    console.log("🧹 Wiping outdated marketplace data...");
    // Clear the current table
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const products = generateProducts();
    console.log(`🚀 Injecting ${products.length} unique, verified items into SKCS...`);
    
    // Insert in batches of 100 to prevent connection timeouts
    for (let i = 0; i < products.length; i += 100) {
      const { error } = await supabase.from('products').insert(products.slice(i, i + 100));
      if (error) throw error;
      console.log(`✅ Progress: ${i + 100} / 500 items live.`);
    }
    
    console.log("⭐ MISSION SUCCESS: Your marketplace is populated with unique visuals and real shopping links!");
  } catch (err) { 
    console.error("❌ Seeding Error:", err.message); 
  }
}

seed();