import { NextResponse } from "next/server";
import { getTrendingProducts } from "@/ai/trendingProducts";

export async function GET() {
  const items = await getTrendingProducts();
  return NextResponse.json({ items });
}

