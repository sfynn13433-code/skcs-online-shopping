"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import BookingCarousel from "./BookingCarousel";
import RecommendationCard from "./RecommendationCard";
import { ProductCardProps } from "./ProductCard";
import { BookingResult } from "@/lib/bookings/types";

interface RecommendationItem extends ProductCardProps {}

export default function DiscoveryFeed() {
  const [trendingProducts, setTrendingProducts] = useState<ProductCardProps[]>([]);
  const [trendingBookings, setTrendingBookings] = useState<BookingResult[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const [tp, tb, recs] = await Promise.all([
          fetch("/api/discovery/trending-products").then((r) => r.json()),
          fetch("/api/discovery/trending-bookings").then((r) => r.json()),
          fetch("/api/discovery/recommendations").then((r) => r.json()),
        ]);
        setTrendingProducts(tp.items || []);
        setTrendingBookings(tb.items || []);
        setRecommendations(recs.items || []);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {loading && <p className="text-neutral-500">Loading discovery feed…</p>}
      <div>
        <h3 className="text-2xl font-black mb-4">🔥 Trending Products</h3>
        <ProductCarousel items={trendingProducts} />
      </div>

      <div>
        <h3 className="text-2xl font-black mb-4">✈ Trending Destinations</h3>
        <BookingCarousel items={trendingBookings} />
      </div>

      <div>
        <h3 className="text-2xl font-black mb-4">⭐ Recommended For You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
