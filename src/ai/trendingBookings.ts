import { BookingResult } from "@/lib/bookings/types";

export interface TrendingBooking extends BookingResult {
  trendScore: number;
}

// Placeholder in-memory data; replace with Supabase analytics or cache data.
export async function getTrendingBookings(limit = 20): Promise<TrendingBooking[]> {
  return [
    {
      hotelName: "Cape Town Waterfront Suites",
      location: "Cape Town, South Africa",
      price: 129,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80",
      bookingUrl: "#",
      affiliateUrl: "#",
      trendScore: 75,
    },
  ].slice(0, limit);
}

