"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import AIshoppingAssistant from "../components/AIshoppingAssistant";
import AIQuickSearch from "../components/AIQuickSearch";
import Footer from "../components/Footer";
import NavbarBookings from "../components/NavbarBookings";          // new bookings navbar
import AIBookingAssistant from "../components/AIBookingAssistant";  // to be built later
import dynamic from "next/dynamic";

const DiscoveryFeed = dynamic(() => import("../components/DiscoveryFeed"), { ssr: false });
import PremiumBanner from "../components/PremiumBanner";
import GlobalPriceGuarantee from "../components/GlobalPriceGuarantee";
import LiveDealsFeed from "../components/LiveDealsFeed";
import AutoDealHunter from "../components/AutoDealHunter";
import AIPriceInsights from "../components/AIPriceInsights";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SKCS Online Shopping",
  "description": "Premium Global Marketplace with AI-powered shopping assistant",
  "url": "https://skcs-online-shopping.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://skcs-online-shopping.vercel.app/products?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "Organization",
    "name": "SKCS Online Shopping",
    "url": "https://skcs-online-shopping.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://skcs-online-shopping.vercel.app/logo.png",
      "width": 512,
      "height": 512,
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  }
};

export default function HomeClient() {
  return (
    <>
      <Head>
        <meta name="gridinsoft-key" content="qsnmquihxbg25xauq0gk9zzu94fb5gsc449b9rjn8iq0bokoz4rcttu97q12f3vr" />

        <link rel="preload" as="image" href="/images/hero-image.jpg" />
        
        {/* SEO Meta Tags */}
        <title>SKCS Online Shopping - Premium Global Marketplace with AI</title>
        <meta name="description" content="Compare products across Amazon, AliExpress, eBay, Walmart, and Takealot with AI-powered shopping assistant. Find the best deals instantly with SKCS Global Marketplace." />
        <meta name="keywords" content="online shopping, AI shopping assistant, price comparison, Amazon deals, AliExpress, eBay, Walmart, Takealot, global marketplace, best prices, product comparison, travel booking, hotel deals, flight deals" />
        <meta name="author" content="SKCS Online Shopping" />
        <meta name="creator" content="SKCS Online Shopping" />
        <meta name="publisher" content="SKCS Online Shopping" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://skcs-online-shopping.vercel.app" />
        <meta property="og:title" content="SKCS Online Shopping - Premium Global Marketplace with AI" />
        <meta property="og:description" content="Compare products across Amazon, AliExpress, eBay, Walmart, and Takealot with AI-powered shopping assistant. Find the best deals instantly." />
        <meta property="og:site_name" content="SKCS Online Shopping" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SKCS Online Shopping - AI-Powered Global Marketplace" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SKCS Online Shopping - Premium Global Marketplace with AI" />
        <meta name="twitter:description" content="Compare products across Amazon, AliExpress, eBay, Walmart, and Takealot with AI-powered shopping assistant. Find the best deals instantly." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:creator" content="@skcs_shopping" />
        
        {/* Robots Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://skcs-online-shopping.vercel.app" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="bg-black min-h-screen text-white">
        {/* HERO */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-image.jpg"
              alt="SKCS Online Shopping"
              fill
              className="object-contain opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />
          </div>
          
          <div className="relative z-20 text-center px-6 max-w-6xl">
            <div className="mb-8">
              <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.85] drop-shadow-2xl">
                SKCS <span className="text-cyan-500">ONLINE</span>
              </h1>
              <p className="text-2xl md:text-4xl text-white/95 mb-8 max-w-3xl mx-auto font-light tracking-tight italic drop-shadow-lg">
                Premium Global Marketplace with AI-Powered Shopping
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/products"
                className="group relative overflow-hidden px-12 py-6 bg-cyan-500 text-black font-black text-lg rounded-2xl hover:bg-cyan-400 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105"
              >
                <span className="relative z-10">Start Shopping</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link
                href="#ai-assistant-section"
                className="group px-12 py-6 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-white/20 transform hover:scale-105"
              >
                Try AI Assistant
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>Amazon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>AliExpress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>eBay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>Walmart</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>Takealot</span>
              </div>
            </div>
          </div>
        </section>

        <GlobalPriceGuarantee />

        <LiveDealsFeed />

        <AutoDealHunter />

        <AIPriceInsights />

        {/* SKCS COMMAND CENTER */}
        <section className="py-16 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">
                🧠 SKCS <span className="text-cyan-500">Command Center</span>
              </h2>
              <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
                Global price intelligence and market signals across products and travel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">📟</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Market Signal</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Electronics Price Trend</h3>
                  <p className="text-neutral-400 text-sm mb-6">↓ Prices trending cheaper this week</p>
                  <div className="mt-auto text-xs text-neutral-500">Based on global marketplace comparisons</div>
                </div>
              </div>

              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">🛰️</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Market Signal</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Travel Price Signals</h3>
                  <p className="text-neutral-400 text-sm mb-6">↑ Flight and hotel prices rising</p>
                  <div className="mt-auto text-xs text-neutral-500">Across Expedia • Booking.com • Agoda</div>
                </div>
              </div>

              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">🧩</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Market Signal</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Most Compared Products</h3>
                  <div className="text-neutral-400 text-sm mb-6 space-y-1">
                    <div>Gaming Laptop Under $1500</div>
                    <div>iPhone vs Samsung Flagship</div>
                    <div>Best 4K TVs 2026</div>
                  </div>
                  <div className="mt-auto text-xs text-neutral-500">Trending across global searches today</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEAL PASSPORT */}
        <section className="py-16 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">
                🌍 <span className="text-cyan-500">Deal Passport</span>
              </h2>
              <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
                Track global deals discovered across different regions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all">
                <div className="p-6">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">USA Deals Found</div>
                  <div className="text-3xl font-black text-white">3</div>
                </div>
              </div>
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all">
                <div className="p-6">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Japan Deals Found</div>
                  <div className="text-3xl font-black text-white">2</div>
                </div>
              </div>
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all">
                <div className="p-6">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Europe Deals Found</div>
                  <div className="text-3xl font-black text-white">4</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKCS DEAL RADAR */}
        <section className="py-16 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">
                🚨 SKCS <span className="text-cyan-500">Deal Radar</span>
              </h2>
              <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
                Live global deal signals and trending price comparisons across marketplaces.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">📉</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Price Drop Detected</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Sony WH-1000XM5 Headphones</h3>
                  <p className="text-neutral-400 text-sm mb-6">Amazon $399 → Walmart $349</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Amazon • Walmart</span>
                    <span className="text-xs font-bold text-cyan-400">Save $50</span>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">📈</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Trending Search</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Gaming Laptop Under $1500</h3>
                  <p className="text-neutral-400 text-sm mb-6">1,842 users comparing prices</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Amazon • eBay • Walmart</span>
                    <span className="text-xs font-bold text-cyan-400">Hot</span>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">✈️</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Hot Travel Deal</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Cape Town → Paris Flights</h3>
                  <p className="text-neutral-400 text-sm mb-6">Flights from $489</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Expedia • Booking.com</span>
                    <span className="text-xs font-bold text-cyan-400">Deal</span>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden transition-all flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">⚖️</div>
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Popular Comparison</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">iPhone vs Samsung Flagship</h3>
                  <p className="text-neutral-400 text-sm mb-6">Price comparison trending today</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Across 5 marketplaces</span>
                    <span className="text-xs font-bold text-cyan-400">Trending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
          <div className="mt-12">
            <AIshoppingAssistant />
          </div>
        </section>

        {/* GLOBAL CTA STRIPS */}
        <section className="bg-gradient-to-r from-cyan-900/60 via-blue-900/50 to-cyan-900/60 border-y border-white/20 py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-black/80 to-black/60 border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3 font-semibold">Meta-marketplace</p>
                <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">SKCS Global Product Marketplace</h3>
                <p className="text-neutral-300 mb-8 text-lg leading-relaxed">
                  Compare Amazon, eBay, Walmart, AliExpress, and Takealot in one AI-powered interface. Find the best prices instantly.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black text-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-xl hover:shadow-cyan-500/50 transform hover:scale-105"
                >
                  <span>Explore Products</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-black/80 to-black/60 border border-white/20 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">Travel & booking</p>
                <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">SKCS Travel & Booking Marketplace</h3>
                <p className="text-neutral-300 mb-8 text-lg leading-relaxed">
                  Search hotels, flights, and cars across Expedia, Booking.com, Hotels.com, Agoda, and RentalCars.
                </p>
                <Link
                  href="/bookings"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300 shadow-xl hover:shadow-orange-500/50 transform hover:scale-105"
                >
                  <span>Search Travel Deals</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <DiscoveryFeed />

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

        <PremiumBanner />

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

        {/* AMAZON TRENDING FINDS */}
        <section className="py-16 bg-neutral-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black tracking-tight uppercase">
                🔥 Trending <span className="text-orange-400">Global Deals</span>
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
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$1,299.99</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=Samsung+Galaxy+S26+Ultra&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🧹</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Home Essentials</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Shark Pet Cordless Vacuum Cleaner with LED Headlights</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$149.00</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=Shark+Pet+Cordless+Vacuum&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🥽</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Gaming Accessories</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Battery Head Strap Compatible with Meta Quest 3S/3/2</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$35.69</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=Battery+Head+Strap+Meta+Quest&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 4 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🧘‍♀️</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Fashion & Fitness</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">ABOCIW Womens 2 Piece Workout Set Seamless Sports Bra & Leggings</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$40.99</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=ABOCIW+Womens+2+Piece+Workout+Set&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 5 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🏺</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Home Decor</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Ceramic Vase Set of 3, Rustic Neutral Farmhouse Decor</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$29.99</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=Ceramic+Vase+Set+of+3&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 6 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🖥️</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Electronics</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">LG 32-inch Ultrafine 4K UHD IPS Computer Monitor</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$399.99</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=LG+32-inch+Ultrafine+4K+Monitor&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 7 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">✨</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Beauty</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">DAE Fairy Duster Dry Shampoo Powder - Natural Ingredients</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$30.00</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=DAE+Fairy+Duster+Dry+Shampoo&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>

              {/* Product 8 */}
              <div className="bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col">
                <div className="h-40 bg-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">🐇</div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Seasonal Decor</span>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">Easter Decorations - 3 Ft Boxwood Bunny Topiary</h3>
                  <div className="mb-6 mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">$66.99</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Available on Amazon</div>
                  </div>
                  <a href="https://www.amazon.com/s?k=Easter+Decorations+Boxwood+Bunny&tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="w-full block text-center bg-white hover:bg-orange-500 hover:text-white text-black text-sm font-bold py-3 rounded-xl transition-all shadow-lg">
                    View Deal
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="https://www.amazon.com/bestsellers?tag=skcsshopping2-20" target="_blank" rel="noopener sponsored" className="inline-block border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all">
                Explore More Deals
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
