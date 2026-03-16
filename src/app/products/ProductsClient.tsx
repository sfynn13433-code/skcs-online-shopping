"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { SlidersHorizontal } from "lucide-react";
import { rankProducts } from "@/ai/productRanking";
import { detectDeals } from "@/ai/dealDetector";
import { useTier } from "@/hooks/useTier";

const BRANDS = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "Asus", "Acer"];
const LOCATIONS = ["United States", "South Africa", "Europe", "Global"];
const FALLBACK_PRODUCTS: ProductCardProps[] = [
  {
    id: "fallback-1",
    title: "Sample Amazon Laptop 15”",
    price: 899,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    store: "Amazon",
    shippingLocation: "Global",
    affiliateUrl: "#",
    dealScore: 82,
    badge: "best",
  },
];

function ProductsClientInner() {
  const params = useSearchParams();
  const { tier } = useTier();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [shippingLocation, setShippingLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductCardProps[]>([]);

  const hasFilters = useMemo(
    () => Boolean(query || brand || maxPrice || rating || shippingLocation),
    [query, brand, maxPrice, rating, shippingLocation]
  );

  useEffect(() => {
    const initialQuery = params.get("q") || "";
    const initialBrand = params.get("brand") || "";
    const initialMaxPrice = params.get("maxPrice");
    const initialRating = params.get("rating");
    const initialShip = params.get("ship") || "";

    if (initialQuery) setQuery(initialQuery);
    if (initialBrand) setBrand(initialBrand);
    if (initialMaxPrice) setMaxPrice(Number(initialMaxPrice));
    if (initialRating) setRating(Number(initialRating));
    if (initialShip) setShippingLocation(initialShip);

    fetchProducts(
      initialQuery,
      initialBrand,
      initialMaxPrice ? Number(initialMaxPrice) : undefined,
      initialRating ? Number(initialRating) : undefined,
      initialShip
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProducts(
    nextQuery = query,
    nextBrand = brand,
    nextMaxPrice = maxPrice,
    nextRating = rating,
    nextShip = shippingLocation
  ) {
    setLoading(true);
    try {
      let builder = supabase
        .from("products")
        .select("id,title,price,rating,image_url,brand,affiliate_url")
        .limit(48);

      if (nextQuery) {
        builder = builder.ilike("title", `%${nextQuery}%`);
      }
      if (nextBrand) {
        builder = builder.ilike("brand", `%${nextBrand}%`);
      }
      if (nextMaxPrice) {
        builder = builder.lte("price", nextMaxPrice);
      }
      if (nextRating) {
        builder = builder.gte("rating", nextRating);
      }
      if (nextShip) {
        builder = builder.ilike("shipping_location", `%${nextShip}%`);
      }

      const { data, error } = await builder;
      if (error) {
        // Gracefully fallback without noisy console errors in production
        setProducts(FALLBACK_PRODUCTS);
        return;
      }

      const mapped =
        data?.map((p) => ({
          id: p.id,
          title: p.title,
          price: Number(p.price || 0),
          rating: p.rating,
          image: p.image_url,
          store: p.brand,
          shippingLocation: undefined,
          affiliateUrl: p.affiliate_url || "#",
        })) || [];

      const avgPrice = mapped.length ? mapped.reduce((s, p) => s + (p.price || 0), 0) / mapped.length : 0;
      const withDeals = detectDeals(mapped as any, avgPrice);
      const ranked = rankProducts(withDeals as any).map<ProductCardProps>((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        rating: p.rating,
        image: p.image,
        store: p.store,
        shippingLocation: p.shippingLocation,
        affiliateUrl: p.affiliateUrl,
        dealScore: p.dealScore,
        badge: tier === "premium" ? p.badge : undefined,
        discountPercent: p.discountPercent,
      }));
      setProducts(ranked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-2">
              Global product marketplace
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Products</h1>
            <p className="text-neutral-400 mt-2 max-w-2xl">
              Search Amazon, eBay, Walmart, AliExpress, Takealot and more with filters for price,
              brand, rating, and shipping destination.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-3 text-neutral-400 mb-4 font-semibold uppercase text-xs tracking-[0.25em]">
            <SlidersHorizontal className="w-4 h-4" />
            Refine search
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              className="bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Any brand</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              placeholder="Max price (USD)"
              className="bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
              value={maxPrice ?? ""}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
            />
            <input
              type="number"
              min={1}
              max={5}
              step={0.1}
              placeholder="Rating 1-5"
              className="bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
              value={rating ?? ""}
              onChange={(e) => setRating(e.target.value ? Number(e.target.value) : undefined)}
            />
            <select
              className="bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 text-white"
              value={shippingLocation}
              onChange={(e) => setShippingLocation(e.target.value)}
            >
              <option value="">Ships to any</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => fetchProducts()}
              className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Searching..." : "Apply filters"}
            </button>
            {hasFilters && (
              <button
                onClick={() => {
                  setQuery("");
                  setBrand("");
                  setMaxPrice(undefined);
                  setRating(undefined);
                  setShippingLocation("");
                  fetchProducts("", "", undefined, undefined, "");
                }}
                className="px-4 py-3 text-neutral-400 hover:text-white transition"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {loading && <p className="text-neutral-500 mb-4">Loading results…</p>}

        {products.length === 0 && !loading ? (
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-12 text-center text-neutral-400">
            No products yet. Try adjusting filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(tier === "premium" ? products : products.slice(0, 5)).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {tier === "normal" && products.length > 5 && (
          <div className="mt-6 bg-neutral-900/70 border border-cyan-500/30 text-white rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Limited to top 5 results on free tier.</p>
              <p className="text-neutral-400 text-sm">Unlock unlimited global comparisons with SKCS Premium.</p>
            </div>
            <a
              href="/pricing"
              className="px-5 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
            >
              Upgrade Now
            </a>
          </div>
        )}
      </section>
    </main>
  );
}

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-neutral-400">Loading products...</div>}>
      <ProductsClientInner />
    </Suspense>
  );
}
