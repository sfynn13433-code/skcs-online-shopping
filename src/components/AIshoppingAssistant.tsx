"use client";

import { useState, useEffect } from "react";
import { Loader2, ShoppingCart, CheckCircle, Info, Cpu, Package } from "lucide-react";
import { useTier } from "../hooks/useTier";

interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  image?: string;
  description?: string;
  product_url?: string;
}

export default function AIshoppingAssistant({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [model, setModel] = useState("");
  const [platformUrl, setPlatformUrl] = useState<string>("");
  const { tier } = useTier();

  const searchAI = async (override?: string) => {
    const target = override || query;
    if (!target.trim()) return;

    setLoading(true);
    setReply("");
    setProducts([]);
    setPlatformUrl("");

    try {
      const res = await fetch("/api/ai-shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: target }),
      });

      const data = await res.json();
      setReply(data.reply);
      const incoming = data.products || [];
      setProducts(tier === "premium" ? incoming : incoming.slice(0, 5));
      setModel(data.modelUsed || "Core Intelligence");
      setPlatformUrl(data.platformUrl || "");
    } catch (e) {
      setReply("Connection failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery.length > 2) {
      setQuery(initialQuery);
      searchAI(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="w-full bg-neutral-900/40 border border-white/10 rounded-[3rem] p-6 md:p-12 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center gap-5 mb-4">
          <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(6,182,212,0.4)]">🤖</div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-white">
              SKCS <span className="text-cyan-500">AI Shopping Assistant</span>   {/* 👈 Updated text */}
            </h3>
            <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              <CheckCircle className="w-3 h-3 text-cyan-500" /> Verified Inventory Only
            </div>
          </div>
        </div>

        {/* BRIEF EXPLANATION SECTION */}
        <div className="mb-10 md:pl-20 border-l-2 border-cyan-500/20 ml-7 md:ml-0 pl-6">
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl font-light italic">
            Our AI understands your intent to find the perfect match within the <strong>SKCS Verified Inventory</strong>. 
            It analyzes real-time specs, brands, and availability to ensure every recommendation is accurate and tailored to your specific needs.
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="max-w-4xl mb-12 flex flex-col sm:flex-row gap-4">
          <input 
            className="flex-1 p-5 rounded-2xl bg-black/60 border border-white/10 text-white outline-none focus:border-cyan-500/50 text-lg transition-all" 
            placeholder="Search for Samsung, Dell, Apple..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && searchAI()} 
          />
          <button 
            onClick={() => searchAI()} 
            disabled={loading} 
            className="bg-cyan-500 text-black font-black px-12 py-5 rounded-2xl shadow-xl hover:bg-cyan-400 transition-all flex items-center justify-center min-w-[160px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "ASK AI"}
          </button>
        </div>

        {/* AI ANALYSIS REPORT BOX */}
        {reply && (
          <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-[2rem] p-8 mb-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="absolute top-0 right-0 bg-cyan-500/10 border-l border-b border-cyan-500/20 px-4 py-2 rounded-bl-2xl flex items-center gap-2">
              <Cpu className="w-3 h-3 text-cyan-500" />
              <span className="text-[9px] font-black text-cyan-500 uppercase tracking-tighter">Verified by {model}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-cyan-400" />
              <h2 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">AI Concierge Analysis</h2>
            </div>
            <p className="text-gray-100 text-xl font-medium italic leading-relaxed whitespace-pre-line">{reply}</p>

            {platformUrl && (
              <div className="mt-6">
                <button
                  onClick={() => (window.location.href = platformUrl)}
                  className="bg-cyan-500 text-black font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-cyan-400 transition-all uppercase tracking-widest text-xs active:scale-95"
                >
                  Compare Prices
                </button>
              </div>
            )}
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(tier === "premium" ? products : products.slice(0, 5)).map((p) => (
            <div key={p.id} className="group bg-neutral-950/80 border border-white/5 rounded-[2.5rem] p-7 hover:border-cyan-500/40 transition-all flex flex-col shadow-2xl">
              <div className="relative h-64 bg-neutral-900 rounded-3xl mb-6 overflow-hidden shadow-inner">
                {p.image ? (
                   <img 
                    key={`${p.id}-${p.image}`} // Unique key to force re-render on image update
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-800">
                    <Package className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-5 right-5 bg-black/80 px-4 py-2 rounded-xl text-cyan-400 font-black text-base border border-white/10 shadow-2xl">
                  ${p.price}
                </div>
              </div>

              <div className="px-2 flex flex-col flex-1">
                <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">{p.brand}</span>
                <h3 className="text-white font-bold text-2xl mb-4 line-clamp-2 min-h-[4rem] group-hover:text-cyan-400 transition-colors leading-tight">
                  {p.title}
                </h3>
                <p className="text-neutral-500 text-sm mb-8 line-clamp-2 italic leading-relaxed">
                  "{p.description}"
                </p>
                <div className="mt-auto">
                  <button 
                    onClick={() => window.open(p.product_url, "_blank")} 
                    className="w-full bg-white hover:bg-cyan-500 hover:text-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs shadow-2xl active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tier === "normal" && products.length > 5 && (
          <div className="mt-8 bg-neutral-900 border border-cyan-500/40 text-white rounded-2xl p-4">
            Upgrade to SKCS Premium to see hidden deals and unlimited results.
          </div>
        )}
      </div>
    </div>
  );
}
