import { NextResponse } from "next/server";
import { getAutoDeals, runAutoDealHunter } from "@/services/autoDealHunter";

export const maxDuration = 30;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const refresh = searchParams.get("refresh") === "true";

  try {
    const deals = refresh ? await runAutoDealHunter() : await getAutoDeals();
    return NextResponse.json({ deals });
  } catch (error) {
    console.error("Auto-deal hunter failed", error);
    return NextResponse.json({ deals: [] }, { status: 500 });
  }
}
