// src/app/product/[group]/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProductPage({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params
  const cookieStore = await cookies()

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

  // 1. Destructure directly for better TypeScript inference
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('product_group', group)

  // 2. Combine the error catching logic
  if (error) {
    console.error('Supabase error:', error)
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-red-500 mb-2">Error: {error.message}</p>
        <p className="text-neutral-400 text-sm">
          Hint: {error.hint || 'Check if column "product_group" exists in your products table.'}
        </p>
        <Link href="/" className="text-cyan-400 hover:underline mt-4">
          ← Back to Home
        </Link>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-4xl font-bold mb-4">Product not found</p>
        <p className="text-neutral-400 mb-2">Group: "{group}"</p>
        <p className="text-neutral-500 text-sm">
          No products with this product_group value.
        </p>
        <Link href="/" className="text-cyan-400 hover:underline mt-4">
          ← Back to Home
        </Link>
      </div>
    )
  }

  const product = products[0]

  return (
    <main className="bg-black min-h-screen text-white pt-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="text-cyan-400 hover:underline">
          ← Back
        </Link>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
               <Image
                 src={product.image}
                 alt={product.title}
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <p className="text-neutral-400 mb-6">
              Compare prices from multiple stores
            </p>

            <div className="space-y-4">
              {/* Added 'index' to the map function to use as a fallback key */}
              {products.map((p, index) => (
                <div
                  key={p.id || `fallback-key-${index}`}
                  className="flex items-center justify-between bg-neutral-900 p-4 rounded-xl"
                >
                  <div>
                    <p className="font-bold">{p.store}</p>
                    <p className="text-cyan-400 text-lg">${p.price}</p>
                  </div>

                  <a
                    href={`/api/track-click?title=${encodeURIComponent(p.title)}&store=${encodeURIComponent(p.store)}&url=${encodeURIComponent(p.affiliate_url)}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition"
                  >
                    Buy
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}