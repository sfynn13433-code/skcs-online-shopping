// SKCS Booking Affiliate Link Builder

export type BookingType = "hotel" | "flight" | "car" | "package";

// 🔁 Replace these with your actual affiliate IDs
export const AFFILIATE_IDS = {
  expedia: process.env.EXPEDIA_AFFILIATE_ID || "YOUR_EXPEDIA_AFFILIATE_ID",
  booking: process.env.BOOKING_AFFILIATE_ID || "YOUR_BOOKING_AFFILIATE_ID",
  travelpayouts: process.env.TRAVELPAYOUTS_ID || "YOUR_TRAVELPAYOUTS_ID",
  agoda: process.env.AGODA_AFFILIATE_ID || "YOUR_AGODA_AFFILIATE_ID",
  hotels: process.env.HOTELS_AFFILIATE_ID || "YOUR_HOTELS_AFFILIATE_ID",
};

/**
 * Build an Expedia hotel search link
 */
export function buildExpediaLink(
  destination: string,
  checkin?: string,
  checkout?: string
) {
  const base = "https://www.expedia.com/Hotel-Search";
  const params = new URLSearchParams({
    destination,
    startDate: checkin || "",
    endDate: checkout || "",
    affcid: AFFILIATE_IDS.expedia,
  });
  return `${base}?${params.toString()}`;
}

/**
 * Build a Booking.com search link
 */
export function buildBookingLink(destination: string) {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    destination
  )}&aid=${AFFILIATE_IDS.booking}`;
}

export function buildAgodaLink(destination: string) {
  return `https://www.agoda.com/search?city=${encodeURIComponent(destination)}&cid=${AFFILIATE_IDS.agoda}`;
}

export function buildHotelsLink(destination: string) {
  return `https://www.hotels.com/search.do?destination=${encodeURIComponent(destination)}&affcid=${AFFILIATE_IDS.hotels}`;
}

/**
 * Build a TravelPayouts flight link (for flights)
 */
export function buildFlightLink(origin: string, destination: string) {
  return `https://tp.media/r?marker=${AFFILIATE_IDS.travelpayouts}&origin=${origin}&destination=${destination}`;
}

/**
 * Build a generic rental car link (using Expedia for now)
 */
export function buildCarRentalLink(destination: string, pickup?: string, dropoff?: string) {
  const base = "https://www.expedia.com/Car-Rentals";
  const params = new URLSearchParams({
    destination,
    fromDate: pickup || "",
    toDate: dropoff || "",
    affcid: AFFILIATE_IDS.expedia,
  });
  return `${base}?${params.toString()}`;
}
