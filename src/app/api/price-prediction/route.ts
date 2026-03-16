import { NextResponse } from "next/server";
import { predictPrice } from "@/services/pricePrediction";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("product_id");
  if (!productId) return NextResponse.json({ error: "product_id required" }, { status: 400 });

  const prediction = await predictPrice(productId);
  if (!prediction) return NextResponse.json({ prediction: null });

  return NextResponse.json(prediction);
}

