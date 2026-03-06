export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-black mb-8">
          About SKCS Online Shopping
        </h1>

        <p className="text-neutral-400 mb-6">
          SKCS Online Shopping is a smart product discovery platform
          designed to help shoppers find the best deals across multiple
          online retailers.
        </p>

        <p className="text-neutral-400 mb-6">
          Instead of searching many websites, SKCS compares products
          and highlights the best value available.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          How It Works
        </h2>

        <ul className="list-disc pl-6 text-neutral-400 space-y-2">
          <li>Search for products</li>
          <li>Compare deals across multiple stores</li>
          <li>Identify the best available price</li>
          <li>Redirect to the retailer to complete your purchase</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Affiliate Disclosure
        </h2>

        <p className="text-neutral-400">
          Some links on this website are affiliate links. This means
          that if you click a link and make a purchase we may earn a
          commission at no additional cost to you.
        </p>

      </div>
    </main>
  );
}