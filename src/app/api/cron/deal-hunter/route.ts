import { NextResponse } from "next/server";
// Adjust this import path if your supabase.ts is located elsewhere
import { supabase } from "@/lib/supabase"; 

export async function GET(req: Request) {
  console.log("Starting Auto-Pilot Deal Hunt...");

  try {
    // 1. Simulated raw deals fetched from marketplace APIs (Amazon, Takealot, AliExpress)
    const rawDeals = [
      { 
        id: '1', 
        title: "Lenovo ThinkPad X1 Carbon", 
        original_price: 1500, 
        current_price: 899, 
        link: "https://www.takealot.com", 
        rating: 4.8 
      },
      { 
        id: '2', 
        title: "Cheap Unbranded Watch", 
        original_price: 20, 
        current_price: 18, 
        link: "https://www.aliexpress.com", 
        rating: 2.1 
      },
      { 
        id: '3', 
        title: "Sony WH-1000XM5 Headphones", 
        original_price: 400, 
        current_price: 250, 
        link: "https://www.amazon.com", 
        rating: 4.9 
      },
    ];

    // 2. The AI/Logic Filter: Must be at least 20% off AND have a rating of 4.0 or higher
    const verifiedDeals = rawDeals.filter(deal => {
      const discountPercentage = ((deal.original_price - deal.current_price) / deal.original_price) * 100;
      return discountPercentage >= 20 && deal.rating >= 4.0;
    });

    // 3. Push the verified deals directly to your Supabase database
    const { data, error } = await supabase
      .from('daily_deals')
      .upsert(verifiedDeals, { onConflict: 'id' }); 

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully hunted and saved ${verifiedDeals.length} deals to the database!`,
      deals: verifiedDeals
    });

  } catch (error) {
    console.error("Deal Hunter background task failed:", error);
    return NextResponse.json({ success: false, error: "Failed to hunt deals" }, { status: 500 });
  }
}