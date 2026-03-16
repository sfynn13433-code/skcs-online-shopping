import { supabase } from "@/lib/supabase";
import { detectDeals } from "@/ai/dealDetector";

// Placeholder cron job for price updates (hook into your scheduler)
// Intended to run hourly
export async function updatePricesJob() {
  // 1. Fetch marketplace data (integrate adapters) - placeholder
  const { data: products } = await supabase
    .from("products")
    .select("id,title,price,brand,image_url,affiliate_url,store");

  if (!products) return;

  // 2. Insert into price_history (simplified)
  for (const p of products) {
    await supabase.from("price_history").insert({
      product_id: p.id,
      store: (p as any).store || p.brand || "store",
      price: p.price,
      currency: "USD",
    });
  }

  // 3. Recalculate deal flags and populate live_deals
  const avg = products.reduce((s, p) => s + (p.price || 0), 0) / (products.length || 1);
  const deals = detectDeals(products as any, avg).filter((d) => d.badge === "hot");

  for (const d of deals) {
    await supabase.from("live_deals").upsert({
      product_id: d.id,
      product_title: d.title,
      store: d.store,
      price: d.price,
      currency: "USD",
      discount_percent: ((avg - d.price) / avg) * 100,
      image_url: d.image,
      affiliate_url: d.affiliateUrl,
      detected_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    });
  }
}
