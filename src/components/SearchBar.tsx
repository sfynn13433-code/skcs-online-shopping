import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-neutral-900/70 border border-white/10 rounded-2xl px-4 py-3"
    >
      <Search className="w-5 h-5 text-neutral-500" />
      <input
        className="flex-1 bg-transparent outline-none text-white placeholder:text-neutral-500"
        placeholder="Search products, brands, categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
      >
        Search
      </button>
    </form>
  );
}
