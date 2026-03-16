"use client";

import Link from "next/link";

const sample = [
  { store: "Amazon", price: 499 },
  { store: "eBay", price: 475 },
  { store: "AliExpress", price: 460, cheapest: true },
];

export default function GlobalPriceGuarantee() {
  return (
    <section className="bg-neutral-950 border-y border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-2">Price Guarantee</p>
          <h2 className="text-3xl md:text-4xl font-black mb-3">Global Cheapest Price Guarantee</h2>
          <p className="text-neutral-400">
            SKCS compares prices across trusted global stores to help you find the lowest price available online.
          </p>
          <div className="flex gap-3 mt-6">
            <Link
              href="/search"
              className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
            >
              Compare Global Prices
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-white/20 text-white rounded-xl hover:border-cyan-400 transition"
            >
              Upgrade to Premium
            </Link>
          </div>
          <p className="text-sm text-neutral-500 mt-3">
            Premium users unlock hidden deals and price drop alerts.
          </p>
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Example</p>
              <h3 className="text-xl font-bold">PlayStation 5</h3>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-cyan-500 text-black font-semibold">Cheapest Price</span>
          </div>
          <div className="space-y-3">
            {sample.map((row) => (
              <div
                key={row.store}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  row.cheapest ? "bg-green-900/40 border border-green-500/40" : "bg-neutral-800"
                }`}
              >
                <span className="font-semibold">{row.store}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black">${row.price}</span>
                  {row.cheapest && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-black font-semibold">
                      Cheapest
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-green-300 font-semibold">🏆 Cheapest: AliExpress — Save $39</div>
        </div>
      </div>
    </section>
  );
}

