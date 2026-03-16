import { supabase } from "@/lib/supabase";
import { getCache, setCache } from "@/lib/redis";

export interface PricePrediction {
  prediction: "drop" | "rise" | "flat";
  predicted_price: number;
  confidence: number;
  window_days: number;
  advisory: string;
}

const CACHE_WINDOW_SECONDS = 15 * 60; // 15 minutes

function linearTrend(prices: number[]) {
  if (prices.length < 2) return 0;
  const n = prices.length;
  const xMean = (n - 1) / 2;
  const yMean = prices.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (prices[i] - yMean);
    den += (i - xMean) ** 2;
  }
  return den === 0 ? 0 : num / den;
}

function volatility(prices: number[]) {
  if (prices.length < 2) return 0;
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance =
    prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) / prices.length;
  return Math.sqrt(variance) / Math.max(mean, 1);
}

function recentDiscount(prices: number[]) {
  if (prices.length < 4) return 0;
  const last = prices[prices.length - 1];
  const avgPrevious = prices.slice(0, -1).reduce((a, b) => a + b, 0) / (prices.length - 1);
  return (avgPrevious - last) / Math.max(avgPrevious, 1);
}

export async function predictPrice(productId: string): Promise<PricePrediction | null> {
  const cacheKey = `price_prediction:${productId}`;
  const cached = await getCache<PricePrediction>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("price_history")
    .select("price")
    .eq("product_id", productId)
    .order("recorded_at", { ascending: true })
    .limit(45);

  if (error || !data || data.length < 3) return null;

  const prices = data.map((d) => Number(d.price || 0));
  const trend = linearTrend(prices);
  const vol = volatility(prices);
  const discountSignal = recentDiscount(prices);
  const current = prices[prices.length - 1];

  let prediction: PricePrediction["prediction"] = "flat";
  let predicted_price = current;

  if (trend < -0.6 || discountSignal > 0.08) {
    prediction = "drop";
    predicted_price = Math.max(0, current * (1 - Math.min(0.12, Math.abs(trend) * 0.08 + discountSignal)));
  } else if (trend > 0.6) {
    prediction = "rise";
    predicted_price = current * (1 + Math.min(0.15, trend * 0.08 + vol * 0.5));
  }

  const confidenceBase = Math.min(80, Math.abs(trend) * 12 + discountSignal * 120);
  const stability = Math.max(5, 25 - vol * 100);
  const confidence = Math.min(100, Math.round(confidenceBase + stability));

  const payload: PricePrediction = {
    prediction,
    predicted_price: Number(predicted_price.toFixed(2)),
    confidence,
    window_days: prediction === "flat" ? 10 : 5,
    advisory: "Predictions are estimates based on historical data and may change with market movements.",
  };

  await setCache(cacheKey, payload, CACHE_WINDOW_SECONDS);
  return payload;
}
