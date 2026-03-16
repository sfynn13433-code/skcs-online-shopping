import { BookingResult } from "./types";
import { buildHotelsLink } from "../affiliateBookings";

export async function searchHotels(destination: string): Promise<BookingResult[]> {
  return [
    {
      hotelName: `${destination} Grand`,
      price: 140,
      rating: 4.3,
      location: destination,
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=800&q=80",
      bookingUrl: buildHotelsLink(destination),
      affiliateUrl: buildHotelsLink(destination),
    },
  ];
}
