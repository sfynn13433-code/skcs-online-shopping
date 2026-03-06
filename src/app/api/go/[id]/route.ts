import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,  // Better than plain Request – gives typed headers/cookies/searchParams
  { params }: { params: Promise<{ id: string }> }  // ← Correct type: Promise
) {
  try {
    // Await the params Promise first
    const resolvedParams = await params;
    const id = resolvedParams.id;  // Now safe to access

    // Optional: Validate the ID early
    const productId = Number(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch products – note: in production, avoid localhost!
    // Use environment variables or relative path for internal APIs
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_APP_URL || "https://your-vercel-domain.vercel.app"}/api/products`
        : "http://localhost:3000/api/products"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    // Find product – better typing & strict equality
    const product = products.find((p: any) => p.id === productId);

    if (!product || !product.affiliateLink) {
      return NextResponse.json(
        { error: "Product not found or missing affiliate link" },
        { status: 404 }
      );
    }

    console.log("Affiliate click:", product.title, "ID:", id);

    // Redirect to affiliate link (works in Route Handlers)
    return NextResponse.redirect(product.affiliateLink, 307); // 307 preserves method; 301/302 also ok
  } catch (error) {
    console.error("Redirect error:", error);

    return NextResponse.json(
      { error: "Redirect failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Add caching or other config if needed
export const dynamic = "force-dynamic"; // If you want this route always dynamic
// OR export const revalidate = 3600; // ISR every hour if products change infrequently