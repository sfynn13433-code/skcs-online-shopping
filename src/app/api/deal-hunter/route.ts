import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(req: Request) {
  // Security check: ensure the request is actually coming from your Vercel Cron job
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("Starting Auto-Pilot Deal Hunt...");

  try {
    // Safety check to prevent TypeScript build error
    if (!supabase) {
      console.error("Supabase client is not initialized");
      return NextResponse.json(
        { success: false, error: "Supabase not initialized" },
        { status: 500 }
      );
    }

    // 1. Fetch raw deals from a marketplace (Simulated here)
    const rawDeals = [
      {
        id: "1",
        title: "Lenovo ThinkPad X1",
        original_price: 1500,
        current_price: 899,
        link: "your-affiliate-link",
        rating: 4.8,
      },
      {
        id: "2",
        title: "Cheap Plastic Watch",
        original_price: 20,
        current_price: 18,
        link: "your-affiliate-link",
        rating: 2.1,
      },
      {
        id: "3",
        title: "Sony WH-1000XM5",
        original_price: 400,
        current_price: 250,
        link: "your-affiliate-link",
        rating: 4.9,
      },
    ];

    // 2. Deal filter logic
    // Rule: Must be at least 20% off AND rating above 4.0
    const verifiedDeals = rawDeals.filter((deal) => {
      const discountPercentage =
        ((deal.original_price - deal.current_price) / deal.original_price) * 100;

      return discountPercentage >= 20 && deal.rating >= 4.0;
    });

    // 3. Push verified deals to Supabase
    const { data, error } = await supabase
      .from("daily_deals")
      .upsert(verifiedDeals, { onConflict: "id" });

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Found and saved ${verifiedDeals.length} deals!`,
      deals: data,
    });

  } catch (error) {
    console.error("Deal Hunter failed:", error);

    return NextResponse.json(
      { success: false, error: "Failed to hunt deals" },
      { status: 500 }
    );
  }
}
