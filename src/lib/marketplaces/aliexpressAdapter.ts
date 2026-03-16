import { fetchStoreProducts } from "./shared";
import { MarketplaceProduct } from "./types";

export async function searchAliExpress(query: string): Promise<MarketplaceProduct[]> {
  const results = await fetchStoreProducts("aliexpress", query);
  return results.map((item) => ({ ...item, store: "AliExpress" }));
}

