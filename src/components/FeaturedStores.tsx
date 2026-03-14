"use client";

import Image from "next/image";

const stores = [
  { name: "Amazon", logo: "/stores/amazon.png" },
  { name: "AliExpress", logo: "/stores/aliexpress.png" },
  { name: "Fiverr", logo: "/stores/fiverr.png" },
  { name: "eBay", logo: "/stores/ebay.png" },
  { name: "Takealot", logo: "/stores/takealot.png" }
];

export default function FeaturedStores() {

  return (
    <section className="border-t border-white/10 bg-neutral-950 py-16 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-black uppercase tracking-tight mb-3">
          Trusted <span className="text-cyan-500">Stores</span>
        </h2>

        <p className="text-neutral-400 max-w-xl mx-auto mb-12 text-sm">
          SKCS compares products across trusted global marketplaces so you can
          discover the best deals in one place.
        </p>

        <div className="relative w-full overflow-hidden">

          <div className="flex gap-24 items-center animate-marquee">

            {[...stores, ...stores].map((store, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[180px]"
              >
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}