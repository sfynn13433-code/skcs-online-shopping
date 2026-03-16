import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parseQuery, describeParsedQuery } from "@/ai/queryParser";

export async function POST(req: Request) {
  const { message, userId } = await req.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const parsed = parseQuery(message);
  const summary = describeParsedQuery(parsed);

  // Log to Supabase (best-effort; silently continue on failure)
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from("search_logs").insert({
      user_id: userId || null,
      search_query: message,
      search_type: parsed.kind,
      structured_params: parsed,
    });
  } catch (error) {
    console.error("Failed to log search query:", error);
  }

  const nextRoute =
    parsed.kind === "product"
      ? `/products?q=${encodeURIComponent(parsed.keywords.join(" "))}${
          parsed.priceLimit ? `&maxPrice=${parsed.priceLimit}` : ""
        }`
      : `/bookings?destination=${encodeURIComponent(parsed.destination || "")}${
          parsed.checkIn && parsed.checkOut ? `&checkIn=${parsed.checkIn}&checkOut=${parsed.checkOut}` : ""
        }`;

  const responsePayload = {
    intent: parsed.kind,
    keywords: parsed.kind === "product" ? parsed.keywords : undefined,
    price_limit: parsed.kind === "product" ? parsed.priceLimit : parsed.priceLimit,
    destination: parsed.kind === "booking" ? parsed.destination : undefined,
    dates:
      parsed.kind === "booking" && parsed.checkIn && parsed.checkOut
        ? { checkIn: parsed.checkIn, checkOut: parsed.checkOut }
        : undefined,
    nextRoute,
    parsed,
    summary,
  };

  return NextResponse.json(responsePayload);
}
