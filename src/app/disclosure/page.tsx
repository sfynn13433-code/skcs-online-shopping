import React from 'react';

export default function TransparencyDisclosure(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* --- PAGE CONTENT --- */}
      <h1 className="text-3xl font-bold mb-6">Transparency & Disclosure</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">/disclosure: Our Commitment to Transparency</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Affiliate & Commission Disclosure</h3>
        <p className="mb-2 text-gray-700">
          SKCS Online Shopping is a user-supported platform. When you click our directory links and complete a purchase, we may earn a commission at zero extra cost to you. These partnerships often unlock exclusive 2026 promotional rates and offers for our community.
        </p>
        
        <h4 className="font-semibold mb-2 text-gray-800 mt-4">Typical Commission Benchmarks (2026 Vetted Data):</h4>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>SaaS & AI/Digital Tools:</strong> 20–40% (Recurring revenue is standard).</li>
          <li><strong>Retail & E-commerce:</strong> 1–15% (Higher for fashion and beauty).</li>
          <li><strong>Finance & Fintech:</strong> $50–$800 CPA (Subject to strict underwriting).</li>
          <li><strong>Travel & Experiences:</strong> 4–50% of the platform’s commission.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">AI Usage Disclosure (EU AI Act & Global Best Practice)</h3>
        <p className="mb-4 text-gray-700">
          In our pursuit of total transparency, we openly disclose that some content—including dynamic rankings and program comparisons—is AI-assisted.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Rankings:</strong> Our "Best Programs" lists are dynamically sorted by algorithms analyzing payout reliability and user sentiment.</li>
          <li><strong>Human Review:</strong> All AI-assisted data is thoroughly reviewed by our South African editorial team to ensure accuracy and local market relevance.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-2">Questions or Updates?</h3>
        <ul className="text-gray-700 space-y-1 mb-6">
          <li><strong>Inaccuracies or Program Updates:</strong> <a href="mailto:info@skcs.co.za" className="text-blue-600 hover:underline">info@skcs.co.za</a></li>
          <li><strong>Compliance & Disclosure Questions:</strong> <a href="mailto:compliance@skcs.co.za" className="text-blue-600 hover:underline">compliance@skcs.co.za</a></li>
          <li><strong>General Support:</strong> <a href="mailto:help@skcs.co.za" className="text-blue-600 hover:underline">help@skcs.co.za</a></li>
        </ul>
        <p className="text-sm text-gray-500 italic">Last Full Directory Audit: March 11, 2026.</p>
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