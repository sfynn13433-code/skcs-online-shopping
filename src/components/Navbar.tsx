// components/Navbar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useTier } from '../hooks/useTier';
import { useLocale } from './LocaleProvider';
import { Button } from './ui/Button';
import { NavLink } from './ui/NavLink';
import { createPortal } from 'react-dom';

// Full list of categories
const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Beauty & Personal Care', slug: 'beauty-personal-care' },
  { name: 'Clothing, Shoes & Jewelry', slug: 'clothing-shoes-jewelry' },
  { name: 'Health & Household', slug: 'health-household' },
  { name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { name: 'Cell Phones & Accessories', slug: 'cell-phones-accessories' },
  { name: 'Toys & Games', slug: 'toys-games' },
  { name: 'Grocery & Gourmet Food', slug: 'grocery-gourmet-food' },
  { name: 'Baby Products', slug: 'baby-products' },
  { name: 'Pet Supplies', slug: 'pet-supplies' },
  { name: 'Office Products', slug: 'office-products' },
  { name: 'Tools & Home Improvement', slug: 'tools-home-improvement' },
  { name: 'Automotive', slug: 'automotive' },
  { name: 'Computers', slug: 'computers' },
  { name: 'Appliances', slug: 'appliances' },
  { name: 'Patio, Lawn & Garden', slug: 'patio-lawn-garden' },
  { name: 'Arts, Crafts & Sewing', slug: 'arts-crafts-sewing' },
  { name: 'Musical Instruments', slug: 'musical-instruments' },
  { name: 'Luggage & Travel Gear', slug: 'luggage-travel-gear' },
  { name: 'Industrial & Scientific', slug: 'industrial-scientific' },
  { name: 'Collectibles & Fine Art', slug: 'collectibles-fine-art' },
  { name: 'Handmade', slug: 'handmade' },
  { name: 'Software', slug: 'software' },
  { name: 'Books', slug: 'books' },
  { name: 'Movies & TV', slug: 'movies-tv' },
  { name: 'CDs & Vinyl', slug: 'cds-vinyl' },
  { name: 'Gift Cards', slug: 'gift-cards' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { profile, loading, signOut } = useProfile();
  const { tier } = useTier();
  const { language, setLanguage, languageOptions } = useLocale();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const fullName = (profile?.first_name || profile?.last_name)
    ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim()
    : null;

  // Handle mouse enter on button or menu
  const handleMouseEnter = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setIsMenuOpen(true);
  };

  // Handle mouse leave on button or menu (with delay)
  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsMenuOpen(false);
    }, 150); // small delay to allow moving between elements
    setHoverTimer(timer);
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [hoverTimer]);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!isLanguageOpen) return;
      const target = event.target as Node | null;
      if (target && languageRef.current && !languageRef.current.contains(target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isLanguageOpen]);

  // Close menu when a category link is clicked
  const handleCategoryClick = () => {
    setIsMenuOpen(false);
    if (hoverTimer) clearTimeout(hoverTimer);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 h-22 flex items-center gap-8">
        {/* Browse Button with hover handlers */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            ref={buttonRef}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition"
          >
            <Menu size={20} />
            Browse
          </button>
        </div>

        {/* Mega Menu - rendered via portal */}
        {isMenuOpen &&
          createPortal(
            <div
              ref={menuRef}
              className="mega-menu fixed left-0 right-0 top-[88px] bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50"
              style={{ maxHeight: 'calc(100vh - 88px)', overflowY: 'auto' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-[1600px] mx-auto px-6 py-10">
                {/* Main grid: Categories (2/3) + Stores & Guides (1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Categories - spans 2 columns */}
                  <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-6">
                      Categories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 text-sm">
                      {categories.map((cat) => (
                        <NavLink
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="block py-1 hover:text-cyan-400 transition"
                          onClick={handleCategoryClick}
                        >
                          {cat.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  {/* Right column - Stores & Guides */}
                  <div className="space-y-10">
                    {/* Stores */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                        Stores
                      </h3>
                      <ul className="space-y-3 text-sm text-neutral-400">
                        <li>Amazon</li>
                        <li>AliExpress</li>
                        <li>Fiverr</li>
                        <li>eBay</li>
                        <li>Takealot</li>
                      </ul>
                    </div>

                    {/* Guides */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                        Guides
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <NavLink href="/blog" onClick={handleCategoryClick}>
                            Shopping Guides
                          </NavLink>
                        </li>
                        <li className="text-neutral-500">Product Comparisons</li>
                        <li className="text-neutral-500">Deal Strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/skcs-logo.png"
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
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/#ai-assistant-section"
            scroll={false}
            className="text-neutral-300 hover:text-cyan-400 transition uppercase font-bold"
          >
            SKCS AI SHOPPING ASSISTANT
          </Link>
          <Link href="/products" className="text-neutral-300 hover:text-cyan-400 transition font-semibold">
            Products
          </Link>
          <Link href="/bookings" className="text-neutral-300 hover:text-cyan-400 transition font-semibold">
            Bookings
          </Link>
          <Link href="/pricing" className="text-neutral-300 hover:text-cyan-400 transition font-semibold">
            Pricing
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-6 shrink-0 ml-auto">
          <div className="relative" ref={languageRef}>
            <button
              type="button"
              onClick={() => setIsLanguageOpen((v) => !v)}
              className="flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-white/15 text-neutral-200 hover:bg-white/10 transition"
              aria-haspopup="menu"
              aria-expanded={isLanguageOpen}
            >
              <span aria-hidden>🌍</span>
              <span className="font-bold uppercase">{language.toUpperCase()}</span>
              <span className="text-neutral-400" aria-hidden>▼</span>
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="py-1">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLanguage(opt.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${
                        opt.code === language ? 'text-cyan-400 font-bold' : 'text-neutral-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span className="text-xs px-3 py-1 rounded-full border border-cyan-500/40 text-cyan-300">
            {tier === 'premium' ? '⭐ Premium' : 'Free'}
          </span>
          {loading ? (
            <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          ) : profile ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-300">Hello {fullName}</span>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/watchlist">My List</Link>
              </Button>
              <Button variant="link" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button variant="primary" size="lg" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
