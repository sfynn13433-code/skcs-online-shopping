import { fetchStoreProducts } from "./shared";
import { MarketplaceProduct } from "./types";
import { generateAmazonAffiliateLink } from "../affiliateAmazon";

export async function searchAmazon(query: string): Promise<MarketplaceProduct[]> {
  const results = await fetchStoreProducts("amazon", query);
  return results.map((item) => {
    const idMatch = item.productUrl.match(/\/dp\/([A-Z0-9]{5,})/i);
    const productId = idMatch?.[1] ?? item.productUrl;
    const affiliateUrl = generateAmazonAffiliateLink(productId);
    return { ...item, affiliateUrl, store: "Amazon" };
  });
}

