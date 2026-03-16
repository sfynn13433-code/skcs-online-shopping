import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { getCache, setCache } from "@/lib/redis";
import { ensureAmazonAffiliateTag } from "./affiliateLinks";

export interface AutoDeal {
  product_id: string;
  product_title?: string | null;
  store?: string | null;
  market_average: number;
  current_price: number;
  discount_percent: number;
  confidence: number;
  affiliate_url?: string | null;
  image_url?: string | null;
  detected_at: string;
}

const CACHE_KEY = "auto_deal_hunter:v1";
const AUTO_DEAL_TTL_SECONDS = 300; // 5 minutes

const hasServiceRole = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabaseServiceRole = hasServiceRole
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  : null;

async function fetchRecentPrices() {
  const { data, error } = await supabase
    .from("price_history")
    .select("product_id, price, recorded_at")
    .order("recorded_at", { ascending: false })
    .limit(800);

  if (error) {
    console.error("price_history fetch failed", error);
    return [];
  }

  return data || [];
}

async function fetchProducts(productIds: string[]) {
  if (productIds.length === 0) return [];

  const { data, error } = await supabase
    .from("products")
    .select("id,title,price,affiliate_url,image_url,store")
    .in("id", productIds);

  if (error) {
    console.error("products fetch failed", error);
    return [];
  }

  return data || [];
}

function calculateConfidence(discountPercent: number, samples: number, volatility: number) {
  const discountScore = Math.min(60, discountPercent * 250); // 0.24 -> 60
  const sampleScore = Math.min(20, samples * 1.5);
  const stabilityScore = Math.max(0, 20 - Math.min(20, volatility * 100));
  return Math.min(100, Math.round(discountScore + sampleScore + stabilityScore));
}

export async function runAutoDealHunter(): Promise<AutoDeal[]> {
  const cached = await getCache<AutoDeal[]>(CACHE_KEY);
  if (cached) return cached;

  const priceRows = await fetchRecentPrices();

  const grouped = new Map<
    string,
    { prices: number[]; timestamps: string[] }
  >();

  for (const row of priceRows) {
    const key = row.product_id as string;
    if (!grouped.has(key)) grouped.set(key, { prices: [], timestamps: [] });
    grouped.get(key)!.prices.push(Number(row.price));
    grouped.get(key)!.timestamps.push(row.recorded_at as string);
  }

  const productIds = Array.from(grouped.keys());
  const products = await fetchProducts(productIds);
  const productById = new Map(products.map((p) => [p.id, p]));

  const deals: AutoDeal[] = [];

  for (const [productId, payload] of grouped.entries()) {
    const prices = payload.prices;
    if (prices.length < 3) continue;

    const marketAverage = prices.reduce((a, b) => a + b, 0) / prices.length;
    const currentPrice = prices[0];
    const discountPercent = (marketAverage - currentPrice) / marketAverage;

    const mean = marketAverage;
    const variance =
      prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) / prices.length;
    const volatility = Math.sqrt(variance) / Math.max(mean, 1);

    const confidence = calculateConfidence(discountPercent, prices.length, volatility);

    if (discountPercent <= 0.2 || confidence <= 60) continue;

    const product = productById.get(productId);
    const affiliate = ensureAmazonAffiliateTag(product?.affiliate_url || "");

    deals.push({
      product_id: productId,
      product_title: product?.title || null,
      store: product?.store || null,
      market_average: Number(marketAverage.toFixed(2)),
      current_price: Number(currentPrice.toFixed(2)),
      discount_percent: Number((discountPercent * 100).toFixed(1)),
      confidence,
      affiliate_url: affiliate,
      image_url: product?.image_url || null,
      detected_at: new Date().toISOString(),
    });
  }

  const sortedDeals = deals
    .sort((a, b) => b.discount_percent - a.discount_percent)
    .slice(0, 30);

  if (sortedDeals.length > 0 && supabaseServiceRole) {
    await supabaseServiceRole.from("auto_deals").upsert(sortedDeals, { onConflict: "product_id" });
  }

  await setCache(CACHE_KEY, sortedDeals, AUTO_DEAL_TTL_SECONDS);
  return sortedDeals;
}

export async function getAutoDeals(): Promise<AutoDeal[]> {
  const cached = await getCache<AutoDeal[]>(CACHE_KEY);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("auto_deals")
    .select("*")
    .order("discount_percent", { ascending: false })
    .limit(30);

  if (!error && data && data.length > 0) {
    await setCache(CACHE_KEY, data, AUTO_DEAL_TTL_SECONDS);
    return data;
  }

  return runAutoDealHunter();
}
