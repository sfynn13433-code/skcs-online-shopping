import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, title, price, discount_price, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    // Convert database fields → frontend format
    const products = data.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.discount_price ?? product.price,
      original_price: product.price,
      affiliate_url: "#", // placeholder until affiliate links are added
    }));

    return NextResponse.json(products);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}