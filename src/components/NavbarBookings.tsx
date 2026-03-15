"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Full list of booking categories (no icons)
const bookingCategories = [
  "Flights",
  "Hotels",
  "Vacation Rentals",
  "Car Rentals",
  "Airport Transfers",
  "Packages",
  "Cruises",
  "Tours & Activities",
  "Attractions",
  "Transport",
  "Travel Insurance",
  "Travel Deals",
].map((name) => ({
  name,
  href: `/bookings/${name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`,
}));

// Booking partners (display names only, not links)
const partners = ["Expedia", "Booking.com", "Skyscanner", "RentalCars", "Kayak"];

// Guides (with links)
const guides = [
  { name: "Shopping Guides", href: "/guides/shopping" },
  { name: "Product Comparisons", href: "/guides/comparisons" },
  { name: "Deal Strategies", href: "/guides/deals" },
];

export default function NavbarBookings() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => setIsOpen(false), 150);
    setHoverTimer(timer);
  };

  const handleCategoryClick = () => {
    setIsOpen(false);
    if (hoverTimer) clearTimeout(hoverTimer);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="border border-white/10 rounded-2xl bg-neutral-900/40 p-6">
        {/* Heading */}
        <h2 className="text-xl font-black uppercase tracking-wider mb-6 text-center">
          Travel <span className="text-cyan-500">Bookings</span>
        </h2>

        {/* Dropdown container */}
        <div
          className="relative inline-block w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            ref={buttonRef}
            className="w-full flex items-center justify-between gap-2 bg-black border border-white/10 rounded-xl px-6 py-4 text-lg font-bold hover:border-cyan-500 transition"
          >
            <span className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Explore Travel Categories</span>
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={menuRef}
              className="absolute left-0 mt-2 w-full bg-black border border-white/10 rounded-2xl shadow-2xl p-6 z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Categories – spans 2 columns */}
                <div className="lg:col-span-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                    {bookingCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="text-sm hover:text-cyan-400 transition"
                        onClick={handleCategoryClick}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right column – Partners & Guides */}
                <div className="space-y-8">
                  {/* Booking Partners */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-3">
                      Booking Partners
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      {partners.map((partner) => (
                        <li key={partner}>{partner}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Guides */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-3">
                      Guides
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {guides.map((guide) => (
                        <li key={guide.name}>
                          <Link
                            href={guide.href}
                            className="hover:text-cyan-400 transition"
                            onClick={handleCategoryClick}
                          >
                            {guide.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Optional helper text */}
        <p className="text-neutral-500 text-sm mt-4 text-center">
          Hover over the button to explore all travel booking categories
        </p>
      </div>
    </section>
  );
}