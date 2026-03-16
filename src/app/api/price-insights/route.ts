import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { predictPrice } from "@/services/pricePrediction";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";
import { runAI } from "@/services/aiRouter";

export const maxDuration = 30;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id,title,price,image_url,store,affiliate_url")
      .order("rating", { ascending: false })
      .limit(6);

    if (error) {
      console.error("price insights products error", error);
      return NextResponse.json({ insights: [] });
    }

    const insights = (
      await Promise.all(
        (data || []).map(async (product) => {
          const prediction = await predictPrice(product.id);
          if (!prediction) return null;

          return {
            product_id: product.id,
            title: product.title,
            current_price: Number(product.price || 0),
            image_url: product.image_url,
            store: product.store,
            affiliate_url: ensureAmazonAffiliateTag(product.affiliate_url || ""),
            prediction,
          };
        })
      )
    ).filter(Boolean);

    let summary: string | undefined;
    if (insights.length > 0) {
      const topTitles = insights
        .slice(0, 3)
        .map((i) => `${i.title} (${i.prediction.prediction})`)
        .join(", ");
      const aiSummary = await runAI(
        `Summarize price movement outlook for: ${topTitles}. Keep it under 30 words, cautionary, and avoid guarantees.`
      );
      summary = aiSummary.text;
    }

    return NextResponse.json({ insights, summary });
  } catch (error) {
    console.error("price insights failure", error);
    return NextResponse.json({ insights: [] }, { status: 500 });
  }
}
