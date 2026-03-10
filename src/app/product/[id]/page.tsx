// src/app/product/[id]/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

// Store badge colors (unchanged)
function getStoreColor(store: string) {
  switch (store.toLowerCase()) {
    case "amazon": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "ebay": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "aliexpress": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "takealot": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "evetech": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "wootware": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

// ZA-friendly price formatter with fallback
function formatPrice(price: number, store: string): string {
  const isZAR = ["takealot", "evetech", "wootware"].some(s => 
    store.toLowerCase().includes(s)
  );
  const locale = isZAR ? 'en-ZA' : 'en-US';
  const currency = isZAR ? 'ZAR' : 'USD';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

// Type for product with nested offers
interface ProductWithOffers {
  id: string;
  title: string;
  image: string;
  category: string;
  specs: string | null;
  product_offers: Array<{
    id: string;
    store: string;
    price: number;
    affiliate_url: string;
  }>;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set() {},
        remove() {},
      },
    }
  );

  // ──────────────────────────────────────────────────────────────
  // FIXED QUERY: Explicit foreign key to resolve ambiguity (PGRST201)
  // ──────────────────────────────────────────────────────────────
  const { data: product, error } = await supabase
    .from('products_new')
    .select(`
      id,
      title,
      image,
      category,
      specs,
      product_offers!fk_product_offers_product (
        id,
        store,
        price,
        affiliate_url
      )
    `)
    .eq('id', id)
    .single<ProductWithOffers>();

  // Improved error handling with better diagnostics
  if (error) {
    console.error('Supabase query failed:', {
      message: error.message || '(no message — often row missing or RLS blocked)',
      code: error.code,
      details: error.details,
      hint: error.hint,
      fullError: JSON.stringify(error, null, 2),
      attemptedProductId: id,
    });

    const isNotFound = error.code === 'PGRST116' || 
                      (!error.message && !error.code && !error.details);
    const isAmbiguousRelation = error.code === 'PGRST201';
    const isNetworkError = error.message?.includes('fetch failed') || 
                          error.details?.includes('ConnectTimeoutError');

    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <p className="text-red-500 text-xl mb-4 font-semibold">
          {isNetworkError
            ? 'Network Connection Timeout'
            : isAmbiguousRelation
              ? 'Database Relation Error'
              : isNotFound
                ? 'Product Not Found'
                : 'Error Loading Product'}
        </p>

        <p className="text-neutral-300 mb-6 max-w-lg text-center leading-relaxed">
          {isNetworkError
            ? 'Could not connect to Supabase (timeout after 10s). Check your internet, VPN, or try again later. Supabase project: iyowygnnygzodueirxys.supabase.co'
            : isAmbiguousRelation
              ? 'Multiple foreign keys found between products_new and product_offers. ' +
                'Try changing to: product_offers!product_offers_product_id_fkey ' +
                '(check Supabase → product_offers → Foreign Keys tab for the active one).'
              : isNotFound
                ? `No product found with ID: ${id}. It may have been deleted or the ID is incorrect.`
                : error.message || 
                  'Unknown error. Check console logs, Supabase RLS policies, or environment variables.'}
        </p>

        <Link 
          href="/" 
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-2">Product not found</p>
        <p className="text-neutral-500 mb-8">ID: {id}</p>
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline text-lg">
          ← Return to Home
        </Link>
      </div>
    );
  }

  const offers = product.product_offers || [];
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);
  const hasOffers = sortedOffers.length > 0;

  return (
    <main className="bg-black min-h-screen text-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Back link */}
        <Link
          href={`/category/${product.category.toLowerCase()}`}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {product.category}
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Product Image */}
          <div className="bg-neutral-900/40 rounded-3xl p-6 md:p-10 border border-white/5">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={82}
              />
            </div>
          </div>

          {/* Product Info + Offers */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {product.title}
            </h1>

            {/* Specifications Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Specifications</h2>
              {product.specs && product.specs.trim() ? (
                <div className="bg-neutral-900/60 border border-white/10 rounded-xl p-6 text-neutral-200 leading-relaxed whitespace-pre-line">
                  {product.specs.split('\n').map((line, index) => (
                    <p key={index} className={line.trim() ? 'mb-2' : 'mb-4'}>
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 italic text-lg">
                  Detailed specifications not available for this product yet.
                </p>
              )}
            </section>

            {/* Price Comparison Header */}
            <h2 className="text-2xl font-bold mb-6">
              {hasOffers 
                ? `Compare prices from ${offers.length} ${offers.length === 1 ? 'store' : 'stores'}`
                : 'No current offers available'}
            </h2>

            {hasOffers ? (
              <div className="space-y-5">
                {sortedOffers.map((offer, index) => {
                  const isBestPrice = index === 0;
                  return (
                    <div
                      key={offer.id}
                      className={`p-5 rounded-xl border transition-all duration-200 ${
                        isBestPrice
                          ? 'border-cyan-600/60 bg-cyan-950/20 shadow-lg shadow-cyan-900/20'
                          : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${getStoreColor(offer.store)}`}>
                            {offer.store}
                          </span>
                          <span className="text-3xl md:text-4xl font-black text-cyan-400 tracking-tight">
                            {formatPrice(offer.price, offer.store)}
                          </span>
                          {isBestPrice && (
                            <span className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                              Best Price
                            </span>
                          )}
                        </div>

                        <a
                          href={`/api/track-click?title=${encodeURIComponent(product.title)}&store=${encodeURIComponent(offer.store)}&url=${encodeURIComponent(offer.affiliate_url)}`}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="bg-white hover:bg-cyan-400 text-black font-semibold px-7 py-3 rounded-lg transition min-w-[120px] text-center shadow-md"
                          aria-label={`Buy this product from ${offer.store}`}
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-8 text-center">
                <p className="text-neutral-400 text-lg mb-2">
                  No store offers are listed at the moment.
                </p>
                <p className="text-neutral-500 text-sm">
                  New prices from Takealot, Evetech, Amazon, and others may appear soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}