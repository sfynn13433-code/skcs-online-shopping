import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SKCS Online Shopping | Global Shopping & Booking Centre",
  description:
    "SKCS Online Shopping compares prices from Amazon, Takealot, Evetech, Wootware and other global stores so you can find the best deals in one place.",
  // Added GridinSoft verification tag here:
  other: {
    "gridinsoft-key": "qsnmquihxbg25xauq0gk9zzu94fb5gsc449b9rjn8iq0bokoz4rcttu97q12f3vr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen flex flex-col
        `}
      >
        <Navbar />
        <main className="pt-20">{children}</main> {/* pt-20 matches navbar height */}
        {/* Optional footer – uncomment when ready */}
        {/* <footer className="bg-gray-800 text-white py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            © {new Date().getFullYear()} SKCS Online Shopping
          </div>
        </footer> */}
      </body>
    </html>
  );
}