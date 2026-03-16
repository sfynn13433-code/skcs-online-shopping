interface Props {
  badge?: "hot" | "price-drop" | "top-rated";
}

export default function DealBadge({ badge }: Props) {
  if (!badge) return null;
  const label =
    badge === "hot" ? "🔥 Hot Deal" : badge === "price-drop" ? "💰 Price Drop" : "⭐ Top Rated";
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500 text-black">
      {label}
    </span>
  );
}

