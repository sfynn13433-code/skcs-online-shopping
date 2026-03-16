import { NextResponse } from "next/server";
import { runAutoDealHunter } from "@/services/autoDealHunter";

export async function GET(req: Request) {
  // Security check: ensure the request is actually coming from your Vercel Cron job
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("Starting Auto-Pilot Deal Hunt...");

  try {
    const deals = await runAutoDealHunter();

    return NextResponse.json({
      success: true,
      message: `Auto Deal Hunter saved ${deals.length} deals`,
      deals,
    });

  } catch (error) {
    console.error("Deal Hunter failed:", error);

    return NextResponse.json(
      { success: false, error: "Failed to hunt deals" },
      { status: 500 }
    );
  }
}
