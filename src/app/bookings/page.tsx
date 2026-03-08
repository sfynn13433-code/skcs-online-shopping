// src/app/bookings/page.tsx
"use client";

import { useState, useEffect } from "react";

// Define a type for your booking data – adjust fields as needed
interface Booking {
  id: string;
  title: string;
  date?: string;
  status?: string;
  // add other fields you expect from the API
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]); // ✅ properly typed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings') // adjust endpoint as needed
      .then(res => res.json())
      .then((data: unknown) => {
        // Ensure data is an array and each item matches Booking shape
        if (Array.isArray(data)) {
          setBookings(data as Booking[]);
        } else {
          setBookings([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch bookings:', err);
        setBookings([]); // fallback
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading bookings...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-neutral-900 p-4 rounded">
              {/* Render booking details – example: */}
              <p className="font-bold">{booking.title}</p>
              <p className="text-sm text-neutral-400">{booking.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}