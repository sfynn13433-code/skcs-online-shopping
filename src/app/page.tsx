"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { supabase } from "../lib/supabase";
import AIshoppingAssistant from "../components/AIshoppingAssistant";
import AIQuickSearch from "../components/AIQuickSearch";
import Footer from "../components/Footer";
import FeaturedStores from "../components/FeaturedStores";
import NavbarBookings from "../components/NavbarBookings";          // new bookings navbar
import AIBookingAssistant from "../components/AIBookingAssistant";  // to be built later

interface UserProfile {
  id: string;
  full_name: string;
  tier?: string;
}

export default function Home() {
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

  return (
    <>
      <Head>
        <meta name="gridinsoft-key" content="qsnmquihxbg25xauq0gk9zzu94fb5gsc449b9rjn8iq0bokoz4rcttu97q12f3vr" />
      </Head>

      <main className="bg-black min-h-screen text-white">
        {/* HERO */}
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
          </div>
        </section>

        <FeaturedStores />

        {/* AI SHOPPING ASSISTANT (scroll target from navbar) */}
        <section
          id="ai-assistant-section"
          className="max-w-7xl mx-auto px-6 pt-20 pb-10 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">
              SKCS <span className="text-cyan-500">AI Shopping Assistant</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-4">
              Powered by advanced AI models including <span className="text-white">Groq</span>,
              <span className="text-white"> Gemini</span> and <span className="text-white">DeepSeek</span>.
              Compare products across global marketplaces instantly and discover the best deals.
            </p>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto">
              Ask the assistant to compare prices, analyse value, or find the best
              products from Amazon, AliExpress, Takealot and other international stores.
            </p>
          </div>

          <AIQuickSearch />
          <AIshoppingAssistant />
        </section>

        {/* NEW BOOKINGS NAVBAR */}
        <NavbarBookings />

        {/* AI BOOKING ASSISTANT (new section) */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">
              SKCS <span className="text-cyan-500">AI Booking Assistant</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-4">
              Find the best hotels, flights, car hire, cruises and travel deals
              worldwide. Our AI scans global booking platforms to help you
              compare the best options instantly.
            </p>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto">
              Ask for destinations, travel dates or experiences and let the AI
              generate the best booking options for your trip.
            </p>
          </div>

          <AIBookingAssistant />
        </section>

        {/* ALIEXPRESS DEALS */}
        <section className="py-16 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black tracking-tight uppercase mb-4">
              AliExpress <span className="text-cyan-500">Deals</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
              Hand‑picked offers with your exclusive tracking ID. Click, shop, and save!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {/* CHANGED: now use neutral-800 with cyan hover to match region buttons */}
              <a 
                href="https://s.click.aliexpress.com/e/_c3ElbFoT" 
                target="_blank" 
                rel="noopener sponsored" 
                className="bg-neutral-800 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-cyan-500/30"
              >
                Higher Commission
              </a>
              <a 
                href="https://s.click.aliexpress.com/e/_c39QWNkL" 
                target="_blank" 
                rel="noopener sponsored" 
                className="bg-neutral-800 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-cyan-500/30"
              >
                Hot Deals
              </a>
              <a 
                href="https://s.click.aliexpress.com/e/_c4PyOiIx" 
                target="_blank" 
                rel="noopener sponsored" 
                className="bg-neutral-800 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-cyan-500/30"
              >
                Featured Products
              </a>
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

        {/* SOVRN NETWORK DEALS */}
        <section className="py-16 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black tracking-tight uppercase mb-4">
              Sovrn <span className="text-cyan-500">Network Deals</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
              Hand‑picked premium offers with your exclusive tracking ID. Click, shop, and save!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-transparent">Top Sellers</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-transparent">Exclusive Offers</a>
              <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-transparent">Tech & Electronics</a>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center justify-center gap-2">
                <span className="text-3xl">🛒</span> Shop Top Categories
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Home & Furniture</a>
                <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Toys & Games</a>
                <a href="https://sovrn.co/19jthxc" target="_blank" rel="noopener sponsored" className="bg-neutral-800 hover:bg-cyan-600 border border-cyan-500/30 text-white px-5 py-3 rounded-full text-sm font-medium transition-all">Fashion & Clothing</a>
              </div>
            </div>
          </div>
        </section>

        {/* AMAZON TRENDING FINDS */}
        <section className="py-16 bg-neutral-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black tracking-tight uppercase">
                Amazon <span className="text-orange-400">Trending Finds</span>
              </h2>
              <div className="h-[1px] flex-grow bg-white/10 ml-8 hidden md:block"></div>
            </div>

            {/* Product Grid - 8 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product 1 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">📱</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Electronics</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Samsung Galaxy S26 Ultra, Unlocked Android Smartphone 512GB</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$1,299.99</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=Samsung+Galaxy+S26+Ultra&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🧹</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Home Essentials</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Shark Pet Cordless Vacuum Cleaner with LED Headlights</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$149.00</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=Shark+Pet+Cordless+Vacuum&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🥽</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Gaming Accessories</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Battery Head Strap Compatible with Meta Quest 3S/3/2</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$35.69</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=Battery+Head+Strap+Meta+Quest&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 4 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🧘‍♀️</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Fashion & Fitness</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">ABOCIW Womens 2 Piece Workout Set Seamless Sports Bra & Leggings</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$40.99</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=ABOCIW+Womens+2+Piece+Workout+Set&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 5 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🏺</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Home Decor</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Ceramic Vase Set of 3, Rustic Neutral Farmhouse Decor</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$29.99</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=Ceramic+Vase+Set+of+3&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 6 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🖥️</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Electronics</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">LG 32-inch Ultrafine 4K UHD IPS Computer Monitor</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$399.99</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=LG+32-inch+Ultrafine+4K+Monitor&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 7 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">✨</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Beauty</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">DAE Fairy Duster Dry Shampoo Powder - Natural Ingredients</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$30.00</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=DAE+Fairy+Duster+Dry+Shampoo&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>

              {/* Product 8 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🐇</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Seasonal Decor</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Easter Decorations - 3 Ft Boxwood Bunny Topiary</h3>
                  <div className="flex items-baseline gap-2 mb-6 mt-auto">
                    <span className="text-xl font-black text-white">$66.99</span>
                  </div>
                  <a href="https://www.amazon.com/s?k=Easter+Decorations+Boxwood+Bunny&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    Shop on Amazon
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="https://www.amazon.com/bestsellers?tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="inline-block border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all">
                Shop All Amazon Deals
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}