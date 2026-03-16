import { NextResponse } from "next/server";
import { getTrendingBookings } from "@/ai/trendingBookings";

export async function GET() {
  const items = await getTrendingBookings();
  return NextResponse.json({ items });
}

