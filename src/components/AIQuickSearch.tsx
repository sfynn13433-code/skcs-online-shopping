"use client";

const prompts = [
  "best gaming laptop under $1500",
  "compare iphone vs samsung flagship",
  "best budget wireless earbuds",
  "top 4k smart tv 2026",
  "best mechanical keyboard for gaming",
  "best smartphone camera 2026"
];

export default function AIQuickSearch() {

  const runPrompt = (prompt: string) => {

    const event = new CustomEvent("global-search", { detail: prompt });
    window.dispatchEvent(event);

    const aiSection = document.getElementById("ai-assistant-section");

    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

      {prompts.map((prompt) => (

        <button
          key={prompt}
          onClick={() => runPrompt(prompt)}
          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-left text-sm hover:bg-cyan-500 hover:text-black transition-all"
        >

          {prompt}

        </button>

      ))}

    </div>

  );
}