"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Hotel, Users, Plane, Search } from "lucide-react";
import { buildBookingLink, buildExpediaLink, buildCarRentalLink } from "@/lib/affiliateBookings";

export interface BookingResult {
  id: string;
  hotel: string;
  location: string;
  pricePerNight: number;
  rating: number;
  thumbnail: string;
  partner: "expedia" | "booking" | "car";
  affiliateUrl: string;
}

const MOCK_RESULTS: BookingResult[] = [
  {
    id: "ct-hotel-1",
    hotel: "V&A Waterfront Suites",
    location: "Cape Town, South Africa",
    pricePerNight: 129,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80",
    partner: "booking",
    affiliateUrl: buildBookingLink("Cape Town"),
  },
  {
    id: "ct-hotel-2",
    hotel: "Table Mountain View Hotel",
    location: "Cape Town, South Africa",
    pricePerNight: 165,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80",
    partner: "expedia",
    affiliateUrl: buildExpediaLink("Cape Town"),
  },
  {
    id: "ct-car-1",
    hotel: "Premium SUV Rentals",
    location: "Cape Town International",
    pricePerNight: 58,
    rating: 4.3,
    thumbnail: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    partner: "car",
    affiliateUrl: buildCarRentalLink("Cape Town"),
  },
];

function BookingsClientInner() {
  const params = useSearchParams();
  const [destination, setDestination] = useState("Cape Town");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  useEffect(() => {
    const dest = params.get("destination");
    const ci = params.get("checkIn");
    const co = params.get("checkOut");
    const g = params.get("guests");
    const r = params.get("rooms");
    if (dest) setDestination(dest);
    if (ci) setCheckIn(ci);
    if (co) setCheckOut(co);
    if (g) setGuests(Number(g));
    if (r) setRooms(Number(r));
  }, [params]);

  const results = useMemo(() => {
    if (!destination) return [];
    const mapped = MOCK_RESULTS.map((r) => ({
      ...r,
      affiliateUrl:
        r.partner === "booking"
          ? buildBookingLink(destination)
          : r.partner === "expedia"
          ? buildExpediaLink(destination, checkIn, checkOut)
          : buildCarRentalLink(destination, checkIn, checkOut),
    }));
    return mapped;
  }, [destination, checkIn, checkOut]);

  return (
    <main className="bg-black min-h-screen text-white pb-20">
      <section className="max-w-7xl mx-auto px-6 pt-14">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 mb-3">Booking marketplace</p>
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Bookings</h1>
          <Plane className="w-8 h-8 text-cyan-400" />
        </div>
        <p className="text-neutral-400 max-w-2xl mb-8">
          Search hotels, flights, and cars across Expedia, Booking.com, Hotels.com, Agoda, and RentalCars. All results
          route through your affiliate IDs for attribution.
        </p>

        {/* Search form */}
        <div className="bg-neutral-900/70 border border-white/10 rounded-3xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-1 lg:col-span-2">
              <label className="text-xs uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-2 mb-2">
                <Search className="w-4 h-4" /> Destination
              </label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" /> Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" /> Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" /> Guests
                </label>
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs uppercase tracking-[0.25em] text-neutral-500 flex items-center gap-2 mb-2">
                  <Hotel className="w-4 h-4" /> Rooms
                </label>
                <input
                  type="number"
                  min={1}
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            Results are affiliate-ready. Click "Book now" to redirect to partner with tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-neutral-900/70 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div
                className="h-48 bg-neutral-800"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35)), url(${result.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="p-5 flex flex-col gap-2 flex-1">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                  {result.partner === "car" ? "Car rental" : "Hotel"}
                </p>
                <h3 className="text-xl font-bold leading-tight">{result.hotel}</h3>
                <p className="text-neutral-400 text-sm">{result.location}</p>
                <p className="text-lg font-black text-cyan-400">${result.pricePerNight} / night</p>
                <p className="text-sm text-yellow-400 font-semibold">{result.rating} rating</p>
                <a
                  href={result.affiliateUrl}
                  target="_blank"
                  rel="noopener sponsored"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-xl transition hover:bg-cyan-500 hover:text-white"
                >
                  Book now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function BookingsClient() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-neutral-400">Loading search...</div>}>
      <BookingsClientInner />
    </Suspense>
  );
}
