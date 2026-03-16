import { NextResponse } from "next/server";
import { getRecommendations } from "@/ai/recommendationEngine";

export async function GET() {
  const items = await getRecommendations();
  return NextResponse.json({ items });
}

