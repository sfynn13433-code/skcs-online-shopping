"use client";

import { useEffect, useState } from "react";
import { useTier } from "@/hooks/useTier";
import Link from "next/link";

interface Deal {
  product_title: string;
  store: string;
  price: number;
  discount_percent: number;
  image_url?: string | null;
  affiliate_url: string;
}

export default function LiveDealsFeed() {
  const { tier } = useTier();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/live-deals")
      .then((r) => r.json())
      .then((res) => setDeals(res.deals || []))
      .finally(() => setLoading(false));
  }, []);

  const visibleDeals = tier === "premium" ? deals.slice(0, 20) : deals.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1">Live Feed</p>
          <h3 className="text-3xl font-black">🔥 Live Global Deals</h3>
          <p className="text-neutral-400">Deals being discovered across global stores right now.</p>
        </div>
        <Link
          href="/pricing"
          className="text-sm text-cyan-400 hover:text-cyan-200 underline"
        >
          Premium unlocks more deals
        </Link>
      </div>

      {loading && <p className="text-neutral-500">Loading live deals…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleDeals.map((deal, idx) => (
          <div key={idx} className="bg-neutral-900 border border-white/10 rounded-2xl p-4 flex flex-col">
            <div className="h-40 bg-neutral-800 rounded-xl mb-3 overflow-hidden">
              {deal.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={deal.image_url} alt={deal.product_title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700">No image</div>
              )}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{deal.store}</p>
            <h4 className="text-lg font-semibold line-clamp-2 mb-2">{deal.product_title}</h4>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-red-500 text-black text-xs font-bold">
                🔥 {Math.round(deal.discount_percent)}% OFF
              </span>
              {tier === "premium" && <span className="px-2 py-1 text-xs rounded-full bg-yellow-400 text-black">⭐ Premium Deal</span>}
            </div>
            <p className="text-xl font-black text-cyan-400 mb-3">${deal.price.toFixed(2)}</p>
            <Link
              href={`/api/track-click?title=${encodeURIComponent(deal.product_title)}&store=${encodeURIComponent(
                deal.store || "partner"
              )}&url=${encodeURIComponent(deal.affiliate_url)}`}
              className="mt-auto inline-flex justify-center px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-cyan-500 hover:text-white transition"
            >
              Buy Deal
            </Link>
          </div>
        ))}
      </div>

      {tier === "normal" && deals.length > 6 && (
        <div className="mt-6 bg-neutral-900 border border-cyan-500/40 text-white rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Unlock more live deals with SKCS Premium.</p>
            <p className="text-sm text-neutral-400">See up to 20 live deals and hidden offers.</p>
          </div>
          <Link
            href="/pricing"
            className="px-5 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
          >
            Upgrade
          </Link>
        </div>
      )}
    </section>
  );
}

