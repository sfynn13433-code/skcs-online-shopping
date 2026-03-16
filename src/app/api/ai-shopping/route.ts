import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. INITIALIZE SUPABASE WITH ADMIN KEY (To bypass RLS)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    const { message } = await req.json();
    if (!message) return NextResponse.json({ reply: "How can I help you today?" });

    // 2. BROAD DATABASE SEARCH
    const cleanQuery = message.toLowerCase().replace(/[^\w\s]/g, "").trim();
    const keywords = cleanQuery.split(" ").filter((word: string) => word.length > 2);

    let rawProducts: any[] = [];

    if (keywords.length > 0) {
      // Searching across title, brand, and category
      const orConditions = keywords
        .map((w: string) => `title.ilike.%${w}%,brand.ilike.%${w}%,category.ilike.%${w}%`)
        .join(",");

      const { data, error } = await supabaseAdmin
        .from("products")
        .select("*")
        .or(orConditions)
        .limit(15);

      if (error) console.error("Supabase error:", error);
      rawProducts = data || [];
    }

    // Hard check: If no data, stop here
    if (rawProducts.length === 0) {
      return NextResponse.json({
        reply: "I couldn't find any items in our verified inventory matching those keywords.",
        products: [],
        modelUsed: "Core Intelligence"
      });
    }

    // 3. PREPARE WATERFALL PROVIDERS (6-Layer Logic)
    const productList = rawProducts
      .map((p) => `[ID: ${p.id}] ${p.brand} - ${p.title} ($${p.price})`)
      .join("\n");

    const systemPrompt = `User wants: "${message}". 
TASK: You are the SKCS Assistant. Select only the most relevant product IDs from the list. 
Respond ONLY in JSON format: { "decision": "Professional 1-sentence summary", "approved_ids": ["uuid"] }
Inventory:
${productList}`;

    const providers = [
      { name: "Groq", url: "https://api.groq.com/openai/v1/chat/completions", key: process.env.GROQ_API_KEY, model: "llama-3.3-70b-versatile" },
      { name: "DeepSeek", url: "https://api.deepseek.com/chat/completions", key: process.env.DEEPSEEK_API_KEY, model: "deepseek-chat" },
      { name: "Gemini", url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, key: process.env.GEMINI_API_KEY, model: "gemini-1.5-flash" },
      { name: "OpenRouter", url: "https://openrouter.ai/api/v1/chat/completions", key: process.env.OPENROUTER_API_KEY, model: "meta-llama/llama-3-8b-instruct" },
      { name: "Cohere", url: "https://api.cohere.ai/v1/chat", key: process.env.COHERE_API_KEY, model: "command-r-plus" },
      { name: "HuggingFace", url: "https://api-inference.huggingface.co/v1/chat/completions", key: process.env.HUGGINGFACE_API_KEY, model: "meta-llama/Meta-Llama-3-8B-Instruct" }
    ];

    let aiDecision = null;
    let modelUsed = "Core Intelligence";

    // 4. EXECUTE WATERFALL
    for (const p of providers) {
      if (!p.key) continue;

      try {
        const isGemini = p.name === "Gemini";
        const res = await fetch(p.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isGemini ? {} : { Authorization: `Bearer ${p.key}` })
          },
          body: JSON.stringify(
            isGemini
              ? {
                  contents: [{ parts: [{ text: systemPrompt }] }],
                  generationConfig: { response_mime_type: "application/json", temperature: 0.1 }
                }
              : {
                  model: p.model,
                  messages: [{ role: "user", content: systemPrompt }],
                  response_format: { type: "json_object" },
                  temperature: 0.1
                }
          ),
          signal: AbortSignal.timeout(6000)
        });

        if (res.ok) {
          const data = await res.json();
          const text = isGemini ? data.candidates[0].content.parts[0].text : data.choices[0].message.content;
          aiDecision = JSON.parse(text.replace(/```json|```/g, "").trim());
          modelUsed = p.name;
          break; // Stop waterfall on success
        }
      } catch (e) {
        console.error(`${p.name} layer failed, moving to next...`);
      }
    }

    // 5. MAP DATA TO FRONTEND KEYS
    // We map 'image_url' to 'image' and 'affiliate_url' to 'product_url'
    const finalProducts = rawProducts
      .filter((p) => !aiDecision || aiDecision.approved_ids.includes(p.id))
      .map((p) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        image: p.image_url, 
        description: p.product_group || p.category,
        product_url: ensureAmazonAffiliateTag(p.affiliate_url), 
      }));

    return NextResponse.json({
      reply: aiDecision?.decision || "I've curated the best matches from our inventory for you.",
      products: finalProducts,
      modelUsed
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ reply: "Sync error. Please try again.", products: [] }, { status: 500 });
  }
}
