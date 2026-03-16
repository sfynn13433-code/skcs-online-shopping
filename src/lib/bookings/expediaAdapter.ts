import { buildExpediaLink } from "../affiliateBookings";
import { BookingResult } from "./types";

export async function searchExpedia(destination: string): Promise<BookingResult[]> {
  return [
    {
      hotelName: `${destination} Central Hotel`,
      price: 149,
      rating: 4.5,
      location: destination,
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=800&q=80",
      bookingUrl: buildExpediaLink(destination),
      affiliateUrl: buildExpediaLink(destination),
    },
  ];
}

