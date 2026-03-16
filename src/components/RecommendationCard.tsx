import DealBadge from "./DealBadge";
import { ProductCardProps } from "./ProductCard";

export default function RecommendationCard({ item }: { item: ProductCardProps }) {
  return (
    <div className="bg-neutral-900/70 border border-white/10 rounded-2xl p-4 flex flex-col">
      <div className="text-xs uppercase tracking-[0.25em] text-cyan-400 mb-2">Recommended</div>
      <h3 className="text-lg font-bold mb-1 line-clamp-2">{item.title}</h3>
      <p className="text-cyan-400 font-black mb-2">${item.price.toFixed(2)}</p>
      <DealBadge badge={item.badge as any} />
      <a
        href={`/api/track-click?title=${encodeURIComponent(item.title)}&store=${encodeURIComponent(
          item.store || "partner"
        )}&url=${encodeURIComponent(item.affiliateUrl)}&productId=${encodeURIComponent(item.id)}`}
        className="mt-auto inline-flex justify-center px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-cyan-500 hover:text-white"
      >
        View Deal
      </a>
    </div>
  );
}

