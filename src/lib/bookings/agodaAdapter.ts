import { BookingResult } from "./types";
import { buildAgodaLink } from "../affiliateBookings";

export async function searchAgoda(destination: string): Promise<BookingResult[]> {
  return [
    {
      hotelName: `${destination} Skyline Hotel`,
      price: 118,
      rating: 4.4,
      location: destination,
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=800&q=80",
      bookingUrl: buildAgodaLink(destination),
      affiliateUrl: buildAgodaLink(destination),
    },
  ];
}
