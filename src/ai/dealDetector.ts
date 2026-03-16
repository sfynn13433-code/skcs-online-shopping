import { MarketplaceProduct } from "@/lib/marketplaces/types";

export interface DealResult extends MarketplaceProduct {
  badge?: "hot" | "price-drop" | "top-rated";
}

export function detectDeals(products: MarketplaceProduct[], marketAverage: number): DealResult[] {
  return products.map((p) => {
    const discountPercent = marketAverage > 0 ? Math.round(((marketAverage - p.price) / marketAverage) * 100) : 0;
    let badge: DealResult["badge"];
    if (p.price < marketAverage * 0.8) badge = "hot";
    else if (p.price < marketAverage * 0.9) badge = "price-drop";
    else if ((p.rating || 0) >= 4.6) badge = "top-rated";
    return { ...p, badge, discountPercent };
  });
}

