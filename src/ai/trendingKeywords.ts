import { supabase } from "@/lib/supabase";

export interface TrendingKeyword {
  term: string;
  count: number;
  type: "product" | "booking";
}

export async function getTrendingKeywords(limit = 10): Promise<TrendingKeyword[]> {
  const { data, error } = await supabase
    .from("search_logs")
    .select("search_query, search_type")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error || !data) return [];

  const counts: Record<string, { count: number; type: "product" | "booking" }> = {};
  data.forEach((row) => {
    const term = row.search_query?.toLowerCase().trim();
    if (!term) return;
    if (!counts[term]) counts[term] = { count: 0, type: row.search_type };
    counts[term].count += 1;
  });

  return Object.entries(counts)
    .map(([term, { count, type }]) => ({ term, count, type }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

