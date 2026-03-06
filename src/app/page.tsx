"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";

interface UserProfile {
  id: string;
  full_name: string;
  tier?: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  store: string;
  image: string;
  affiliateLink: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
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

  function getStoreColor(store: string) {
    switch (store.toLowerCase()) {
      case "amazon":
        return "bg-orange-500/20 text-orange-400";
      case "takealot":
        return "bg-blue-500/20 text-blue-400";
      case "makro":
        return "bg-red-500/20 text-red-400";
      case "loot":
        return "bg-purple-500/20 text-purple-400";
      case "evetech":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-cyan-400/10 text-cyan-400";
    }
  }

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <main className="bg-black min-h-screen text-white pt-20">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs shadow-lg shadow-cyan-500/20 text-white">
              SKCS
            </div>

            <span className="font-black tracking-tighter text-xl uppercase italic">
              Online Shopping & Booking Centre
            </span>
          </div>

          <div className="flex items-center gap-6">
            {loadingProfile ? (
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            ) : profile ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/watchlist"
                  className="text-xs text-white font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-black transition-all"
                >
                  My List
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-xs text-neutral-400 hover:text-white transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/signin"
                  className="text-sm font-medium hover:text-cyan-400 transition"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-400 hover:text-white transition-all shadow-lg"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="SKCS Online Shopping"
            fill
            className="object-cover object-center opacity-90"
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

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-20 min-h-[600px]">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black tracking-tight uppercase">
            Featured <span className="text-cyan-500">Deals</span>
          </h2>
          <div className="h-[1px] flex-grow bg-white/10 ml-8 hidden md:block"></div>
        </div>

        {loadingProducts ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-bold tracking-widest uppercase animate-pulse">
              Syncing with Marketplace Servers...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => {
              const storeBadgeClass = `text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${getStoreColor(p.store)}`;

              return (
                <div
                  key={p.id}
                  className="group bg-neutral-900/40 border border-white/5 rounded-[2rem] p-5 hover:bg-neutral-900/80 hover:border-cyan-500/50 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-neutral-800">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <span className={storeBadgeClass}>
                      {p.store}
                    </span>

                    <h3 className="font-bold text-base mb-2 line-clamp-2 mt-2">
                      {p.title}
                    </h3>

                    <p className="text-2xl font-black text-white">
                      {p.price}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-cyan-500 hover:text-black transition-all">
                      Track
                    </button>

                    <a
                      href={p.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-cyan-500 text-black py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-white transition-all text-center flex items-center justify-center"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-black text-[10px]">
                SKCS
              </div>

              <span className="font-black text-xl italic uppercase">
                Online Shopping & Booking Centre
              </span>
            </div>

            <p className="text-neutral-500 max-w-sm text-sm leading-relaxed">
              The premium global destination for online shopping, booking services, and marketplace deals.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Resources
            </h4>

            <ul className="space-y-4 text-sm text-neutral-500">
              <li>
                <Link href="/about" className="hover:text-cyan-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-500 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Stay Updated
            </h4>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-cyan-500 flex-grow"
              />

              <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-cyan-500 transition">
                Join
              </button>
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