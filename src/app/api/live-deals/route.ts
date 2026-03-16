import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";

export async function GET() {
  // Tier gating is handled client-side; API returns full set
  const { data, error } = await supabase
    .from("live_deals")
    .select("product_title,store,price,discount_percent,image_url,affiliate_url")
    .order("discount_percent", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ deals: [] });
  }

  const sanitizedDeals = (data || []).map((deal) => ({
    ...deal,
    affiliate_url: ensureAmazonAffiliateTag(deal.affiliate_url),
  }));

  return NextResponse.json({ deals: sanitizedDeals });
}
