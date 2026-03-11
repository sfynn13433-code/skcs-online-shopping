import React from 'react';

export default function PrivacyPolicy(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* --- PAGE CONTENT --- */}
      <h1 className="text-3xl font-bold mb-6">Global Privacy Policy</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Modular Privacy Framework (2026 Edition)</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">1. Our Core Commitment</h3>
        <p className="text-gray-700">
          Headquartered in Pietermaritzburg, South Africa, SKCS Online Shopping is built on respect for user privacy. Our modular policy dynamically aligns with your location and the strongest applicable law—including POPIA (South Africa), GDPR (EU/EEA), and CCPA/CPRA (USA)—while practicing strict data minimization across all regions.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">2. Data Collection & Purposeful Use</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Identification:</strong> Email addresses are collected exclusively for our curated 2026 Trend Reports (opt-in only).</li>
          <li><strong>Technical Data:</strong> IP addresses and device info are used solely to determine your region and apply the correct privacy module.</li>
          <li><strong>Usage Insights:</strong> Anonymized, aggregated interaction data is used to refine our AI-driven rankings and directory relevance.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. Privacy-Forward Tracking</h3>
        <p className="text-gray-700">
          In the post-cookie era, we exclusively use first-party identifiers and server-side (S2S) attribution. This technology ensures your clicks are accurately attributed to our partners while rigorously protecting your personal privacy.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">4. Regional Addenda & Your Rights</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-4">
          <li>
            <strong>South Africa (POPIA):</strong> We are fully compliant with the Protection of Personal Information Act. Our designated Information Officer is Stephen Fynn.
          </li>
          <li>
            <strong>European Union (GDPR + AI Act):</strong> We honor your "Right to be Forgotten." In compliance with Article 50 of the EU AI Act, we explicitly label all content and rankings that are AI-assisted.
          </li>
          <li>
            <strong>United States (CCPA/CPRA):</strong> We honor Global Privacy Control (GPC) signals automatically. You may opt out of data "sharing" for attribution at any time via our Privacy Dashboard.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-2">5. Privacy Inquiries</h3>
        <p className="mb-2 text-gray-700">To exercise your data rights or for privacy-related concerns, please contact:</p>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Data Protection & Compliance:</strong> <a href="mailto:compliance@skcs.co.za" className="text-blue-600 hover:underline">compliance@skcs.co.za</a></li>
          <li><strong>Technical Privacy Support:</strong> <a href="mailto:help@skcs.co.za" className="text-blue-600 hover:underline">help@skcs.co.za</a></li>
        </ul>
      </section>

      {/* --- BOTTOM SECTION --- */}
      <div className="mt-16 pt-12 border-t border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900">SKCS</h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Online Shopping & Booking Centre</h3>
        <p className="text-gray-700 mb-8 max-w-2xl">
          The premium global destination for online shopping, booking services, and marketplace deals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="/about" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="/disclosure" className="hover:text-blue-600 transition-colors">Transparency & Disclosure</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-md font-medium transition-colors">
              Join
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 pt-6 border-t border-gray-100">
          © 2026 SKCS Online Shopping. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}