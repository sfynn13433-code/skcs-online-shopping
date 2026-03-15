// components/BookingsDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { NavLink } from './ui/NavLink';
import { createPortal } from 'react-dom';

// Full list of booking categories (with icons)
const bookingCategories = [
  { name: 'Flights', icon: '✈️', href: '/bookings/flights' },
  { name: 'Hotels', icon: '🏨', href: '/bookings/hotels' },
  { name: 'Vacation Rentals', icon: '🏡', href: '/bookings/rentals' },
  { name: 'Car Rentals', icon: '🚗', href: '/bookings/car-hire' },
  { name: 'Airport Transfers', icon: '🚕', href: '/bookings/airport-transfers' },
  { name: 'Packages', icon: '🎁', href: '/bookings/packages' },
  { name: 'Cruises', icon: '🛳', href: '/bookings/cruises' },
  { name: 'Tours & Activities', icon: '🎟', href: '/bookings/tours' },
  { name: 'Attractions', icon: '🏰', href: '/bookings/attractions' },
  { name: 'Transport', icon: '🚆', href: '/bookings/transport' },
  { name: 'Travel Insurance', icon: '🛡', href: '/bookings/insurance' },
  { name: 'Travel Deals', icon: '🔥', href: '/bookings/deals' },
];

export default function BookingsDropdown() {
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

  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [hoverTimer]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition"
      >
        <Briefcase size={20} />
        Bookings
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed left-0 right-0 top-[88px] bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50"
            style={{ maxHeight: 'calc(100vh - 88px)', overflowY: 'auto' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1600px] mx-auto px-6 py-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Categories - 2 columns */}
                <div className="lg:col-span-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-6">
                    Travel Categories
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
                    {bookingCategories.map((cat) => (
                      <NavLink
                        key={cat.name}
                        href={cat.href}
                        className="flex items-center gap-2 py-1 hover:text-cyan-400 transition"
                        onClick={handleCategoryClick}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm">{cat.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Right column - extra info (optional) */}
                <div className="space-y-10">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                      Travel Partners
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-400">
                      <li>Expedia</li>
                      <li>Booking.com</li>
                      <li>Skyscanner</li>
                      <li>RentalCars</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
                      Resources
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li>
                        <NavLink href="/travel-guides" onClick={handleCategoryClick}>
                          Travel Guides
                        </NavLink>
                      </li>
                      <li className="text-neutral-500">Visa Information</li>
                      <li className="text-neutral-500">Travel Tips</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}