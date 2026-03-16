export type SearchKind = "product" | "booking";

export interface ProductSearchParams {
  kind: "product";
  keywords: string[];
  brand?: string;
  maxPrice?: number;
  priceLimit?: number;
  rating?: number;
  shippingLocation?: string;
}

export interface BookingSearchParams {
  kind: "booking";
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  pricePreference?: "budget" | "mid" | "luxury";
  priceLimit?: number;
}

export type ParsedQuery = ProductSearchParams | BookingSearchParams;

const TRAVEL_KEYWORDS = [
  "hotel",
  "hotels",
  "flight",
  "flights",
  "stay",
  "book",
  "booking",
  "room",
  "rooms",
  "guests",
  "car rental",
  "rental car",
  "car hire",
];

const PRICE_WORDS: Record<string, "budget" | "mid" | "luxury"> = {
  cheap: "budget",
  budget: "budget",
  affordable: "budget",
  "under": "budget",
  mid: "mid",
  "mid-range": "mid",
  premium: "luxury",
  luxury: "luxury",
  "top": "luxury",
};

function extractNumber(text: string): number | undefined {
  const match = text.match(/(\d{1,4})([.,]\d+)?/);
  if (!match) return undefined;
  return Number(match[0].replace(/,/g, ""));
}

function inferDates(query: string) {
  const lower = query.toLowerCase();
  if (lower.includes("next weekend")) {
    const now = new Date();
    const day = now.getDay();
    const daysUntilSat = (6 - day + 7) % 7 || 7;
    const saturday = new Date(now);
    saturday.setDate(now.getDate() + daysUntilSat);
    const sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);
    return {
      checkIn: saturday.toISOString().slice(0, 10),
      checkOut: sunday.toISOString().slice(0, 10),
    };
  }
  return {};
}

export function parseQuery(input: string): ParsedQuery {
  const query = input.trim();
  const lower = query.toLowerCase();

  const looksTravel = TRAVEL_KEYWORDS.some((k) => lower.includes(k));

  if (looksTravel) {
    const destinationMatch = query.match(/in ([A-Za-z\s]+)/i);
    const destination = destinationMatch?.[1]?.split(" next")[0]?.trim();

    const guests = extractNumber(lower.match(/(\d+)\s*guests?/)?.[0] || "");
    const rooms = extractNumber(lower.match(/(\d+)\s*rooms?/)?.[0] || "");

    const pricePreference =
      Object.entries(PRICE_WORDS).find(([word]) => lower.includes(word))?.[1];

    const { checkIn, checkOut } = inferDates(query);
    const priceLimit = extractNumber(query.match(/under\s+\$?(\d+[.,]?\d*)/i)?.[1] || "");

    return {
      kind: "booking",
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
      pricePreference,
      priceLimit,
    };
  }

  // Product intent
  const brandMatch = query.match(/(sony|apple|samsung|dell|hp|lenovo|asus|acer|beats|bose)/i);
  const maxPrice = extractNumber(query.match(/under\s+\$?(\d+[.,]?\d*)/i)?.[1] || "");
  const rating = extractNumber(query.match(/(\d(\.\d)?)\+?\s*stars?/i)?.[0] || "");
  const shippingLocationMatch = query.match(/ships?\s+to\s+([A-Za-z\s]+)/i);

  const keywords = query
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/gi, ""))
    .filter(Boolean);

  return {
    kind: "product",
    keywords,
    brand: brandMatch?.[0],
    maxPrice,
    priceLimit: maxPrice,
    rating,
    shippingLocation: shippingLocationMatch?.[1]?.trim(),
  };
}

export function describeParsedQuery(parsed: ParsedQuery) {
  if (parsed.kind === "product") {
    return `Product search for ${parsed.keywords.join(" ")}${
      parsed.brand ? ` • brand ${parsed.brand}` : ""
    }${parsed.maxPrice ? ` • under $${parsed.maxPrice}` : ""}${
      parsed.rating ? ` • rating ${parsed.rating}+` : ""
    }${parsed.shippingLocation ? ` • ships to ${parsed.shippingLocation}` : ""}`;
  }

  return `Booking search for ${parsed.destination || "anywhere"}${
    parsed.checkIn && parsed.checkOut ? ` • ${parsed.checkIn} → ${parsed.checkOut}` : ""
  }${parsed.guests ? ` • ${parsed.guests} guests` : ""}${parsed.rooms ? ` • ${parsed.rooms} rooms` : ""}${
    parsed.pricePreference ? ` • ${parsed.pricePreference} budget` : ""
  }`;
}
