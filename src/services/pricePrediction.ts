import { supabase } from "@/lib/supabase";

export interface PricePrediction {
  prediction: "drop" | "rise" | "flat";
  predicted_price: number;
  confidence: number;
  window_days: number;
}

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

export async function predictPrice(productId: string): Promise<PricePrediction | null> {
  const { data, error } = await supabase
    .from("price_history")
    .select("price")
    .eq("product_id", productId)
    .order("recorded_at", { ascending: true })
    .limit(30);

  if (error || !data || data.length < 3) return null;

  const prices = data.map((d) => Number(d.price || 0));
  const trend = linearTrend(prices);
  const current = prices[prices.length - 1];
  let prediction: PricePrediction["prediction"] = "flat";
  let predicted_price = current;
  let confidence = 50;

  if (trend < -1) {
    prediction = "drop";
    predicted_price = Math.max(0, current + trend * 3);
    confidence = Math.min(90, 60 + Math.abs(trend) * 5);
  } else if (trend > 1) {
    prediction = "rise";
    predicted_price = current + trend * 3;
    confidence = Math.min(85, 55 + trend * 4);
  }

  return {
    prediction,
    predicted_price: Number(predicted_price.toFixed(2)),
    confidence,
    window_days: 7,
  };
}

