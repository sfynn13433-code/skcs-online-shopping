'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  ShoppingBag,
  Plane,
  Database,
  LineChart,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Globe,
  Zap,
  ShieldCheck,
  Tag,
} from 'lucide-react';

type Vendor = {
  name: string;
  price: number;
  stock: string;
  link: string;
};

type PlatformProduct = {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  bestPrice: number;
  history: number[];
  vendors: Vendor[];
};

type UniversalSearchResponse = {
  query: string;
  count: number;
  sources: {
    amazon: number;
    mock: number;
  };
  products: PlatformProduct[];
};

export default function SKCSPlatform() {
  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<PlatformProduct | null>(null);

  const [products, setProducts] = useState<PlatformProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-generate Affiliate Link Function (Core Requirement #4)
  const generateAffiliateLink = (baseUrl: string, vendor: string) => {
    const tags: Record<string, string> = {
      Amazon: 'skcs-20',
      AliExpress: 'skcs_ali',
      'Booking.com': 'skcs_travel_1',
      Takealot: 'skcs_za',
    };
    const tag = tags[vendor] || 'skcs_global';
    return `${baseUrl}?tag=${tag}&utm_source=skcs_engine`;
  };

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    const q = searchQuery || 'laptop';

    fetch(`/api/universal-search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data: UniversalSearchResponse) => {
        if (cancelled) return;
        setProducts(Array.isArray(data?.products) ? data.products : []);
      })
      .catch((err) => {
        console.error('Search error:', err);
        if (cancelled) return;
        setProducts([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const filteredProducts = products.filter((p) =>
    activeTab === 'shop' ? p.category === 'Electronics' : p.category === 'Travel'
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* GLOBAL NAVIGATION */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setActiveTab('shop');
                setSelectedProduct(null);
              }}
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-200">
                <Globe size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">SKCS</h1>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest -mt-1">
                  Meta-Shopping Engine
                </p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedProduct(null);
                }}
                className={`flex items-center space-x-2 font-semibold transition-colors ${
                  activeTab === 'shop'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <ShoppingBag size={18} /> <span>Retail & Tech</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('travel');
                  setSelectedProduct(null);
                }}
                className={`flex items-center space-x-2 font-semibold transition-colors ${
                  activeTab === 'travel'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Plane size={18} /> <span>Travel & Hotels</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('pipeline');
                  setSelectedProduct(null);
                }}
                className={`flex items-center space-x-2 font-semibold transition-colors ${
                  activeTab === 'pipeline'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Database size={18} /> <span>Data Pipeline (Admin)</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW: SHOP / TRAVEL OVERVIEW */}
        {(activeTab === 'shop' || activeTab === 'travel') && !selectedProduct && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* AI Shopping Assistant Search Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {activeTab === 'shop'
                  ? 'Find the lowest price across the internet.'
                  : 'Compare top global travel deals.'}
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Our AI engine scans Amazon, AliExpress, Takealot, Booking.com and 50+ other marketplaces in
                real-time to ensure you never overpay.
              </p>

              <div className="max-w-3xl mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Sparkles className="h-6 w-6 text-blue-300" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 rounded-xl border-0 ring-1 ring-inset ring-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-blue-200 focus:ring-2 focus:ring-inset focus:ring-white sm:text-lg transition-all"
                  placeholder={
                    activeTab === 'shop'
                      ? "Try: 'Best laptop under $1200 for video editing'"
                      : "Try: 'Cheapest 5-star hotel in Dubai next week'"
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute inset-y-2 right-2 bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center space-x-2">
                  <span>Search</span>
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeTab === 'shop' ? 'Trending Tech Deals' : 'Top Travel Destinations'}
                </h3>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Live Price Updates
                </span>
              </div>

              {loading && (
                <div className="text-center py-10 text-slate-500">Searching across marketplaces...</div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-10 text-slate-400">No products found. Try another search.</div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group flex flex-col h-full"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Image Area */}
                    <div className="h-48 bg-slate-50 rounded-t-2xl flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent"></div>
                      {product.image}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm flex items-center">
                        <Tag size={12} className="mr-1 text-blue-600" />
                        {product.vendors.length} Vendors
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center space-x-1 mb-2">
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="text-xs text-slate-500 font-medium">({product.reviews})</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 flex-grow group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h4>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-medium mb-1">Best price found:</p>
                        <div className="flex items-end justify-between">
                          <span className="text-3xl font-extrabold text-emerald-600">
                            ${Number(product.bestPrice || 0).toFixed(2)}
                          </span>
                          <span className="text-sm font-bold text-slate-400 line-through">
                            ${Number(product.history?.[0] || product.bestPrice || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PRODUCT DETAIL & PRICE COMPARISON ENGINE */}
        {selectedProduct && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="flex items-center text-slate-500 hover:text-blue-600 mb-6 font-semibold transition-colors"
            >
              <ChevronRight className="rotate-180 mr-1" size={20} /> Back to results
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Product Info Side */}
                <div className="p-8 lg:p-10 lg:border-r border-slate-200 bg-slate-50 flex flex-col justify-center items-center text-center">
                  <div className="text-9xl mb-8 drop-shadow-xl">{selectedProduct.image}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    {selectedProduct.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-slate-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm">
                    <span className="text-yellow-400">★★★★★</span>
                    <span>{selectedProduct.rating} Rating</span>
                    <span>•</span>
                    <span>{selectedProduct.reviews.toLocaleString()} Reviews</span>
                  </div>
                </div>

                {/* Comparison Engine Side */}
                <div className="p-8 lg:p-10 lg:col-span-2">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 flex items-center">
                        <ShieldCheck className="text-emerald-500 mr-2" size={24} />
                        Price Comparison Engine
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">Aggregated and verified in real-time</p>
                    </div>
                  </div>

                  {/* Vendor List */}
                  <div className="space-y-3 mb-10">
                    {[...selectedProduct.vendors]
                      .sort((a, b) => a.price - b.price)
                      .map((vendor, index) => {
                        const isBestPrice = index === 0;
                        const affiliateLink = generateAffiliateLink(vendor.link, vendor.name);
                        const redirectUrl = `/api/redirect?url=${encodeURIComponent(affiliateLink)}`;

                        return (
                          <div
                            key={vendor.name}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                              isBestPrice
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-slate-100 hover:border-blue-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl ${
                                  isBestPrice
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {vendor.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-lg flex items-center">
                                  {vendor.name}
                                  {isBestPrice && (
                                    <span className="ml-2 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                                      Best Deal
                                    </span>
                                  )}
                                </h4>
                                <p
                                  className={`text-sm font-medium ${
                                    vendor.stock === 'Out of Stock' ? 'text-red-500' : 'text-slate-500'
                                  }`}
                                >
                                  {vendor.stock}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-6">
                              <div className="text-right">
                                <p
                                  className={`text-2xl font-extrabold ${
                                    isBestPrice ? 'text-emerald-600' : 'text-slate-900'
                                  }`}
                                >
                                  ${vendor.price.toFixed(2)}
                                </p>
                              </div>
                              <button
                                disabled={vendor.stock === 'Out of Stock'}
                                onClick={() => {
                                  if (vendor.stock === 'Out of Stock') return;
                                  window.location.href = redirectUrl;
                                }}
                                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 shadow-sm ${
                                  vendor.stock === 'Out of Stock'
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : isBestPrice
                                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5'
                                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                              >
                                <span>Go to Store</span>
                                <ArrowRight size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Price History Feature (CamelCamelCamel clone requirement) */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-slate-900 flex items-center">
                        <LineChart className="text-blue-500 mr-2" size={20} />
                        6-Month Price History
                      </h4>
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full flex items-center">
                        <CheckCircle2 size={14} className="mr-1" /> Good time to buy
                      </span>
                    </div>

                    {/* CSS-based visual chart representation */}
                    <div className="h-32 flex items-end justify-between space-x-2 pt-4">
                      {selectedProduct.history.map((price, i) => {
                        const maxPrice = Math.max(...selectedProduct.history);
                        const height = `${(price / maxPrice) * 100}%`;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center group relative">
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded transition-opacity whitespace-nowrap z-10">
                              ${price.toFixed(2)}
                            </div>
                            <div
                              className={`w-full rounded-t-sm transition-all duration-500 ${
                                i === selectedProduct.history.length - 1
                                  ? 'bg-emerald-500'
                                  : 'bg-blue-200 group-hover:bg-blue-300'
                              }`}
                              style={{ height }}
                            ></div>
                            <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
                              {['Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dev note showing the affiliate link generation */}
                  <div className="mt-6 text-xs text-slate-400 font-mono bg-slate-100 p-3 rounded border border-slate-200 flex items-start">
                    <AlertCircle size={14} className="mr-2 mt-0.5 shrink-0" />
                    <p>
                      <strong>System generated affiliate path:</strong>
                      <br />
                      Redirecting user to:{' '}
                      <span className="text-blue-500">
                        {generateAffiliateLink(
                          [...selectedProduct.vendors].sort((a, b) => a.price - b.price)[0].link,
                          [...selectedProduct.vendors].sort((a, b) => a.price - b.price)[0].name
                        )}
                      </span>
                      <br />
                      SKCS earns commission upon purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: DATA PIPELINE (Phase 1 Roadmap Visualization) */}
        {activeTab === 'pipeline' && <PipelineDashboard />}

        {/* CUSTOMER FEEDBACK SECTION */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Customer Feedback</h3>
          <p className="text-slate-500 mb-6">Help us improve SKCS by sharing your experience.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your feedback!");
            }}
            className="space-y-4"
          >
            <textarea
              placeholder="What can we improve? What did you like?"
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// --- SEPARATE COMPONENT FOR THE DATA PIPELINE ADMIN VIEW ---
// This addresses section "12. The Single Biggest Priority Right Now"
function PipelineDashboard() {
  const [ingestedCount, setIngestedCount] = useState(1240500);

  // Simulate real-time data ingestion
  useEffect(() => {
    const interval = setInterval(() => {
      setIngestedCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Data Pipeline Architecture</h2>
        <p className="text-slate-500 text-lg mt-2">
          The engine powering SKCS. Ingesting, normalizing, and indexing products globally.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products Indexed', value: ingestedCount.toLocaleString(), color: 'text-blue-600' },
          { label: 'Active Marketplaces', value: '14', color: 'text-indigo-600' },
          { label: 'Price Updates / Hr', value: '84,500', color: 'text-emerald-600' },
          {
            label: 'System Status',
            value: 'Operational',
            color: 'text-emerald-500',
            isStatus: true,
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
            <div className={`text-3xl font-extrabold flex items-center ${stat.color}`}>
              {stat.isStatus && (
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
              )}
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Flowchart Visualization */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl mt-8">
        <h3 className="text-xl font-bold text-slate-900 mb-10 flex items-center">
          <Zap className="text-yellow-500 mr-2" />
          Real-time Ingestion Flow (Phase 1 Target)
        </h3>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative">
          {/* Step 1: Marketplaces */}
          <div className="w-full lg:w-1/4 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center relative z-10">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-xl">
              🌐
            </div>
            <h4 className="font-bold text-slate-900 mb-2">1. Marketplaces</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {['Amazon', 'eBay', 'AliExpress', 'Booking'].map((m) => (
                <span
                  key={m}
                  className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded"
                >
                  {m} API
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block flex-1 border-t-4 border-dashed border-blue-200 relative">
            <ArrowRight className="absolute -top-3 right-0 text-blue-400" size={24} />
          </div>

          {/* Step 2: Normalization Engine */}
          <div className="w-full lg:w-1/4 bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 text-center relative z-10">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-200">
              <Database size={20} />
            </div>
            <h4 className="font-bold text-blue-900 mb-2">2. Normalization</h4>
            <p className="text-xs text-blue-700 font-medium">
              Merging duplicates, matching SKUs, standardizing currencies to USD/ZAR.
            </p>
          </div>

          <div className="hidden lg:block flex-1 border-t-4 border-dashed border-indigo-200 relative">
            <ArrowRight className="absolute -top-3 right-0 text-indigo-400" size={24} />
          </div>

          {/* Step 3: Elasticsearch */}
          <div className="w-full lg:w-1/4 bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200 text-center relative z-10">
            <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-200">
              <Search size={20} />
            </div>
            <h4 className="font-bold text-indigo-900 mb-2">3. Search Engine</h4>
            <p className="text-xs text-indigo-700 font-medium">
              Elasticsearch/Meilisearch. Powers the lightning-fast frontend UI.
            </p>
          </div>
        </div>

        {/* Simulated Server Logs */}
        <div className="mt-12 bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400 h-48 overflow-hidden relative shadow-inner">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-slate-900 to-transparent z-10"></div>
          <div className="space-y-2 opacity-80 animate-[slideUp_10s_linear_infinite]">
            <p>[SYSTEM] Connected to Amazon Affiliate API endpoint...</p>
            <p className="text-slate-400">[INGEST] Pulling batch 4092: Category Electronics...</p>
            <p>[DEDUPE] Merged ASIN B09XS7JWHH with Takealot ID 89211...</p>
            <p>[INDEX] Successfully indexed 4,120 new documents into Elasticsearch.</p>
            <p className="text-slate-400">[CRON] Updating prices for Travel/Hotels/Dubai...</p>
            <p>[UPDATE] Rixos The Palm price dropped to $1850. Triggering user alerts.</p>
            <p>[SYSTEM] Connected to AliExpress Affiliate API endpoint...</p>
            <p className="text-slate-400">[INGEST] Pulling batch 4093: Category Fashion...</p>
            <p>[INDEX] Successfully indexed 2,800 new documents into Elasticsearch.</p>
            <p>[SYSTEM] Connected to Amazon Affiliate API endpoint...</p>
            <p className="text-slate-400">[INGEST] Pulling batch 4092: Category Electronics...</p>
            <p>[DEDUPE] Merged ASIN B09XS7JWHH with Takealot ID 89211...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
