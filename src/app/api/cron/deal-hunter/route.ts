import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  console.log("Starting Auto-Pilot Deal Hunt...");

  // Read environment variables inside the handler (safe for build time)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Validate that both are present
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase URL or service role key");
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Create the Supabase admin client now – only when the route runs
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // 1. Simulated raw deals fetched from marketplace APIs
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

    // 2. AI/Logic Filter: at least 20% off AND rating ≥ 4.0
    const verifiedDeals = rawDeals.filter(deal => {
      const discountPercentage = ((deal.original_price - deal.current_price) / deal.original_price) * 100;
      return discountPercentage >= 20 && deal.rating >= 4.0;
    });

    // 3. Push verified deals to Supabase (daily_deals table)
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