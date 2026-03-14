"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { Search, Menu } from "lucide-react";

interface UserProfile {
  id: string;
  full_name: string;
  tier?: string;
}

export default function Navbar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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

  // Global AI search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const event = new CustomEvent("global-search", { detail: searchTerm });
    window.dispatchEvent(event);

    const aiSection = document.getElementById("ai-assistant-section");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSearchTerm(prompt);

    const event = new CustomEvent("global-search", { detail: prompt });
    window.dispatchEvent(event);

    const aiSection = document.getElementById("ai-assistant-section");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-[1600px] mx-auto px-6 h-22 flex items-center gap-8">

        {/* Browse Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-base font-semibold hover:text-cyan-400 transition"
        >
          <Menu size={20} />
          Browse
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">

          <Image
  src="/skcs.jpg"
  alt="SKCS Logo"
  width={44}
  height={44}
  className="object-contain"
  priority
/>


          <span className="font-black tracking-tighter text-xl uppercase italic hidden lg:block">
            Online Shopping <span className="text-cyan-500">&</span> Booking Centre
          </span>

        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-base text-neutral-300">

          <Link href="/deals" className="hover:text-cyan-400 transition">
            Deals
          </Link>

          <Link href="/assistant" className="hover:text-cyan-400 transition">
            AI Assistant
          </Link>

        </nav>

        {/* Search + AI Prompts */}
        <div className="flex-1 max-w-xl hidden md:flex flex-col">

          <form onSubmit={handleSearch} className="relative group">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-cyan-500 transition-colors" />

            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
              placeholder="Search products, brands or deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </form>

          {/* Smart AI Prompts */}
          <div className="flex gap-4 mt-2 text-xs text-neutral-500 flex-wrap">

            <span className="text-neutral-400">Try:</span>

            <button
              onClick={() => handlePromptClick("best gaming laptop under $1500")}
              className="hover:text-cyan-400 transition"
            >
              gaming laptop under $1500
            </button>

            <button
              onClick={() => handlePromptClick("cheap wireless earbuds")}
              className="hover:text-cyan-400 transition"
            >
              wireless earbuds
            </button>

            <button
              onClick={() => handlePromptClick("best smart TV 2026")}
              className="hover:text-cyan-400 transition"
            >
              smart TV 2026
            </button>

          </div>

        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-6 shrink-0">

          {loadingProfile ? (
            <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          ) : profile ? (
            <div className="flex items-center gap-4">

              <Link
                href="/watchlist"
                className="text-sm text-white font-semibold bg-white/10 px-5 py-2.5 rounded-full hover:bg-cyan-500 hover:text-black transition"
              >
                My List
              </Link>

              <button
                onClick={handleSignOut}
                className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
              >
                Sign Out
              </button>

            </div>
          ) : (

            <div className="flex items-center gap-4">

              <Link
                href="/signin"
                className="text-base font-medium hover:text-cyan-400 transition"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-cyan-400 hover:text-white transition shadow-lg"
              >
                Join Now
              </Link>

            </div>

          )}

        </div>

      </div>

      {/* Marketplace Dropdown */}
      {menuOpen && (
        <div className="w-full bg-black border-t border-white/10 shadow-xl">

          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-10">

            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                Categories
              </h3>

              <ul className="space-y-3 text-sm">
                <li><Link href="/category/electronics" className="hover:text-cyan-400">Electronics</Link></li>
                <li><Link href="/category/fashion" className="hover:text-cyan-400">Fashion</Link></li>
                <li><Link href="/category/gaming" className="hover:text-cyan-400">Gaming</Link></li>
                <li><Link href="/category/accessories" className="hover:text-cyan-400">Accessories</Link></li>
              </ul>
            </div>

            {/* Stores */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                Stores
              </h3>

              <ul className="space-y-3 text-sm">
                <li className="text-neutral-400">Amazon</li>
                <li className="text-neutral-400">AliExpress</li>
                <li className="text-neutral-400">Fiverr</li>
                <li className="text-neutral-400">eBay</li>
                <li className="text-neutral-400">Takealot</li>
              </ul>
            </div>

            {/* Guides */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                Guides
              </h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-cyan-400">
                    Shopping Guides
                  </Link>
                </li>
                <li className="text-neutral-500">Product Comparisons</li>
                <li className="text-neutral-500">Deal Strategies</li>
              </ul>
            </div>

          </div>

        </div>
      )}

    </header>
  );
}
