"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-black text-[10px]">
              SKCS
            </div>
            <span className="font-black text-xl italic uppercase">
              Online Shopping & Booking Centre
            </span>
          </div>

          <p className="text-neutral-500 max-w-sm text-sm leading-relaxed">
            SKCS compares prices across global marketplaces so you can discover
            the best deals in one place. Our AI shopping assistant helps you
            find products faster and smarter.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
            Resources
          </h4>

          <ul className="space-y-4 text-sm text-neutral-500">
            <li>
              <Link href="/about" className="hover:text-cyan-500 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/privacy" className="hover:text-cyan-500 transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-cyan-500 transition">
                Terms of Service
              </Link>
            </li>

            <li>
              <Link href="/disclosure" className="hover:text-cyan-500 transition">
                Transparency & Disclosure
              </Link>
            </li>

            <li>
              <Link href="/blog" className="hover:text-cyan-500 transition">
                Shopping Guides (Blog)
              </Link>
            </li>
          </ul>
        </div>

        {/* Support / Social */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
            Connect
          </h4>

          <ul className="space-y-4 text-sm text-neutral-500">
            <li className="hover:text-cyan-500 transition cursor-pointer">
              WhatsApp Support (Coming Soon)
            </li>

            <li className="hover:text-cyan-500 transition cursor-pointer">
              Messenger Chat (Coming Soon)
            </li>

            <li>
              <a
                href="mailto:support@skcs.co.za"
                className="hover:text-cyan-500 transition"
              >
                Email Support
              </a>
            </li>

            <li className="hover:text-cyan-500 transition cursor-pointer">
              Facebook
            </li>

            <li className="hover:text-cyan-500 transition cursor-pointer">
              Instagram
            </li>

            <li className="hover:text-cyan-500 transition cursor-pointer">
              X (Twitter)
            </li>

            <li className="hover:text-cyan-500 transition cursor-pointer">
              LinkedIn
            </li>

            <li className="hover:text-cyan-500 transition cursor-pointer">
              YouTube
            </li>
          </ul>
        </div>
      </div>

      {/* B-BBEE TRUST BADGE */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-neutral-900 border border-cyan-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
              South African Certification
            </p>

            <h3 className="text-white font-bold text-lg">
              Level 1 B-BBEE Contributor
            </h3>

            <p className="text-neutral-400 text-sm">
              135% Procurement Recognition
            </p>
          </div>

          <div className="text-sm text-neutral-400 text-center md:text-right">
            <p>K2025918368 (South Africa) (Pty) Ltd</p>
            <p>Certified until Nov 2026</p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">
        <p>© 2026 SKCS Online Shopping. All Rights Reserved.</p>
        <p>Registration number 2025 / 918368 / 07</p>
      </div>
    </footer>
  );
}