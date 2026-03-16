"use client";

import { useEffect, useMemo, useState } from "react";
import { useTier } from "@/hooks/useTier";
import { buildTrackedAffiliateLink } from "@/services/affiliateLinks";

interface AutoDeal {
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

export default function AutoDealHunter() {
  const { tier } = useTier();
  const [deals, setDeals] = useState<AutoDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const refreshMs = tier === "premium" ? 15000 : 45000;

    async function loadDeals(refresh = false) {
      try {
        const res = await fetch(`/api/auto-deals${refresh ? "?refresh=true" : ""}`);
        const json = await res.json();
        if (isMounted) setDeals(json.deals || []);
      } catch (error) {
        console.error("AutoDealHunter fetch failed", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDeals();
    const timer = setInterval(() => loadDeals(tier === "premium"), refreshMs);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [tier]);

  const visibleDeals = useMemo(
    () => (tier === "premium" ? deals.slice(0, 25) : deals.slice(0, 3)),
    [deals, tier]
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1">Auto Deal Hunter</p>
            <h3 className="text-3xl font-black">AI-detected underpriced gems</h3>
            <p className="text-neutral-400">
            Scans historical prices, highlights &gt;20% savings, and prioritizes premium visibility.
            </p>
          </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-semibold">
            ⭐ Premium AI Insight
          </span>
          <span className="text-xs text-neutral-500">
            {tier === "premium" ? "Real-time" : "Delayed"} refresh every{" "}
            {tier === "premium" ? "15s" : "45s"}
          </span>
        </div>
      </div>

      {loading && <p className="text-neutral-500">Scanning deals…</p>}
      {!loading && visibleDeals.length === 0 && (
        <p className="text-neutral-500">No qualifying deals right now. Check back soon.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleDeals.map((deal) => (
          <div
            key={deal.product_id}
            className="bg-neutral-900 border border-white/10 rounded-2xl p-4 flex flex-col shadow-lg"
          >
            <div className="h-40 bg-neutral-800 rounded-xl mb-3 overflow-hidden">
              {deal.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={deal.image_url} alt={deal.product_title || "deal"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700">AI Deal</div>
              )}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{deal.store || "Marketplace"}</p>
            <h4 className="text-lg font-semibold line-clamp-2 mb-2">{deal.product_title || "Verified product"}</h4>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-red-500 text-black text-xs font-bold">
                {deal.discount_percent}% OFF
              </span>
              <span className="px-2 py-1 rounded-full bg-neutral-800 text-xs text-white">
                Confidence {deal.confidence}%
              </span>
            </div>
            <p className="text-xl font-black text-cyan-400 mb-1">${deal.current_price.toFixed(2)}</p>
            <p className="text-xs text-neutral-500 mb-3">
              Avg: ${deal.market_average.toFixed(2)} • Detected {new Date(deal.detected_at).toLocaleTimeString()}
            </p>
            <a
              href={buildTrackedAffiliateLink({
                url: deal.affiliate_url || "#",
                title: deal.product_title || "Deal",
                store: deal.store || "partner",
                productId: deal.product_id,
              })}
              className="mt-auto inline-flex justify-center px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-cyan-500 hover:text-white transition"
            >
              Shop Now
            </a>
          </div>
        ))}
      </div>

      {tier === "normal" && deals.length > 3 && (
        <div className="mt-6 bg-neutral-900 border border-cyan-500/40 text-white rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Premium unlocks 25 AI deals plus live price-drop alerts.</p>
            <p className="text-sm text-neutral-400">Upgrades also speed up refreshes.</p>
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
