export const revalidate = 600;

export const metadata = {
  title: "SKCS Global Product Marketplace",
  description: "Compare products across Amazon, eBay, Walmart, AliExpress, Takealot with AI ranking.",
};

import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return <ProductsClient />;
}
