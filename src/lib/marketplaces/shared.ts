import { supabase } from "../supabase";
import { MarketplaceProduct } from "./types";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";

export async function fetchStoreProducts(
  store: string,
  query: string
): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("title,price,rating,image_url,affiliate_url,store,product_url,review_count,popularity")
    .ilike("store", store)
    .ilike("title", `%${query}%`)
    .limit(20);

  if (error || !data) return [];

  return data.map((p) => ({
    title: p.title,
    price: Number(p.price || 0),
    rating: p.rating,
    image: p.image_url,
    store: p.store || store,
    productUrl: ensureAmazonAffiliateTag(p.product_url || p.affiliate_url || "#"),
    affiliateUrl: ensureAmazonAffiliateTag(p.affiliate_url || p.product_url || "#"),
    reviewCount: (p as any).review_count ?? null,
    popularity: (p as any).popularity ?? null,
  }));
}
