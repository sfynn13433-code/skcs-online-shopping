"use client";

import { useState } from "react";
import {
  buildExpediaLink,
  buildBookingLink,
  buildCarRentalLink,
} from "../lib/affiliateBookings";

export default function AIBookingAssistant() {
  const [destination, setDestination] = useState("");
  const [links, setLinks] = useState<{
    hotelExpedia: string;
    hotelBooking: string;
    carRental: string;
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    // Generate affiliate links
    const hotelExpedia = buildExpediaLink(destination);
    const hotelBooking = buildBookingLink(destination);
    const carRental = buildCarRentalLink(destination);

    setLinks({ hotelExpedia, hotelBooking, carRental });
  };

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter destination (e.g., Paris, Cape Town)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-neutral-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition-colors"
          >
            Search Deals
          </button>
        </div>
      </form>

      {links && (
        <div className="space-y-4">
          <p className="text-neutral-300">
            Top deals for <span className="text-cyan-400 font-bold">{destination}</span>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={links.hotelExpedia}
              target="_blank"
              rel="noopener sponsored"
              className="block bg-black border border-white/10 hover:border-cyan-500 rounded-xl p-4 text-center transition"
            >
              <span className="text-3xl block mb-2">🏨</span>
              <span className="font-bold">Hotels on Expedia</span>
              <span className="text-xs text-neutral-500 block mt-1">with your affiliate ID</span>
            </a>
            <a
              href={links.hotelBooking}
              target="_blank"
              rel="noopener sponsored"
              className="block bg-black border border-white/10 hover:border-cyan-500 rounded-xl p-4 text-center transition"
            >
              <span className="text-3xl block mb-2">🏩</span>
              <span className="font-bold">Hotels on Booking</span>
              <span className="text-xs text-neutral-500 block mt-1">with your affiliate ID</span>
            </a>
            <a
              href={links.carRental}
              target="_blank"
              rel="noopener sponsored"
              className="block bg-black border border-white/10 hover:border-cyan-500 rounded-xl p-4 text-center transition"
            >
              <span className="text-3xl block mb-2">🚗</span>
              <span className="font-bold">Car Rentals</span>
              <span className="text-xs text-neutral-500 block mt-1">via Expedia</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}