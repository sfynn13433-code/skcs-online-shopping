import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Check for required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Log warning instead of crashing build
if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase environment variables");
}

// Create client safely (prevents build failure)
const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function GET() {
  try {
    console.log("Fetching products from Supabase...");

    // Extra safety check
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase configuration missing" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .select("id, title, price, discount_price, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log(`Found ${data?.length || 0} products`);

    const formatPrice = (price: number) => {
      return `R ${price.toLocaleString("en-ZA")}`;
    };

    const products = (data || []).map((product) => ({
      id: product.id,
      title: product.title,
      price: formatPrice(product.discount_price ?? product.price),
      store: "Unknown",
      image: "/placeholder-product.png",
      affiliate_url: "#",
    }));

    return NextResponse.json(products);
  } catch (err) {
    console.error("Unexpected server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}