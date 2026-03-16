import { buildCarRentalLink } from "../affiliateBookings";
import { BookingResult } from "./types";

export async function searchRentalCars(destination: string): Promise<BookingResult[]> {
  return [
    {
      hotelName: `${destination} Premium SUV Rentals`,
      price: 55,
      rating: 4.2,
      location: destination,
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
      bookingUrl: buildCarRentalLink(destination),
      affiliateUrl: buildCarRentalLink(destination),
    },
  ];
}

