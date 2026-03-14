import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function searchProducts(query: string) {
  // 1. Split into keywords and remove empty / very short words (optional)
  const keywords = query
    .split(" ")
    .map(k => k.trim().toLowerCase())
    .filter(k => k.length > 1); // ignore single letters like "a", "i", etc.

  if (keywords.length === 0) return [];

  // 2. Build OR condition (match any keyword)
  const orConditions = keywords.map(word => `title.ilike.%${word}%`).join(',');

  // 3. Fetch a larger pool of candidates (e.g., 20) so we can rank them
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(orConditions)
    .limit(20);

  if (error) {
    console.error("Supabase search error:", error);
    return [];
  }

  if (!data || data.length === 0) return [];

  // 4. Score each product by how many keywords appear in its title
  const scored = data.map(product => {
    const title = product.title.toLowerCase();
    // Count how many keywords are contained in the title
    const matches = keywords.filter(keyword => title.includes(keyword)).length;
    return { ...product, relevance: matches };
  });

  // 5. Sort by relevance (highest first), then take top 5
  const sorted = scored.sort((a, b) => b.relevance - a.relevance);
  return sorted.slice(0, 5);
}