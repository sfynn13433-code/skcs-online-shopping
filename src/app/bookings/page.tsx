"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  "All",
  "Electronics",
  "Gaming",
  "Fashion",
  "Home",
  "Fitness",
  "Automotive",
  "Toys",
  "Tools"
];

export default function ProductGrid({ products }: any) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: any) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              selectedCategory === cat
                ? "bg-cyan-500 text-black"
                : "bg-neutral-900 hover:bg-neutral-800"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* BOOKINGS BUTTON */}
        <Link
          href="/bookings"
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm font-semibold"
        >
          Bookings <span className="text-cyan-400 ml-1">(Soon)</span>
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredProducts.map((p: any, index: number) => (
          <div
            key={p.id ?? `${p.title}-${index}`}
            className="group bg-neutral-900/40 border border-white/5 rounded-[2rem] p-5 hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              {/* PRODUCT IMAGE */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-neutral-800">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg mb-2">{p.title}</h3>

              {/* STORE */}
              <p className="text-xs text-neutral-400 mb-3 uppercase">
                {p.store}
              </p>

              {/* PRICE */}
              <p className="text-cyan-400 font-bold text-lg">{p.price}</p>
            </div>

            {/* BUY BUTTON */}
            <a
              href={`/api/track-click?title=${encodeURIComponent(
                p.title
              )}&store=${encodeURIComponent(p.store)}&url=${encodeURIComponent(
                p.url
              )}`}
              target="_blank"
              className="mt-5 block text-center bg-cyan-500 text-black font-semibold py-2 rounded-xl hover:bg-cyan-400 transition"
            >
              View Deal
            </a>
          </div>
        ))}

      </div>
    </div>
  );
}