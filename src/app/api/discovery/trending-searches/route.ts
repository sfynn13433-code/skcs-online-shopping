import { NextResponse } from "next/server";
import { getTrendingKeywords } from "@/ai/trendingKeywords";

export async function GET() {
  const items = await getTrendingKeywords();
  return NextResponse.json({ items });
}

