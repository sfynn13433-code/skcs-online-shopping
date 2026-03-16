"use client";

import { useEffect, useState } from "react";

interface Props {
  productId: string;
  currentPrice: number;
}

interface PredictionResponse {
  prediction?: "drop" | "rise" | "flat";
  predicted_price?: number;
  confidence?: number;
  window_days?: number;
  advisory?: string;
}

export default function PricePredictionCard({ productId, currentPrice }: Props) {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/price-prediction?product_id=${productId}`)
      .then((r) => r.json())
      .then(setPrediction)
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className="text-neutral-500 text-sm">Loading price prediction…</div>;
  if (!prediction || !prediction.prediction) return null;

  const confidence = prediction.confidence ?? 50;
  const color =
    confidence > 75 ? "text-green-400" : confidence >= 50 ? "text-yellow-300" : "text-neutral-400";

  const message =
    prediction.prediction === "drop"
      ? `Price may drop toward $${prediction.predicted_price} within ${prediction.window_days} days.`
      : prediction.prediction === "rise"
      ? `Price may increase toward $${prediction.predicted_price} within ${prediction.window_days} days.`
      : "Price looks stable based on recent history.";

  return (
    <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-4 space-y-2">
      <h4 className="text-sm font-semibold">AI Price Prediction</h4>
      <p className="text-neutral-400 text-sm">Current price: ${currentPrice.toFixed(2)}</p>
      <p className="text-white text-sm">{message}</p>
      <p className={`text-xs font-semibold ${color}`}>Confidence: {confidence}%</p>
      <p className="text-xs text-neutral-500">
        {prediction.advisory || "Predictions are estimates based on historical data."}
      </p>
    </div>
  );
}
