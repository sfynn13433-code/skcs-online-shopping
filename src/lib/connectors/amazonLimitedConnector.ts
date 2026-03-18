import type { Product } from "@/lib/models/product";
import { supabase } from "@/lib/supabaseClient";

export async function amazonLimitedConnector(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("title", `%${query}%`)
    .limit(100);

  if (error || !data || data.length === 0) {
    if (error) {
      console.error("Supabase fetch error:", error);
    }
    return [];
  }

  const products: Product[] = (data as any[]).map((item: any) => ({
    id: `amazon_${item.id}`,
    title: item.title,
    category: item.category || "Electronics",
    image: item.image_url || "📦",
    rating: 4.2,
    reviews: 1000,
    bestPrice: item.price,
    history: [item.price],
    vendors: [
      {
        name: item.store || "Amazon",
        price: item.price,
        stock: "In Stock",
        link: item.affiliate_url,
      },
    ],
  }));

  // Keep a final in-memory filter as safety (and to preserve original behavior)
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => product.title.toLowerCase().includes(q));
}
