"use client";

import Link from "next/link";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Gaming", slug: "gaming" },
  { name: "Accessories", slug: "accessories" }
];

const stores = [
  { name: "Amazon" },
  { name: "AliExpress" },
  { name: "Fiverr" },
  { name: "eBay" },
  { name: "Takealot" }
];

export default function MarketplaceMenu({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="absolute left-0 top-full w-full bg-black border-t border-white/10 shadow-xl z-40">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-10">

        {/* Categories */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
            Categories
          </h3>

          <ul className="space-y-3 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="hover:text-cyan-400 transition"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stores */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
            Stores
          </h3>

          <ul className="space-y-3 text-sm">
            {stores.map((store) => (
              <li key={store.name}>
                <span className="text-neutral-400">
                  {store.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog / Guides placeholder */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
            Guides
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/blog"
                className="hover:text-cyan-400 transition"
              >
                Shopping Guides
              </Link>
            </li>

            <li className="text-neutral-500">
              Deal Strategies
            </li>

            <li className="text-neutral-500">
              Product Comparisons
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}