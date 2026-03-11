import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="bg-black min-h-screen text-white py-20 px-6">
      <div className="max-w-4xl mx-auto border border-white/10 bg-neutral-900/30 p-8 md:p-12 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter italic">
          Privacy <span className="text-cyan-500">Policy</span>
        </h1>
        
        <p className="text-neutral-400 mb-8 leading-relaxed">
          Last Updated: March 11, 2026. Your privacy is a priority at SKCS Online Shopping. This policy outlines how we handle data to provide you with a premium marketplace experience.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">1. Information We Collect</h2>
            <p className="text-neutral-400 leading-relaxed">
              We collect anonymous analytics, including page views and search queries, to optimize our platform. If you use our <strong>AI Shopping Assistant</strong>, the text of your queries is processed to provide product recommendations but is not linked to your personal identity unless you are signed into a registered account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">2. Affiliate Disclosure & Links</h2>
            <p className="text-neutral-400 leading-relaxed">
              SKCS Online Shopping is a participant in various affiliate programs, including <strong>Amazon Associates, AliExpress Portals, and Sovrn</strong>. We may earn a commission when you click on links and make a purchase. This comes at no extra cost to you. Once you leave our site, the privacy policy of the respective retailer (e.g., Amazon, Walmart, Takealot) applies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">3. Cookies & Tracking</h2>
            <p className="text-neutral-400 leading-relaxed">
              Our affiliate partners use <strong>cookies</strong> to track clicks for commission purposes. These cookies stay on your device for a set period (usually 24 hours to 30 days) to ensure we are credited for the referral. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">4. Your Data Rights (POPIA/GDPR)</h2>
            <p className="text-neutral-400 leading-relaxed">
              In accordance with South African <strong>POPIA</strong> regulations, you have the right to request the deletion, correction, or update of any personal data we may hold. For inquiries, please contact us at <span className="text-cyan-500">stephenfynn@skcs.co.za</span>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-cyan-500 font-bold uppercase tracking-widest hover:text-white transition">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}
