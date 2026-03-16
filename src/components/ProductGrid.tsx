"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { buildTrackedAffiliateLink } from "@/services/affiliateLinks";

interface Product {
  id: number;
  title: string;
  price: number;
  discount_price: number | null;
  image: string | null;
  store: string;
  rating: number | null;
  affiliate_url: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  async function fetchProducts() {
    const from = page * 24;
    const to = from + 23;

    const { data, error } = await supabase
      .from("products")
      .select("id,title,price,discount_price,image,store,rating,affiliate_url")
      .range(from, to);

    if (!error && data) {
      setProducts((prev) => [...prev, ...data]);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >

            <img
              src={product.image || "https://via.placeholder.com/300x300?text=No+Image"}
              alt={product.title}
              className="w-full h-40 object-contain mb-3"
            />

            <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1">
              {product.title}
            </h3>

            <p className="text-xs text-gray-500 mb-2">
              {product.store}
            </p>

            <div className="mb-3">
              {product.discount_price ? (
                <>
                  <span className="text-red-600 font-bold">
                    ${product.discount_price}
                  </span>
                  <span className="line-through text-gray-400 text-sm ml-2">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="font-bold text-gray-900">
                  ${product.price}
                </span>
              )}
            </div>

            <a
              href={buildTrackedAffiliateLink({
                url: product.affiliate_url,
                title: product.title,
                store: product.store,
                productId: product.id,
              })}
              className="block text-center bg-black text-white text-sm py-2 rounded hover:bg-gray-800"
            >
              View Deal
            </a>

          </div>

        ))}

      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage(page + 1)}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Load More Products
        </button>
      </div>

    </div>
  );
}
