import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase environment variables");
}

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase configuration missing" },
        { status: 500 }
      );
    }

    console.log("Fetching products with offers...");

    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        title,
        category,
        image,
        created_at,
        product_offers (
          price,
          affiliate_url,
          store
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const formatPrice = (price: number | null) => {
      if (!price) return "R 0";
      return `R ${price.toLocaleString("en-ZA")}`;
    };

    const products =
      data?.map((product) => {
        const offer = product.product_offers?.[0];

        return {
          id: product.id ?? `fallback-${Math.random()}`,
          title: product.title ?? "Unknown Product",
          price: formatPrice(offer?.price ?? null),
          store: offer?.store ?? "Marketplace",
          image: product.image ?? "/placeholder-product.png",
          affiliate_url: ensureAmazonAffiliateTag(offer?.affiliate_url ?? "#"),
          category: product.category ?? "Other",
        };
      }) || [];

    console.log(`Returned ${products.length} products`);

    return NextResponse.json(products);
  } catch (err) {
    console.error("Unexpected server error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
