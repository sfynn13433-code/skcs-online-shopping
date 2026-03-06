import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {

    const response = await fetch("http://localhost:3000/api/products");

    const products = await response.json();

    const product = products.find((p: any) => p.id === Number(params.id));

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    console.log("Affiliate click:", product.title);

    return NextResponse.redirect(product.affiliateLink);

  } catch (error) {

    return NextResponse.json(
      { error: "Redirect failed" },
      { status: 500 }
    );

  }

}