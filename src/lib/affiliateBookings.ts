// SKCS Booking Affiliate Link Builder

export type BookingType = "hotel" | "flight" | "car" | "package";

// 🔁 Replace these with your actual affiliate IDs
export const AFFILIATE_IDS = {
  expedia: "YOUR_EXPEDIA_AFFILIATE_ID",      // e.g., "12345"
  booking: "YOUR_BOOKING_AFFILIATE_ID",      // e.g., "67890"
  travelpayouts: "YOUR_TRAVELPAYOUTS_ID",    // e.g., "abcde"
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