export interface BookingResult {
  hotelName: string;
  price: number;
  rating?: number | null;
  location: string;
  image?: string | null;
  bookingUrl: string;
  affiliateUrl: string;
}

