import ProductCard, { ProductCardProps } from "./ProductCard";

export default function ProductCarousel({ items }: { items: ProductCardProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
}

