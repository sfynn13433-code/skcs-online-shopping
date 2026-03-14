// src/app/category/[slug]/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

const categoryNameMap: Record<string, string> = {
  electronics: 'Electronics',
  fashion: 'Fashion',
  gaming: 'Gaming',
  other: 'Other',
  accessories: 'accessories',
  'home-kitchen': 'Home & Kitchen',
  'beauty-personal-care': 'Beauty & Personal Care',
  'pet-supplies': 'Pet Supplies'
}

function getStoreColor(store: string) {
  switch (store?.toLowerCase()) {
    case "amazon": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "ebay": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "aliexpress": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "takealot": return "bg-green-500/20 text-green-400 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params first (Next.js 15 requirement)
  const { slug } = await params
  
  // 2. Resolve Category Name
  const categoryName = categoryNameMap[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1))

  // 3. Initialize Supabase Client
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) {
          try { cookieStore.set({ name, value, ...options }) } catch (error) { /* Handle edge cases in Server Actions */ }
        },
        remove(name: string, options: any) {
          try { cookieStore.delete({ name, ...options }) } catch (error) { /* Handle edge cases in Server Actions */ }
        },
      },
    }
  )

  // 4. Fetch from the new 'products' table
  const { data: products, error } = await supabase
    .from('products')
    .select('*') // Grabbing all columns to ensure we don't miss any new fields
    .eq('category', categoryName)

  if (error) {
    console.error('=== Supabase Error ===')
    console.error('Message:', error.message)
    console.error('Hint:', error.hint)
    
    return (
      <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Inventory Sync Error</h2>
        <p className="text-neutral-400 max-w-md mb-6">{error.message}</p>
        <Link href="/" className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition">← Back to Home</Link>
      </div>
    )
  }

  return (
    <main className="bg-black min-h-screen text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-cyan-500 mb-4">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span className="text-neutral-800">/</span>
              <span className="text-neutral-500">Inventory</span>
            </nav>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
              {categoryName}
            </h1>
          </div>
          <div className="text-neutral-500 text-sm font-medium italic">
            Found {products?.length || 0} Verified Items
          </div>
        </div>

        {/* Inventory Grid */}
        {!products || products.length === 0 ? (
          <div className="bg-neutral-900/30 border border-white/5 rounded-[3rem] p-20 text-center">
            <p className="text-neutral-500 mb-8 italic text-lg">No verified inventory found in this sector.</p>
            <Link href="/chat" className="inline-flex items-center gap-3 bg-cyan-500 text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20">
              🤖 Ask Assistant
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-2xl flex flex-col">
                {/* Product Image */}
                <div className="relative w-full h-72 bg-neutral-950 p-8 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.title} 
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-cyan-400 font-black text-lg">
                    ${product.price}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">
                      {product.brand || 'SKCS Verified'}
                    </span>
                    <div className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded-md border ${getStoreColor(product.store)}`}>
                      {product.store || 'Amazon'}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-8 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <a 
                      href={product.affiliate_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full bg-white text-black text-center py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all active:scale-95"
                    >
                      Secure Item
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}