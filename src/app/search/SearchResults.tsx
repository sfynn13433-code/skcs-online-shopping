// app/search/SearchResults.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Product {
  id: number;
  title: string;
  price: number;
  discount_price: number | null;
  image: string;
  store: string;
  rating: number | null;
  affiliate_url: string;
}

export default function SearchResults() {
  const params = useSearchParams();
  const query = params.get('q');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query) fetchResults();
  }, [query]);

  async function fetchResults() {
    const { data, error } = await supabase
      .from('products')
      .select('id,title,price,discount_price,image,store,rating,affiliate_url')
      .textSearch('search_vector', query!)
      .limit(48);

    if (!error && data) {
      setProducts(data);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
            <h3 className="text-sm font-semibold mt-2 line-clamp-2">{product.title}</h3>
            <p className="text-xs text-gray-500">{product.store}</p>
            <div className="mt-2">
              {product.discount_price ? (
                <>
                  <span className="text-red-600 font-bold">${product.discount_price}</span>
                  <span className="line-through text-gray-400 text-sm ml-2">${product.price}</span>
                </>
              ) : (
                <span className="font-bold">${product.price}</span>
              )}
            </div>
            <a
              href={product.affiliate_url}
              target="_blank"
              className="block mt-3 bg-blue-600 text-white text-center py-1 rounded hover:bg-blue-700"
            >
              View Deal
            </a>
          </div>
        ))}
      </div>
    </>
  );
}