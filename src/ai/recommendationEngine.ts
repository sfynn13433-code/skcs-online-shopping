import { supabase } from "@/lib/supabase";
import { MarketplaceProduct } from "@/lib/marketplaces/types";

export async function getRecommendations(userId?: string, limit = 12): Promise<MarketplaceProduct[]> {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("user_activity")
    .select("category")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  const topCategory = data?.[0]?.category;

  if (error || !topCategory) return [];

  const { data: products } = await supabase
    .from("products")
    .select("title,price,rating,image_url,brand,affiliate_url")
    .ilike("category", `%${topCategory}%`)
    .limit(limit);

  return (
    products?.map((p) => ({
      title: p.title,
      price: Number(p.price || 0),
      rating: p.rating,
      image: p.image_url,
      store: p.brand || "Marketplace",
      productUrl: p.affiliate_url || "#",
      affiliateUrl: p.affiliate_url || "#",
    })) || []
  );
}

