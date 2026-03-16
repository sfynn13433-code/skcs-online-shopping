export const revalidate = 600;

export const metadata = {
  title: "SKCS Travel & Booking Marketplace",
  description: "Find hotels, flights, and cars across global partners with affiliate-ready links.",
};

import BookingsClient from "./BookingsClient";

export default function BookingPage() {
  return <BookingsClient />;
}
