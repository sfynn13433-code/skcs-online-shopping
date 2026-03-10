// src/app/category/[slug]/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

// Map URL slugs to the exact category names stored in products_new
const categoryNameMap: Record<string, string> = {
  electronics: 'Electronics',
  fashion: 'Fashion',
  gaming: 'Gaming',
  other: 'Other',
  accessories: 'accessories',
}

// Store colors for badges
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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // 1. Try the map first
  let categoryName = categoryNameMap[slug]

  // 2. If map fails, try capitalizing the first letter
  if (!categoryName) {
    const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1)
    categoryName = capitalized
  }

  // 3. If we still don't have a category name, show error
  if (!categoryName) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category not found</h1>
          <p className="text-neutral-400 mb-4">Slug: "{slug}"</p>
          <Link href="/" className="text-cyan-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const cookieStore = await cookies()

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
  )

  // Fetch products from products_new, and their associated offers from product_offers
  const { data: products, error } = await supabase
    .from('products_new')
    .select(`
      id,
      title,
      image,
      category,
      product_offers!fk_product_offers_product (
        store,
        price,
        affiliate_url
      )
    `)
    .eq('category', categoryName)

  if (error) {
    // Detailed error logging
    console.error('=== Supabase Error Details ===')
    console.error('Message:', error.message)
    console.error('Details:', error.details)
    console.error('Hint:', error.hint)
    console.error('Code:', error.code)
    console.error('Full error:', JSON.stringify(error, null, 2))

    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Products</h2>
        <p className="text-white">Message: {error.message || 'Unknown error'}</p>
        {error.hint && <p className="text-neutral-400 mt-2">Hint: {error.hint}</p>}
        {error.code && <p className="text-neutral-400">Code: {error.code}</p>}
        <p className="text-neutral-400 mt-4">Category: {categoryName}</p>
        <Link href="/" className="text-cyan-500 hover:underline mt-6 block">← Back to Home</Link>
      </div>
    )
  }

  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

  return (
    <main className="bg-black min-h-screen text-white pt-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className="text-neutral-600">/</span>
          <h1 className="text-3xl md:text-4xl font-black">{displayName}</h1>
        </div>

        {!products || products.length === 0 ? (
          <p className="text-neutral-500 text-center py-20">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const offers = product.product_offers || []
              const lowestPrice = offers.length > 0 ? Math.min(...offers.map(o => o.price)) : null
              const cheapestStore = offers.length > 0 ? offers.find(o => o.price === lowestPrice)?.store : null

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 bg-neutral-800 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {offers.length > 0 && (
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full border border-white/10">
                        {offers.length} offers
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">{product.title}</h3>
                    
                    {/* Price and Store Info */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        {lowestPrice ? (
                          <>
                            <span className="text-2xl font-black text-cyan-400">${lowestPrice.toFixed(2)}</span>
                            <span className="text-xs text-neutral-500 ml-2">lowest</span>
                          </>
                        ) : (
                          <span className="text-lg text-neutral-500">Price unavailable</span>
                        )}
                      </div>
                      {cheapestStore && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStoreColor(cheapestStore)}`}>
                          {cheapestStore}
                        </span>
                      )}
                    </div>

                    {/* Button */}
                    <div className="bg-cyan-500 text-black text-center py-3 rounded-xl font-bold group-hover:bg-cyan-400 transition">
                      View {offers.length} Offers
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}