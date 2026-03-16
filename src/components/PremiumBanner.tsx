export default function PremiumBanner() {
  return (
    <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-black py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-black/70">SKCS Premium</p>
          <h3 className="text-3xl md:text-4xl font-black leading-tight mt-2">
            Unlock the Full Power of Global Price Comparison
          </h3>
          <ul className="mt-4 space-y-1 text-black/80 font-semibold">
            <li>• Unlimited store comparisons</li>
            <li>• Hidden deals & flash sales</li>
            <li>• Price drop alerts in real time</li>
            <li>• AI smart recommendations</li>
          </ul>
        </div>
        <a
          href="/pricing"
          className="inline-flex px-6 py-4 bg-black text-white font-bold rounded-2xl shadow-lg hover:bg-neutral-900 transition"
        >
          Upgrade to Premium
        </a>
      </div>
    </section>
  );
}

