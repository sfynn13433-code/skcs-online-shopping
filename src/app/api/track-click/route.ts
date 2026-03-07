import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase"; // Adjust path if needed

export async function GET(req: Request) {
  // 1. Grab the URL parameters the frontend sent us
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  const productTitle = searchParams.get("title") || "Unknown Product";
  const storeName = searchParams.get("store") || "Unknown Store";

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing destination URL" }, { status: 400 });
  }

  try {
    // 2. Log the click into your Supabase database silently in the background
    await supabase.from('click_analytics').insert([
      {
        product_title: productTitle,
        store_name: storeName,
        original_link: targetUrl
      }
    ]);

    // 3. Instantly redirect the user to the actual store (Amazon, Takealot, etc.)
    return NextResponse.redirect(targetUrl);

  } catch (error) {
    console.error("Click tracking failed:", error);
    // Even if tracking fails, we still send the user to the store so you don't lose the commission!
    return NextResponse.redirect(targetUrl);
  }
}