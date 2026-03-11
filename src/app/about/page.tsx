import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">
            Our <span className="text-cyan-500">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
            SKCS Online Shopping was born from a simple observation: <span className="text-white">the internet is too big to shop alone.</span> We built a smarter way to discover, compare, and save.
          </p>
        </div>

        {/* BENTO GRID - HOW IT WORKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Block 1: The Problem */}
          <div className="md:col-span-2 bg-neutral-900/50 border border-white/10 rounded-[2rem] p-10 hover:border-cyan-500/30 transition-all group">
            <span className="text-4xl mb-6 block">🔍</span>
            <h3 className="text-3xl font-bold mb-4">The Search Problem</h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Modern shoppers spend hours jumping between tabs—Amazon, AliExpress, local retailers—trying to find the true best price. It’s exhausting and inefficient.
            </p>
          </div>

          {/* Block 2: The Logic */}
          <div className="bg-cyan-500 text-black rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden relative">
            <h3 className="text-3xl font-black uppercase leading-none relative z-10">Smart<br />Logic</h3>
            <p className="font-bold relative z-10">We aggregate millions of data points to highlight real value in real-time.</p>
            <div className="absolute -right-8 -bottom-8 text-9xl opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform">⚙️</div>
          </div>

          {/* Block 3: AI Assistant */}
          <div className="bg-neutral-900/50 border border-white/10 rounded-[2rem] p-10 hover:border-cyan-500/30 transition-all flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center text-3xl mb-6 border border-cyan-500/20">🤖</div>
            <h3 className="text-2xl font-bold mb-2">AI-Driven</h3>
            <p className="text-neutral-500 text-sm">Our 2026 AI Assistant helps you navigate complex choices instantly.</p>
          </div>

          {/* Block 4: Global Access */}
          <div className="md:col-span-2 bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-grow">
              <h3 className="text-3xl font-bold mb-4 text-white">Global & Local</h3>
              <p className="text-neutral-400">From Pietermaritzburg to the world. We bridge the gap between South African favorites like Takealot and global giants like Walmart and AliExpress.</p>
            </div>
            <div className="text-7xl">🌍</div>
          </div>
        </div>

        {/* AFFILIATE DISCLOSURE BOX */}
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500 mb-4">Affiliate Transparency</h4>
          <p className="text-neutral-400 text-sm italic">
            SKCS Online Shopping is an independent comparison platform. To keep our service free, we participate in affiliate programs. If you purchase through our links, we may earn a commission. This never changes the price you pay, but it helps us keep the AI running and the deals flowing.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link href="/" className="inline-block bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-cyan-500 transition-all transform hover:scale-105 shadow-2xl">
            Start Shopping
          </Link>
        </div>

      </div>
    </main>
  );
}
