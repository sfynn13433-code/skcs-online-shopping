// src/app/category/[slug]/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

// Map URL slugs to the exact category names stored in your database
const categoryNameMap: Record<string, string> = {
  electronics: 'Electronics',
  fashion: 'Fashion',
  gaming: 'Gaming',
  other: 'Other',
  accessories: 'accessories', // note: lowercase
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  console.log('Received slug:', slug)
  console.log('Map keys:', Object.keys(categoryNameMap))

  // 1. Try the map first
  let categoryName = categoryNameMap[slug]

  // 2. If map fails, try capitalizing the first letter
  if (!categoryName) {
    const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1)
    console.log('Trying capitalized version:', capitalized)
    categoryName = capitalized
  }

  // 3. If we still don't have a category name, show error
  if (!categoryName) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category not found</h1>
          <p className="text-neutral-400 mb-4">Slug: "{slug}"</p>
          <p className="text-neutral-400 mb-4">
            Tried: map keys {Object.keys(categoryNameMap).join(', ')} and capitalization
          </p>
          <Link href="/" className="text-cyan-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // ✅ Await cookies() to get the actual cookie store
  const cookieStore = await cookies()

  // Create Supabase client with correct arguments
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},
        remove() {},
      },
    }
  )

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', categoryName)

  if (error) {
    console.error('Error fetching products:', error)
    return <div className="text-white p-10">Failed to load products.</div>
  }

  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

  return (
    <main className="bg-black min-h-screen text-white pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-cyan-500 hover:text-cyan-400 transition">
            ← Home
          </Link>
          <h1 className="text-4xl font-black">{displayName}</h1>
        </div>

        {products.length === 0 ? (
          <p className="text-neutral-500">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const displayStore = product.store && product.store !== "Unknown" ? product.store : "Marketplace";
              return (
                <div
                  key={product.id}
                  className="group bg-neutral-900/40 border border-white/5 rounded-[2rem] p-5 hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-neutral-800">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400">
                      {displayStore}
                    </span>
                    <h3 className="font-bold text-base mb-2 line-clamp-2 mt-2">{product.title}</h3>
                    <p className="text-2xl font-black text-white">{product.price}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-cyan-500 hover:text-black transition-all">
                      Track
                    </button>
                    
                    {/* CHANGED: This now routes to your comparison page! */}
                    <Link
                      href={`/product/${product.product_group}`}
                      className="bg-cyan-500 text-black py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-white transition-all text-center flex items-center justify-center"
                    >
                      Compare Prices
                    </Link>
                    
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  )
}