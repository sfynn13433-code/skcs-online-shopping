"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// We use the relative path (../../) to find our bridge file
import { supabase } from "../../lib/supabase"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This command asks Supabase to verify the credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Login Error: " + error.message);
      setLoading(false);
    } else {
      alert("Welcome back!");
      // Send the user to the home page after successful login
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-12 h-12 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-500 to-blue-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-neutral-900 flex flex-col items-center justify-center leading-none">
                <span className="text-white font-extrabold text-[10px] tracking-wide">SK</span>
                <span className="text-white font-extrabold text-[10px] tracking-wide -mt-1">CS</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome Back</h1>
          <p className="text-neutral-400 text-sm">Sign in to your SKCS account.</p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-neutral-300">Password</label>
              <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition">Forgot password?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg px-4 py-3 mt-4 hover:bg-neutral-200 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-neutral-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
              Create one
            </Link>
          </p>
          <p className="text-sm">
            <Link href="/" className="text-neutral-500 hover:text-white transition">
              Return to Home
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}