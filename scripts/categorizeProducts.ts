import { createClient } from "@supabase/supabase-js";
import { categorizeProduct } from "../src/lib/categorizeProduct";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function categorizeAllProducts() {

  console.log("Fetching products...");

  const { data: products, error } = await supabase
    .from("products")
    .select("id,title");

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  if (!products || products.length === 0) {
    console.log("No products found.");
    return;
  }

  console.log(`Found ${products.length} products`);

  let updated = 0;
  let skipped = 0;

  for (const product of products) {

    // Skip rows with missing id
    if (!product.id) {
      console.log(`⚠ Skipping product with missing ID: ${product.title}`);
      skipped++;
      continue;
    }

    // Skip rows with missing title
    if (!product.title) {
      console.log(`⚠ Skipping product with missing title (id: ${product.id})`);
      skipped++;
      continue;
    }

    const category = categorizeProduct(product.title);

    const { error: updateError } = await supabase
      .from("products")
      .update({ category })
      .eq("id", product.id);

    if (updateError) {
      console.error(`❌ Error updating ${product.title}`, updateError);
    } else {
      console.log(`✔ ${product.title} → ${category}`);
      updated++;
    }
  }

  console.log("");
  console.log("========== RESULT ==========");
  console.log(`Products updated: ${updated}`);
  console.log(`Products skipped: ${skipped}`);
  console.log("✅ Categorization complete.");
}

categorizeAllProducts();