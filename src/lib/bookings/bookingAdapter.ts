import { buildBookingLink } from "../affiliateBookings";
import { BookingResult } from "./types";

export async function searchBooking(destination: string): Promise<BookingResult[]> {
  return [
    {
      hotelName: `${destination} Waterfront Suites`,
      price: 132,
      rating: 4.6,
      location: destination,
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=800&q=80",
      bookingUrl: buildBookingLink(destination),
      affiliateUrl: buildBookingLink(destination),
    },
  ];
}

