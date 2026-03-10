"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import AIshoppingAssistant from "../components/AIshoppingAssistant";
import BookingSection from "../components/BookingSection";

interface UserProfile {
  id: string;
  full_name: string;
  tier?: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Define categories
  const categories = [
    { name: "Electronics", slug: "electronics", icon: "💻", count: 12 },
    { name: "Fashion", slug: "fashion", icon: "👕", count: 8 },
    { name: "Gaming", slug: "gaming", icon: "🎮", count: 6 },
    { name: "Other", slug: "other", icon: "📦", count: 15 },
    { name: "Accessories", slug: "accessories", icon: "🔌", count: 20 },
  ];

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (!error) setProfile(data);
      }
      setLoadingProfile(false);
    };
    
    getProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="bg-black min-h-screen text-white">
      {/* HERO - full screen with full image visible */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="SKCS Online Shopping"
            fill
            className="object-contain opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.85] drop-shadow-2xl">
            SKCS <span className="text-cyan-500">ONLINE</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-10 max-w-2xl mx-auto font-light tracking-tight italic drop-shadow-md">
            Premium Global Marketplace
          </p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5 text-xl text-white outline-none transition-all shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* AI SHOPPING ASSISTANT */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <AIshoppingAssistant />
      </section>

      {/* TRAVEL BOOKING SECTION */}
      <BookingSection />

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black tracking-tight uppercase">
            Shop by <span className="text-cyan-500">Category</span>
          </h2>
          <div className="h-[1px] flex-grow bg-white/10 ml-8 hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group bg-neutral-900/40 border border-white/5 rounded-2xl p-8 hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
              <p className="text-neutral-500 text-sm">{category.count} products</p>
              <div className="mt-4 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Browse →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED CATEGORY BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-r from-cyan-900 to-black border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              Featured Category
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Level Up Your Setup
            </h2>
            <p className="text-neutral-300 mb-8 text-lg">
              Compare prices on the latest consoles, accessories, and top-tier PC components from global sellers.
            </p>
            <Link
              href="/category/gaming"
              className="inline-block bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            >
              Shop Gaming
            </Link>
          </div>
          
          <div className="relative z-10 text-9xl drop-shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
            🎮
          </div>
          
          {/* Abstract background glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </section>

      {/* ALIEXPRESS DEALS SECTION */}
      <section className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight uppercase mb-4">
            AliExpress <span className="text-cyan-500">Deals</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
            Hand‑picked offers with your exclusive tracking ID. Click, shop, and save!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://s.click.aliexpress.com/e/_c3ElbFoT" target="_blank" rel="noopener sponsored" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg">Higher Commission</a>
            <a href="https://s.click.aliexpress.com/e/_c39QWNkL" target="_blank" rel="noopener sponsored" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg">Hot Deals</a>
            <a href="https://s.click.aliexpress.com/e/_c4PyOiIx" target="_blank" rel="noopener sponsored" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg">Featured Products</a>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center justify-center gap-2">
              <span className="text-3xl">🔥</span> Choice Day – Shop by Region
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://s.click.aliexpress.com/e/_c2RF8vmf" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">South Africa</a>
              <a href="https://s.click.aliexpress.com/e/_c4axtOe3" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Mexico</a>
              <a href="https://s.click.aliexpress.com/e/_c2v0WVLt" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Brazil</a>
              <a href="https://s.click.aliexpress.com/e/_c3PKWdkL" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">United States</a>
              <a href="https://s.click.aliexpress.com/e/_c4aeJNbp" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Korea</a>
              <a href="https://s.click.aliexpress.com/e/_c3rmPpKn" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Global</a>
            </div>
          </div>
          <div className="mt-8">
            <a href="https://s.click.aliexpress.com/e/_c3a07dG3" target="_blank" rel="noopener sponsored" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all border border-white/20">
              <span>🏠</span> AliExpress Home (Smart Links)
            </a>
          </div>
          <p className="text-xs text-neutral-600 mt-10">
            All links use your personal tracking ID: <span className="text-cyan-500 font-mono">SKCS</span>
          </p>
        </div>
      </section>

      {/* SOVRN NETWORK DEALS SECTION */}
      <section className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black tracking-tight uppercase mb-4">
            Sovrn <span className="text-cyan-500">Network Deals</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
            Hand‑picked premium offers with your exclusive tracking ID. Click, shop, and save!
          </p>
          
          {/* Top Deal Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-transparent">
              Top Sellers
            </a>
            <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-transparent">
              Exclusive Offers
            </a>
            <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-transparent">
              Tech & Electronics
            </a>
          </div>

          {/* Department Shopping */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center justify-center gap-2">
              <span className="text-3xl">🛒</span> Shop Top Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Home & Furniture</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Toys & Games</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Fashion & Clothing</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Sports & Outdoors</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Beauty & Grooming</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Everyday Essentials</a>
            </div>
          </div>

          {/* Smart Link Home */}
          <div className="mt-8">
            <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all border border-white/20">
              <span>🏠</span> Sovrn Home (Smart Links)
            </a>
          </div>

          {/* Tracking ID Footer */}
          <p className="text-xs text-neutral-600 mt-10">
            All links use your personal tracking ID: <span className="text-cyan-500 font-mono">SKCS</span>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-black text-[10px]">SKCS</div>
              <span className="font-black text-xl italic uppercase">Online Shopping & Booking Centre</span>
            </div>
            <p className="text-neutral-500 max-w-sm text-sm leading-relaxed">
              The premium global destination for online shopping, booking services, and marketplace deals.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link href="/about" className="hover:text-cyan-500 transition">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-500 transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-cyan-500 flex-grow" />
              <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-cyan-500 transition">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">
          <p>© 2026 SKCS Online Shopping. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}