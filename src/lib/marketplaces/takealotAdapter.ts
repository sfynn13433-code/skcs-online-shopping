import { fetchStoreProducts } from "./shared";
import { MarketplaceProduct } from "./types";

export async function searchTakealot(query: string): Promise<MarketplaceProduct[]> {
  const results = await fetchStoreProducts("takealot", query);
  return results.map((item) => ({ ...item, store: "Takealot" }));
}

