"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase"; 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Create the Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert("Auth Error: " + authError.message);
      setLoading(false);
      return;
    }

    // 2. Create the Profile in your new 'profiles' table
    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        { 
          id: authData.user.id, 
          full_name: name, 
          tier: 'normal' // Everyone starts here!
        }
      ]);

      if (profileError) {
        alert("Profile Error: " + profileError.message);
      } else {
        alert("Success! Account and Profile created. Check your email!");
        router.push("/signin");
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-12 h-12 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 via-cyan-500 to-blue-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-neutral-900 flex flex-col items-center justify-center leading-none">
                <span className="text-white font-extrabold text-[10px] tracking-wide">SK</span>
                <span className="text-white font-extrabold text-[10px] tracking-wide -mt-1">CS</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Create an Account</h1>
          <p className="text-neutral-400 text-sm text-center">Join SKCS to start comparing deals.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="e.g. John Doe"
            />
          </div>

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
            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-neutral-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
              Sign In
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