"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function WatchlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // This fetches ONLY the items belonging to the signed-in user
        const { data, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', user.id);

        if (!error) setItems(data || []);
      }
      setLoading(false);
    };

    fetchWatchlist();
  }, []);

  const removeItem = async (id: number) => {
    // Allows users to stop tracking an item
    const { error } = await supabase.from('watchlist').delete().eq('id', id);
    if (!error) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            AI <span className="text-cyan-500">Watchlist</span>
          </h1>
          <Link href="/" className="text-sm text-neutral-400 hover:text-white transition font-bold">
            ← BACK TO SEARCH
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-[3rem] border border-white/5">
            <p className="text-neutral-500 mb-6 font-medium">Your AI isn't tracking anything yet.</p>
            <Link href="/" className="bg-cyan-500 text-white px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition">
              Start Tracking Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-neutral-900/80 border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center group hover:border-cyan-500/50 transition duration-500 shadow-xl">
                <div>
                  <h3 className="font-bold text-lg">{item.product_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      AI Active Tracking
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mb-1">Starting Price</p>
                    <p className="text-2xl font-black text-white">{item.current_price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-neutral-600 hover:text-red-500 transition-colors"
                    title="Stop tracking"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}