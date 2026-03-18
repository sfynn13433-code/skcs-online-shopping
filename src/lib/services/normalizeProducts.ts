import type { Product } from "@/lib/models/product";

export function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => {
    const sortedVendors = [...product.vendors].sort((a, b) => a.price - b.price);

    return {
      ...product,
      vendors: sortedVendors,
      bestPrice: sortedVendors[0]?.price ?? product.bestPrice,
    };
  });
}
