import type { Product } from "@/lib/models/product";
import { supabase } from "@/lib/supabaseClient";

export async function amazonLimitedConnector(query: string): Promise<Product[]> {
  const q = query.trim();

  const runSearch = async (includeBrand: boolean) => {
    const orFilter = includeBrand
      ? `title.ilike.%${q}%,category.ilike.%${q}%,brand.ilike.%${q}%`
      : `title.ilike.%${q}%,category.ilike.%${q}%`;

    return supabase
      .from("products")
      .select("*")
      .or(orFilter)
      .limit(100);
  };

  let data: any[] | null = null;
  let error: any = null;

  if (q) {
    ({ data, error } = await runSearch(true));

    // If `brand` column doesn't exist in the schema, retry without it.
    if (error && `${error.message || ""}`.toLowerCase().includes("brand")) {
      ({ data, error } = await runSearch(false));
    }
  } else {
    ({ data, error } = await supabase.from("products").select("*").limit(100));
  }

  if (error) {
    console.error("Supabase fetch error:", error);
  }

  const mapRowsToProducts = (rows: any[] | null): Product[] => {
    if (!rows || rows.length === 0) return [];

    return rows.map((item: any) => ({
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
  };

  let products: Product[] = mapRowsToProducts(data);

  if (products.length === 0) {
    // fallback: return some default products
    const { data: fallback, error: fallbackError } = await supabase
      .from("products")
      .select("*")
      .limit(12);

    if (fallbackError) {
      console.error("Supabase fallback fetch error:", fallbackError);
    }

    products = mapRowsToProducts(fallback);
  }

  // Keep a final in-memory filter as safety (and to preserve original behavior)
  const qLower = q.toLowerCase();
  if (!qLower) return products;
  return products.filter((product) => {
    const haystack = `${product.title} ${product.category}`.toLowerCase();
    return haystack.includes(qLower);
  });
}
