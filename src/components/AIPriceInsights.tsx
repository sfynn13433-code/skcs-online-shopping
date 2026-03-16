"use client";

import { useEffect, useMemo, useState } from "react";
import { useTier } from "@/hooks/useTier";
import { buildTrackedAffiliateLink } from "@/services/affiliateLinks";

interface Insight {
  product_id: string;
  title: string;
  current_price: number;
  store?: string | null;
  image_url?: string | null;
  affiliate_url?: string | null;
  prediction: {
    prediction: "drop" | "rise" | "flat";
    predicted_price: number;
    confidence: number;
    window_days: number;
    advisory: string;
  };
}

function predictionCopy(insight: Insight) {
  const { prediction, predicted_price, window_days } = insight.prediction;
  if (prediction === "drop") return `Price may drop toward $${predicted_price} in ~${window_days} days.`;
  if (prediction === "rise") return `Price may rise toward $${predicted_price} in ~${window_days} days.`;
  return "Price looks stable based on recent data.";
}

export default function AIPriceInsights() {
  const { tier } = useTier();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<string | undefined>();

  useEffect(() => {
    let isMounted = true;
    fetch("/api/price-insights")
      .then((r) => r.json())
      .then((res) => {
        if (isMounted) {
          setInsights(res.insights || []);
          setSummary(res.summary);
        }
      })
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const visible = useMemo(() => (tier === "premium" ? insights.slice(0, 6) : insights.slice(0, 3)), [insights, tier]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1">AI Price Insights</p>
          <h3 className="text-3xl font-black">Forward-looking price signals</h3>
          <p className="text-neutral-400">
            Uses historical trends, volatility, and recent discounts to highlight potential moves. Predictions are never guaranteed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-semibold">
            ⭐ Premium AI Insight
          </span>
          <span className="text-xs text-neutral-500">{tier === "premium" ? "Advanced predictions" : "Basic snapshot"}</span>
        </div>
      </div>

      {loading && <p className="text-neutral-500">Generating AI price insights…</p>}
      {!loading && summary && (
        <p className="text-sm text-neutral-300 mb-4 border-l-4 border-cyan-500/60 pl-4">
          {summary}
        </p>
      )}
      {!loading && visible.length === 0 && (
        <p className="text-neutral-500">No predictions available. Try again after more price data is recorded.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((insight) => (
          <div key={insight.product_id} className="bg-neutral-900 border border-white/10 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{insight.store || "Marketplace"}</p>
              <span className="px-2 py-1 text-[11px] rounded-full bg-neutral-800 text-white">
                Confidence {insight.prediction.confidence}%
              </span>
            </div>
            <h4 className="text-lg font-semibold mb-1 line-clamp-2">{insight.title}</h4>
            <p className="text-xl font-black text-cyan-400 mb-2">${insight.current_price.toFixed(2)}</p>
            <p className="text-sm text-white mb-2">{predictionCopy(insight)}</p>
            <p className="text-xs text-neutral-500 mb-4">
              {insight.prediction.advisory || "AI suggests waiting or acting with caution; prices may change."}
            </p>
            <a
              href={buildTrackedAffiliateLink({
                url: insight.affiliate_url || "#",
                title: insight.title,
                store: insight.store || "partner",
                productId: insight.product_id,
              })}
              className="mt-auto inline-flex justify-center px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-cyan-500 hover:text-white transition"
            >
              View Offer
            </a>
          </div>
        ))}
      </div>

      {tier === "normal" && insights.length > 3 && (
        <div className="mt-6 bg-neutral-900 border border-cyan-500/40 text-white rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Premium unlocks advanced predictions, confidence scores, and price-drop alerts.</p>
            <p className="text-sm text-neutral-400">Stay ahead of upcoming moves instead of reacting late.</p>
          </div>
          <a
            href="/pricing"
            className="px-5 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
          >
            Upgrade
          </a>
        </div>
      )}
    </section>
  );
}
