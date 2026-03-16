import { fetchStoreProducts } from "./shared";
import { MarketplaceProduct } from "./types";

export async function searchEbay(query: string): Promise<MarketplaceProduct[]> {
  const results = await fetchStoreProducts("ebay", query);
  return results.map((item) => ({
    ...item,
    store: "eBay",
  }));
}

