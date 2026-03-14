import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

/*
---------------------------------------
SUPABASE CONNECTION
---------------------------------------
Supports both service role and anon key
*/

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("❌ NEXT_PUBLIC_SUPABASE_URL is missing in .env.local");
}

if (!supabaseKey) {
  throw new Error("❌ SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env.local");
}

const supabase = createClient(supabaseUrl, supabaseKey);

/*
---------------------------------------
AMAZON SETTINGS
---------------------------------------
(used later when we connect real API)
*/

const AMAZON_HOST = "webservices.amazon.com";
const AMAZON_REGION = "us-east-1";
const AMAZON_SERVICE = "ProductAdvertisingAPI";

/*
---------------------------------------
INSERT PRODUCT FUNCTION
---------------------------------------
*/

async function insertProduct(product: any) {
  try {
    const { data: inserted, error } = await supabase
      .from("products")
      .insert({
        title: product.title,
        image: product.image,
        brand: product.brand,
        category: product.category
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Product insert failed:", error.message);
      return;
    }

    if (!inserted) return;

    const { error: offerError } = await supabase
      .from("product_offers")
      .insert({
        product_id: inserted.id,
        store: "amazon",
        price: product.price,
        affiliate_url: product.url
      });

    if (offerError) {
      console.error("❌ Offer insert failed:", offerError.message);
    }

    console.log("✅ Imported:", product.title);

  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

/*
---------------------------------------
IMPORT RUNNER
---------------------------------------
*/

async function runImporter() {

  console.log("🚀 Starting Amazon Import...");

  const products = [
    {
      title: "Samsung Galaxy S24 Smartphone",
      price: 799,
      image: "https://m.media-amazon.com/images/I/71rK0dY7GLL._AC_SL1500_.jpg",
      brand: "Samsung",
      category: "smartphone",
      url: "https://www.amazon.com/dp/B0CMDR7R2J?tag=skcsshopping2-20"
    },
    {
      title: "Dell XPS 13 Laptop",
      price: 1199,
      image: "https://m.media-amazon.com/images/I/71zWJr9L8FL._AC_SL1500_.jpg",
      brand: "Dell",
      category: "laptop",
      url: "https://www.amazon.com/dp/B09FX4QZNT?tag=skcsshopping2-20"
    }
  ];

  for (const p of products) {
    await insertProduct(p);
  }

  console.log("✅ Import completed");
}

/*
---------------------------------------
START SCRIPT
---------------------------------------
*/

runImporter();