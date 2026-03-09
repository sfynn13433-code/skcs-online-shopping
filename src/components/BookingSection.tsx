import Link from 'next/link';

export default function BookingSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-blue-900 to-cyan-800 rounded-3xl p-10 text-center">
        <h2 className="text-4xl font-black text-white mb-4">🌍 Travel Booking</h2>
        <p className="text-xl text-white/80 mb-8">Flights, hotels, and car rentals – coming soon!</p>
        <Link
          href="/bookings"
          className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-500 hover:text-white transition-all shadow-lg"
        >
          Explore Now
        </Link>
      </div>
    </section>
  );
}