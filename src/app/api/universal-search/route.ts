import { NextResponse } from "next/server";
import { amazonLimitedConnector } from "@/lib/connectors/amazonLimitedConnector";
import { mockConnector } from "@/lib/connectors/mockConnector";
import { normalizeProducts } from "@/lib/services/normalizeProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const amazonProducts = await amazonLimitedConnector(query);
  const mockProducts = await mockConnector(query);

  const combinedProducts = [...amazonProducts, ...mockProducts];
  const normalizedProducts = normalizeProducts(combinedProducts);

  return NextResponse.json({
    query,
    count: normalizedProducts.length,
    sources: {
      amazon: amazonProducts.length,
      mock: mockProducts.length,
    },
    products: normalizedProducts,
  });
}
