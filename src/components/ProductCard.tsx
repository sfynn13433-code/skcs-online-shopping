import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  rating?: number | null;
  image?: string | null;
  store?: string | null;
  affiliateUrl: string;
  shippingLocation?: string | null;
  dealScore?: number;
  badge?: "best" | "top-rated" | "budget";
  discountPercent?: number;
}

export default function ProductCard({
  id,
  title,
  price,
  rating,
  image,
  store,
  affiliateUrl,
  shippingLocation,
  dealScore,
  badge,
  discountPercent,
}: ProductCardProps) {
  return (
    <div
      key={id}
      className="group bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden transition hover:border-cyan-500/50 flex flex-col shadow-lg"
    >
      <div className="relative h-48 bg-neutral-900">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 250px, 50vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-neutral-700">No image</div>
        )}
        {store && (
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full border border-white/10">
            {store}
          </div>
        )}
        {badge && (
          <div className="absolute top-3 right-3 bg-cyan-500 text-black text-xs px-3 py-1 rounded-full font-bold">
            {badge === "best" ? "🔥 Best Deal" : badge === "top-rated" ? "⭐ Top Rated" : "💰 Budget Pick"}
          </div>
        )}
        {shippingLocation && (
          <div className="absolute top-3 right-3 bg-cyan-600/80 text-xs text-black px-3 py-1 rounded-full font-semibold">
            Ships to {shippingLocation}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
          {rating ? (
            <>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </>
          ) : (
            <span className="text-neutral-600">No rating</span>
          )}
        </div>
        <div className="text-xl font-black text-cyan-400 mb-1">${price.toFixed(2)}</div>
        {discountPercent !== undefined && discountPercent > 0 && (
          <p className="text-xs text-green-400 mb-2">{Math.round(discountPercent)}% estimated discount</p>
        )}
        {dealScore !== undefined && (
          <p className="text-xs text-neutral-500 mb-3">Deal Score: {dealScore}/100</p>
        )}
        <Link
          href={`/api/track-click?title=${encodeURIComponent(title)}&store=${encodeURIComponent(
            store || "partner"
          )}&url=${encodeURIComponent(affiliateUrl)}&productId=${encodeURIComponent(id)}`}
          className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-xl transition hover:bg-cyan-500 hover:text-white"
        >
          View Deal
        </Link>
      </div>
    </div>
  );
}
