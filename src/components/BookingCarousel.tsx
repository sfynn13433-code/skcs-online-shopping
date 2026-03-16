import { BookingResult } from "@/lib/bookings/types";

interface Props {
  items: BookingResult[];
}

export default function BookingCarousel({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((b) => (
        <div key={b.hotelName + b.bookingUrl} className="bg-neutral-900/70 border border-white/10 rounded-2xl overflow-hidden">
          <div
            className="h-40 bg-neutral-800"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35)), url(${b.image || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="p-4 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">Booking</p>
            <h3 className="text-lg font-bold">{b.hotelName}</h3>
            <p className="text-neutral-400 text-sm">{b.location}</p>
            <p className="text-cyan-400 font-black">${b.price} / night</p>
            <p className="text-yellow-400 text-sm font-semibold">{b.rating ?? "4.5"} rating</p>
            <a
              href={b.affiliateUrl}
              target="_blank"
              rel="noopener sponsored"
              className="mt-auto inline-flex justify-center px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-cyan-500 hover:text-white"
            >
              Book now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

