import { fetchStoreProducts } from "./shared";
import { MarketplaceProduct } from "./types";

export async function searchWalmart(query: string): Promise<MarketplaceProduct[]> {
  const results = await fetchStoreProducts("walmart", query);
  return results.map((item) => ({ ...item, store: "Walmart" }));
}

