"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

interface UserProfile {
  id: string;
  full_name: string;
  tier?: string;
}

export default function Navbar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xs shadow-lg shadow-cyan-500/20 text-white">
            SKCS
          </div>
          <span className="font-black tracking-tighter text-xl uppercase italic">
            Online Shopping & Booking Centre
          </span>
        </div>

        {/* Right side: auth buttons */}
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
  );
}