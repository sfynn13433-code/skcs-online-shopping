export const metadata = {
  title: "SKCS Pricing",
  description: "Choose between SKCS Free and SKCS Premium plans.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Top 5 store comparisons",
      "Standard deal alerts (daily summary)",
      "AI shopping assistant (core)",
      "Last 7 days price history",
    ],
    cta: "Continue Free",
    primary: false,
  },
  {
    name: "Premium",
    price: "$14.99/mo",
    features: [
      "Unlimited store comparisons",
      "Real-time price drop alerts",
      "Hidden deals & flash sales",
      "Full price history",
      "AI smart recommendations",
      "Early deal access",
    ],
    cta: "Upgrade to Premium",
    primary: true,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen text-white py-16">
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">SKCS Premium</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Choose your plan</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Free tier stays powerful. Premium unlocks hidden deals, unlimited comparisons, and instant alerts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border ${
                tier.primary ? "border-cyan-500/40 bg-cyan-500/5" : "border-white/10 bg-neutral-900/60"
              } p-8 flex flex-col gap-4 shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                {tier.primary && (
                  <span className="px-3 py-1 text-xs font-semibold bg-cyan-500 text-black rounded-full">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="text-4xl font-black">{tier.price}</p>
              <ul className="space-y-2 text-neutral-200">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-auto inline-flex justify-center px-5 py-3 rounded-xl font-semibold transition ${
                  tier.primary
                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                    : "bg-white text-black hover:bg-cyan-500 hover:text-white"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

