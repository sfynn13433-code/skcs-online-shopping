export interface MarketplaceProduct {
  title: string;
  price: number;
  rating?: number | null;
  image?: string | null;
  store: string;
  productUrl: string;
  affiliateUrl: string;
  reviewCount?: number | null;
  popularity?: number | null;
}

