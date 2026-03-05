"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase"; 

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch User and Profile Data
  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (!error) setProfile(data);
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    window.location.reload(); 
  };

  // 2. Add to Watchlist Logic (Foreign Key: user_id)
  const addToWatchlist = async (product: any) => {
    if (!profile) {
      alert("Please sign in to track products!");
      return;
    }

    const { error } = await supabase
      .from('watchlist')
      .insert([
        { 
          user_id: profile.id, 
          product_name: product.title, 
          current_price: product.price 
        }
      ]);

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert(`🛒 ${product.title} added to your SKCS Shopping List!`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <main className="bg-black min-h-screen text-white">
      {/* NAVBAR - REBRANDED */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs shadow-lg shadow-cyan-500/20 text-white">SKCS</div>
             <span className="font-black tracking-tighter text-xl uppercase italic">Online Shopping</span>
          </div>

          <div className="flex items-center gap-6">
            {loading ? (
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            ) : profile ? (
              <div className="flex items-center gap-4">
                <Link href="/watchlist" className="text-xs text-white font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                  My Shopping List
                </Link>
                <div className="text-right hidden md:block border-l border-white/10 pl-4">
                  <p className="text-sm font-bold text-white">{profile.full_name}</p>
                  <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Premium Member</p>
                </div>
                <button onClick={handleSignOut} className="text-xs text-neutral-400 hover:text-white transition-all">Sign Out</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/signin" className="text-sm font-medium hover:text-cyan-400 transition">Sign In</Link>
                <Link href="/register" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-400 hover:text-white transition-all shadow-lg">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION - REBRANDED */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000" 
            alt="Shopping" 
            fill 
            className="object-cover object-top opacity-60"
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" /> 
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.85] drop-shadow-2xl">
            SKCS <span className="text-cyan-500">ONLINE</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-10 max-w-2xl mx-auto font-light tracking-tight italic">
            Your Premium South African Marketplace
          </p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="What are you looking for today?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5 text-xl text-white placeholder:text-neutral-400 focus:ring-4 focus:ring-cyan-500/40 outline-none transition-all shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl font-black tracking-tight uppercase">Featured <span className="text-cyan-500">Deals</span></h2>
           <div className="h-[1px] flex-grow bg-white/10 ml-8 hidden md:block"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="group bg-neutral-900/40 border border-white/5 rounded-[2rem] p-5 hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all duration-500">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-neutral-800">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-2 py-0.5 rounded">{p.store}</span>
                {profile?.tier === 'pro' && (
                  <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full font-bold">BEST PRICE</span>
                )}
              </div>
              <h3 className="font-bold text-base mb-2 line-clamp-1">{p.title}</h3>
              <p className="text-2xl font-black text-white">{p.price}</p>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => addToWatchlist(p)}
                  className="bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-cyan-500 hover:text-black transition-all"
                >
                  Track Price
                </button>
                <button className="bg-cyan-500 text-black py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-white transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const products = [
  { id: 1, title: "Sony WH-1000XM5 Headphones", price: "R 6,999", store: "Amazon", image: "https://images.unsplash.com/photo-1648447226217-cd77ad400f0b?q=80&w=800" },
  { id: 2, title: "Apple Watch Series 9", price: "R 9,499", store: "Takealot", image: "https://images.unsplash.com/photo-1434493907317-a46b53b81846?q=80&w=800" },
  { id: 3, title: "LG 27” 4K UHD Monitor", price: "R 5,999", store: "Amazon", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800" },
  { id: 4, title: "Logitech MX Mechanical", price: "R 3,299", store: "Takealot", image: "https://images.unsplash.com/photo-1626958390898-162d3577f593?q=80&w=800" },
];