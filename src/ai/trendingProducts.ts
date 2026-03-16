import { supabase } from "@/lib/supabase";
import { MarketplaceProduct } from "@/lib/marketplaces/types";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";

export interface TrendingProduct extends MarketplaceProduct {
  trendScore: number;
}

export async function getTrendingProducts(limit = 20): Promise<TrendingProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,title,price,rating,image_url,brand,affiliate_url")
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((p) => {
    const trendScore = 50;
    return {
      title: p.title,
      price: Number(p.price || 0),
      rating: p.rating,
      image: p.image_url,
      store: p.brand || "Marketplace",
      productUrl: ensureAmazonAffiliateTag(p.affiliate_url || "#"),
      affiliateUrl: ensureAmazonAffiliateTag(p.affiliate_url || "#"),
      trendScore,
    };
  });
}
