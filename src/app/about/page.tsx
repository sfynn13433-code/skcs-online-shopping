import React from 'react';

export default function AboutUs(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* --- PAGE CONTENT --- */}
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        SKCS Online Shopping: Your Definitive Hub for Affiliate Intelligence
      </h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p className="mb-2 text-gray-700">
          In the complex, $17+ billion digital affiliate economy of 2026, success demands more than just finding a program—it requires intelligent navigation through fragmented commission structures, post-cookie tracking technologies, and stringent global compliance.
        </p>
        <p className="mb-2 text-gray-700">
          Founded in Pietermaritzburg, South Africa, SKCS Online Shopping exists as the Single Source of Truth for publishers, creators, and entrepreneurs. We deliver vetted, actionable intelligence so you can confidently build sustainable revenue streams.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">What Sets Us Apart</h3>
        <p className="mb-4 text-gray-700">
          We don't just list programs; we maintain the industry's most comprehensive, continuously audited directory. Our coverage emphasizes depth and accuracy across three core areas:
        </p>

        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>
            <strong>Global Category Leaders:</strong> Detailed analysis of powerhouse networks like Amazon Associates, Walmart, eBay Partner Network, and Booking.com, featuring up-to-date performance metrics and real-world payout reliability.
          </li>
          <li>
            <strong>Emerging & Regional Markets:</strong> Specialized intelligence on high-growth regions, with a dedicated focus on Africa and the Middle East. We spotlight standout programs from Jumia, Takealot, Mr Price, Konga, and Noon.
          </li>
          <li>
            <strong>High-Value Niche Verticals:</strong> Curated opportunities in lucrative sectors including SaaS and AI tools (recurring revenue), Fintech, Digital Education, and Travel.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          The SKCS Standard: Trust Through Rigorous Vetting
        </h3>

        <p className="mb-4 text-gray-700">
          Every listed program undergoes our proprietary 2026 Benchmark Suite audit to ensure:
        </p>

        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>
            <strong>Full Transparency:</strong> Verified commission models (CPS, CPA, hybrid, recurring) and payout thresholds.
          </li>
          <li>
            <strong>Tracking Resilience:</strong> Assessment of first-party cookies and server-to-server (S2S) solutions in privacy-first environments.
          </li>
          <li>
            <strong>Integrity:</strong> Alignment with FTC, GDPR, POPIA, and ASA standards.
          </li>
        </ul>
      </section>

      {/* --- B-BBEE CERTIFICATION SECTION --- */}

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-3">
          South African Certification & Compliance
        </h3>

        <p className="text-gray-700 mb-3">
          SKCS Online Shopping operates as a proudly South African developed
          digital marketplace intelligence platform supporting publishers,
          brands, and online shoppers across global markets.
        </p>

        <p className="text-gray-700 mb-3">
          The platform operates under
          <strong> K2025918368 (South Africa) (Pty) Ltd</strong>, a registered
          South African private company.
        </p>

        <p className="text-gray-700 mb-4">
          The company holds a
          <strong> Level 1 B-BBEE Contributor certification</strong> with
          <strong> 135% Procurement Recognition</strong>, supporting inclusive
          economic participation and enabling corporate procurement alignment
          for businesses partnering with the SKCS platform.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>B-BBEE Status:</strong> Level 1 Contributor
          </p>

          <p className="text-sm text-gray-700">
            <strong>Procurement Recognition:</strong> 135%
          </p>

          <p className="text-sm text-gray-700">
            <strong>Certification Valid Until:</strong> 24 November 2026
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>

        <ul className="text-gray-700 space-y-1">
          <li>
            <strong>General Inquiries & Partnerships:</strong>{' '}
            <a
              href="mailto:info@skcs.co.za"
              className="text-blue-600 hover:underline"
            >
              info@skcs.co.za
            </a>
          </li>

          <li>
            <strong>User Support & Technical Help:</strong>{' '}
            <a
              href="mailto:help@skcs.co.za"
              className="text-blue-600 hover:underline"
            >
              help@skcs.co.za
            </a>
          </li>
        </ul>
      </section>

      {/* --- BOTTOM SECTION --- */}

      <div className="mt-16 pt-12 border-t border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900">SKCS</h2>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Online Shopping & Booking Centre
        </h3>

        <p className="text-gray-700 mb-8 max-w-2xl">
          The premium global destination for online shopping, booking services,
          and marketplace deals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Resources
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>

              <li>
                <a
                  href="/disclosure"
                  className="hover:text-blue-600 transition-colors"
                >
                  Transparency & Disclosure
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Stay Updated
            </h3>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-md font-medium transition-colors">
              Join
            </button>
          </div>
        </div>

        {/* --- FOOTER LEGAL / CERTIFICATION --- */}

        <div className="text-sm text-gray-500 pt-6 border-t border-gray-100 space-y-1">
          <p>© 2026 SKCS Online Shopping. All Rights Reserved.</p>

          <p>
            SKCS Online Shopping is operated by{' '}
            <strong>K2025918368 (South Africa) (Pty) Ltd</strong>.
          </p>

          <p>
            Certified <strong>Level 1 B-BBEE Contributor</strong> with
            <strong> 135% Procurement Recognition</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}