import ProductCard, { ProductCardProps } from "./ProductCard";

interface StoreResultsProps {
  items: ProductCardProps[];
  emptyMessage?: string;
}

export default function StoreResults({ items, emptyMessage }: StoreResultsProps) {
  if (!items.length) {
    return (
      <div className="text-center text-neutral-500 bg-neutral-900/60 border border-white/10 rounded-2xl p-10">
        {emptyMessage || "No results yet. Try another query."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
}
