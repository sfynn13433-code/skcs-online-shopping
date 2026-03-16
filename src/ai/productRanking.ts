import { MarketplaceProduct } from "@/lib/marketplaces/types";

export interface RankedProduct extends MarketplaceProduct {
  dealScore: number;
  badge?: "best" | "top-rated" | "budget";
}

export function rankProducts(products: MarketplaceProduct[]): RankedProduct[] {
  const scored = products.map((p) => {
    const price = Number(p.price || 0);
    const rating = Number(p.rating || 0);
    const reviews = Number(p.reviewCount || 0);
    const popularity = Number(p.popularity || 0);

    // Weighted score: tune as needed
    const score =
      (5 - Math.min(price / 1000, 5)) * 15 + // cheaper = higher
      rating * 10 +
      Math.log10(reviews + 1) * 8 +
      popularity * 5;

    return { ...p, dealScore: Math.round(score) };
  });

  return scored
    .sort((a, b) => b.dealScore - a.dealScore)
    .map((p, idx) => ({
      ...p,
      badge:
        idx === 0
          ? "best"
          : p.rating && p.rating >= 4.5
          ? "top-rated"
          : p.price < 100
          ? "budget"
          : undefined,
    }));
}

