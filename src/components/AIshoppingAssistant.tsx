"use client";

import { useState } from "react";
import { Loader2, ShoppingCart, Cpu, HardDrive, Battery, Monitor, Weight } from "lucide-react";

interface LaptopOption {
  name: string;
  priceRange: string;
  processor: string;
  graphics: string;
  ram: string;
  display: string;
  storage: string;
  battery: string;
  weight: string;
  description: string;
  affiliateLink: string;
  image: string;
}

const laptopOptions: LaptopOption[] = [
  {
    name: "Acer Predator Helios 300",
    priceRange: "$4,500 - $4,800",
    processor: "Intel Core i5-11300H",
    graphics: "NVIDIA GeForce RTX 3050",
    ram: "16GB DDR4",
    display: "15.6-inch Full HD IPS",
    storage: "512GB NVMe SSD",
    battery: "Up to 5 hours",
    weight: "5.07 lbs",
    description:
      "A powerful gaming laptop with RTX graphics and fast NVMe storage. Great balance between price and performance.",
    affiliateLink:
      "https://www.amazon.com/s?k=Acer+Predator+Helios+300&tag=skcsshopping2-20",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lenovo Legion 5 Pro",
    priceRange: "$4,500 - $4,800",
    processor: "AMD Ryzen 7 6800H",
    graphics: "NVIDIA GeForce RTX 3050",
    ram: "16GB DDR5",
    display: "16-inch QHD (2560x1600)",
    storage: "512GB NVMe SSD",
    battery: "Up to 6 hours",
    weight: "4.65 lbs",
    description:
      "A strong Ryzen gaming machine with high-resolution display and excellent cooling performance.",
    affiliateLink:
      "https://www.amazon.com/s?k=Lenovo+Legion+5+Pro&tag=skcsshopping2-20",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "MSI GF63",
    priceRange: "$3,700 - $4,000",
    processor: "Intel Core i5-11350H",
    graphics: "NVIDIA GeForce GTX 1660 Ti",
    ram: "16GB DDR4",
    display: "15.6-inch Full HD",
    storage: "256GB NVMe SSD + 1TB HDD",
    battery: "Up to 6 hours",
    weight: "5.07 lbs",
    description:
      "A budget-friendly gaming laptop offering strong GPU performance and large storage capacity.",
    affiliateLink:
      "https://www.amazon.com/s?k=MSI+GF63&tag=skcsshopping2-20",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AIShoppingAssistant() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchAI = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">
            SKCS AI <span className="text-cyan-500">Shopping Assistant</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get personalized product recommendations powered by AI.
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-1 p-4 rounded-2xl border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              placeholder="Ask AI to find products... (example: gaming laptop under $5000)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchAI()}
            />

            <button
              onClick={searchAI}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-black font-bold px-8 py-4 rounded-2xl"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Searching...
                </span>
              ) : (
                "Ask AI"
              )}
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {showResults && (
          <>
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">
                🤖 AI Recommendation
              </h2>
              <p className="text-gray-300">
                Based on current market trends, here are three gaming laptops under $5,000.
              </p>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid md:grid-cols-3 gap-6">
              {laptopOptions.map((laptop, index) => (
                <div
                  key={index}
                  className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition"
                >
                  {/* IMAGE */}
                  <div className="relative h-48">
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-3 right-3 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded">
                      {laptop.priceRange}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-3">

                    <h3 className="text-lg font-bold text-white">
                      {laptop.name}
                    </h3>

                    <div className="space-y-1 text-sm text-gray-300">

                      <div className="flex gap-2">
                        <Cpu className="h-4 w-4 text-cyan-500" />
                        {laptop.processor}
                      </div>

                      <div className="flex gap-2">
                        <Monitor className="h-4 w-4 text-cyan-500" />
                        {laptop.display}
                      </div>

                      <div className="flex gap-2">
                        <HardDrive className="h-4 w-4 text-cyan-500" />
                        {laptop.storage}
                      </div>

                      <div className="flex gap-2">
                        <Battery className="h-4 w-4 text-cyan-500" />
                        {laptop.battery}
                      </div>

                      <div className="flex gap-2">
                        <Weight className="h-4 w-4 text-cyan-500" />
                        {laptop.weight}
                      </div>

                    </div>

                    <p className="text-gray-400 text-sm border-t border-white/10 pt-3">
                      {laptop.description}
                    </p>

                    <a
                      href={laptop.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </button>
                    </a>

                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              Prices may vary depending on retailer availability.
            </p>
          </>
        )}
      </div>
    </div>
  );
}