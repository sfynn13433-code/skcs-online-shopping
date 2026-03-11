import React from 'react';

export default function TermsOfService(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* --- PAGE CONTENT --- */}
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">The 2026 Service Agreement</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">1. Agreement & Scope</h3>
        <p className="text-gray-700">
          Accessing or using SKCS Online Shopping constitutes acceptance of these terms. We operate as an informational affiliate directory and meta-resource; we are not a retailer. All purchases occur directly with merchants (e.g., Amazon, Takealot) under their separate terms.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">2. Strict Affiliate & User Code of Conduct</h3>
        <p className="mb-4 text-gray-700">
          To safeguard our platform’s integrity and our 150+ merchant partnerships, you agree not to engage in:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Cookie Stuffing:</strong> Using scripts to drop cookies without an explicit, intentional user click.</li>
          <li><strong>Brand Bidding:</strong> Bidding on trademarked terms containing merchant brands or "SKCS" on search engines or social media.</li>
          <li><strong>Incentivized Traffic:</strong> Offering "cashback" or "points" for clicks unless pre-approved in writing as a legitimate rewards platform.</li>
          <li><strong>Misleading Claims:</strong> Misrepresenting product features, pricing, or promotional offers.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. AI & Data Integrity</h3>
        <p className="text-gray-700">
          Our directory combines human expertise with SKCS AI Intelligence. While we audit rigorously, commission rates, cookie durations, and terms can change without notice. You must independently verify all details on the official merchant site before promoting or joining any program.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">4. Legal & Governing Law</h3>
        <p className="text-gray-700">
          These terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved exclusively in the courts of Pietermaritzburg, KwaZulu-Natal.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-2">5. Contact Information</h3>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Formal Legal Notices & Disputes:</strong> <a href="mailto:legal@skcs.co.za" className="text-blue-600 hover:underline">legal@skcs.co.za</a></li>
          <li><strong>Support & General Questions:</strong> <a href="mailto:info@skcs.co.za" className="text-blue-600 hover:underline">info@skcs.co.za</a> or <a href="mailto:help@skcs.co.za" className="text-blue-600 hover:underline">help@skcs.co.za</a></li>
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