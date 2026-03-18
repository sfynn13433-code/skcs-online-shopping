import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ensureAmazonAffiliateTag } from "@/services/affiliateLinks";

export const maxDuration = 30;

function buildPlatformUrl(query: string) {
  const q = query.trim();
  if (!q) return { platformQuery: "", platformUrl: "/platform" };
  return {
    platformQuery: q,
    platformUrl: `/platform?q=${encodeURIComponent(q)}`,
  };
}

function isTravelIntent(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("flight") ||
    m.includes("flights") ||
    m.includes("hotel") ||
    m.includes("hotels") ||
    m.includes("travel") ||
    m.includes("visa") ||
    m.includes("itinerary") ||
    m.includes("layover") ||
    m.includes("route") ||
    m.includes("destination") ||
    /\bto\b/.test(m)
  );
}

function extractBudget(message: string) {
  const match = message.match(/\$\s?([0-9]{2,6})/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function isComparisonIntent(message: string) {
  const m = message.toLowerCase();
  return m.includes("compare") || /\bvs\b/.test(m);
}

function looksLikeWeakMatch(message: string, products: any[]) {
  const q = message.toLowerCase();
  const tokens = q
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);

  if (tokens.length === 0) return true;

  const haystacks = products.map((p) =>
    `${p.title || ""} ${p.brand || ""} ${p.category || ""} ${p.product_group || ""}`.toLowerCase()
  );

  // Require at least a couple meaningful token hits in at least one item.
  for (const h of haystacks) {
    let hits = 0;
    for (const t of tokens.slice(0, 6)) {
      if (h.includes(t)) hits += 1;
    }
    if (hits >= 2) return false;
  }

  return true;
}

function extractComparisonEntities(message: string) {
  const m = message.toLowerCase();
  const entities: string[] = [];

  // Basic entity picks (extend as needed)
  if (m.includes("iphone")) entities.push("iphone");
  if (m.includes("samsung")) entities.push("samsung");
  if (m.includes("macbook")) entities.push("macbook");
  if (m.includes("dell")) entities.push("dell");

  return [...new Set(entities)];
}

function hasEntityMatch(entity: string, products: any[]) {
  const e = entity.toLowerCase();
  for (const p of products) {
    const title = `${p.title || ""}`.toLowerCase();
    const brand = `${p.brand || ""}`.toLowerCase();
    const category = `${p.category || ""}`.toLowerCase();
    const group = `${p.product_group || ""}`.toLowerCase();
    const h = `${title} ${brand} ${category} ${group}`;

    if (!h.includes(e)) continue;

    // For common phone brand comparisons, avoid accessory-only matches like "compatible with iPhone/Samsung".
    if (e === "iphone" || e === "samsung") {
      const looksLikeAccessoryOnly =
        title.includes("compatible") ||
        title.includes("case") ||
        title.includes("charger") ||
        title.includes("power bank") ||
        title.includes("portable charger") ||
        title.includes("cable") ||
        title.includes("watch") ||
        title.includes("earbuds") ||
        title.includes("headphones") ||
        title.includes("screen protector") ||
        title.includes("cover") ||
        title.includes("strap");

      // Treat only explicit smartphone taxonomy as a phone signal.
      // (Accessories often contain the word "phone" in taxonomy, so we avoid using that.)
      const looksLikePhoneByTaxonomy =
        category.includes("smartphone") || group.includes("smartphone");

      const looksLikeSpecificPhoneModel =
        /\biphone\s?(\d{1,2}|se|pro|max)\b/.test(title) ||
        /\bgalaxy\s?(s\d{1,2}|a\d{1,2}|z\b|fold\b|flip\b)\b/.test(title) ||
        title.includes("samsung galaxy");

      const looksLikePhone = looksLikePhoneByTaxonomy || looksLikeSpecificPhoneModel;

      // For phone comparisons, only treat an entity as present if the listing looks like an actual phone.
      // If it looks like an accessory, require an explicit phone model pattern.
      // Accessories mentioning a phone model (e.g., chargers/power banks) should still be rejected.
      if (looksLikeAccessoryOnly) continue;
      if (!looksLikePhone) continue;

      // If it's an accessory-ish listing and doesn't look like an actual phone, reject.
      if (looksLikeAccessoryOnly && !looksLikePhone) continue;

      // If it says "compatible" and doesn't look like an actual phone, reject.
      if (title.includes("compatible") && !looksLikePhone) continue;
    }

    return true;
  }
  return false;
}

function travelAdvisorReply(message: string) {
  const { platformUrl } = buildPlatformUrl(message);
  const budget = extractBudget(message);
  const m = message.trim();

  const lines: string[] = [];
  lines.push("🔍 Understanding your needs:");
  lines.push(`- Query: ${m}`);
  if (budget) lines.push(`- Budget mentioned: $${budget}`);
  lines.push("- Goal: find the best-value route/timing with minimal risk (price spikes, bad connections).\n");

  lines.push("🏆 Best options:");
  lines.push("- Best value approach: flexible dates (+/- 3 days) + 1-stop routes via major hubs.");
  lines.push("- Best comfort approach: fewer connections (often higher price, lower disruption risk).\n");

  lines.push("⚖️ Comparison:");
  lines.push("- Cheapest: 1–2 stops, longer layovers, more variance in pricing");
  lines.push("- Best overall: 1 stop via a major hub (balance of price + reliability)");
  lines.push("- Fastest: direct/short connections (usually most expensive)\n");

  lines.push("💡 Recommendation:");
  lines.push("- If you want the best deal: monitor prices daily and book when you see a dip.");
  lines.push("- Best time to book (typical): 2–6 weeks ahead for short/medium haul, 6–12 weeks for long haul.\n");

  lines.push("👉 Next step:");
  lines.push(`I can help you compare options and timing. Start here: ${platformUrl}`);

  return lines.join("\n");
}

export async function POST(req: Request) {
  try {
    // 1. INITIALIZE SUPABASE WITH ADMIN KEY (To bypass RLS)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    const { message } = await req.json();
    if (!message) return NextResponse.json({ reply: "How can I help you today?", products: [] });

    const { platformQuery, platformUrl } = buildPlatformUrl(message);

    // Travel intent: keep the existing assistant UI intact, but return an advisor-style reply.
    if (isTravelIntent(message)) {
      return NextResponse.json({
        reply: travelAdvisorReply(message),
        products: [],
        modelUsed: "Advisor (Travel)",
        platformQuery,
        platformUrl,
      });
    }

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

    // Comparison queries need high relevance; if inventory matches are weak/noisy, answer as an advisor and
    // route the user to /platform for broader comparison.
    if (isComparisonIntent(message)) {
      const entities = extractComparisonEntities(message);

      // For comparison queries, filter out noisy matches (e.g. accessories "compatible with iPhone/Samsung").
      // We only keep items that look like strong matches for at least one comparison entity.
      if (entities.length > 0) {
        rawProducts = rawProducts.filter((p) =>
          entities.some((e) => hasEntityMatch(e, [p]))
        );
      }

      const hasAllEntities =
        entities.length > 0 && entities.every((e) => hasEntityMatch(e, rawProducts));

      if (
        rawProducts.length === 0 ||
        !hasAllEntities ||
        (rawProducts.length > 0 && looksLikeWeakMatch(message, rawProducts))
      ) {
        const budget = extractBudget(message);
        const lines: string[] = [];
        lines.push("🔍 Understanding your needs:");
        lines.push(`- Query: ${message.trim()}`);
        if (budget) lines.push(`- Budget mentioned: $${budget}`);
        lines.push("- Goal: a clear, decision-focused comparison (tradeoffs + best fit).\n");

        lines.push("🏆 Best options:");
        lines.push(
          "- I can compare these two categories/models, but our verified inventory doesn’t contain clean matches for the exact items yet.\n"
        );

        lines.push("⚖️ Comparison:");
        lines.push("- iPhone: tighter ecosystem, long software support, consistent camera/video");
        lines.push("- Samsung: more hardware variety, stronger customization, often better zoom options\n");

        lines.push("💡 Recommendation:");
        lines.push(
          "Tell me your priority (camera, battery, gaming, durability, resale) and I’ll pick a winner for your situation.\n"
        );

        lines.push("👉 Next step:");
        lines.push("👉 I can show you the best prices across stores — click below:");
        lines.push(`[ Compare Prices ] ${platformUrl}`);

        return NextResponse.json({
          reply: lines.join("\n"),
          products: [],
          modelUsed: "Advisor (Comparison)",
          platformQuery,
          platformUrl,
        });
      }
    }

    // If we couldn't find matches, still return a structured advisor reply and a platform link.
    if (rawProducts.length === 0) {
      const budget = extractBudget(message);
      const lines: string[] = [];
      lines.push("🔍 Understanding your needs:");
      lines.push(`- Query: ${message.trim()}`);
      if (budget) lines.push(`- Budget mentioned: $${budget}`);
      lines.push("- Preferences: (tell me brand, screen size, battery life, gaming vs work)\n");

      lines.push("🏆 Best options:");
      lines.push("- I don’t see an exact match in verified inventory yet, but I can still help you compare across stores.\n");

      lines.push("💡 Recommendation:");
      lines.push("- Refine with 1–2 details (budget + use-case) for a sharper shortlist.\n");

      lines.push("👉 Next step:");
      lines.push("👉 I can show you the best prices across stores — click below:");
      lines.push(`[ Compare Prices ] ${platformUrl}`);

      return NextResponse.json({
        reply: lines.join("\n"),
        products: [],
        modelUsed: "Advisor (Fallback)",
        platformQuery,
        platformUrl,
      });
    }

    // 3. PREPARE WATERFALL PROVIDERS (6-Layer Logic)
    const productList = rawProducts
      .map((p) => `[ID: ${p.id}] ${p.brand} - ${p.title} ($${p.price})`)
      .join("\n");

    const budget = extractBudget(message);
    const systemPrompt = `You are SKCS Intelligent Advisor.

MANDATORY OUTPUT FORMAT (JSON only):
{
  "intent": {
    "budget": "<string or null>",
    "use_case": "<string>",
    "preferences": ["<string>"]
  },
  "options": [
    {"label": "Best overall", "id": "<uuid>", "why": ["<reason>"]},
    {"label": "Best value", "id": "<uuid>", "why": ["<reason>"]}
  ],
  "comparison": ["<short bullet>", "<short bullet>"],
  "recommendation": "<1-2 sentences>",
  "approved_ids": ["<uuid>"]
}

USER MESSAGE: "${message}"
${budget ? `BUDGET: $${budget}` : ""}

INVENTORY (select from these IDs only):
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
    const mapRawToFrontend = (rows: any[]) =>
      rows.map((p) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        image: p.image_url,
        description: p.product_group || p.category,
        product_url: ensureAmazonAffiliateTag(p.affiliate_url),
      }));

    const inventoryIdSet = new Set(rawProducts.map((p) => `${p.id}`));
    const approvedIds: string[] = Array.isArray(aiDecision?.approved_ids)
      ? aiDecision.approved_ids.filter((id: any) => inventoryIdSet.has(`${id}`))
      : [];

    let finalProducts = mapRawToFrontend(
      rawProducts.filter((p) => !aiDecision || approvedIds.includes(`${p.id}`))
    );

    // If the AI returns invalid IDs (or an empty approved list), don't return an empty grid.
    if (aiDecision && finalProducts.length === 0) {
      finalProducts = mapRawToFrontend(rawProducts.slice(0, 6));
    }

    const intentBudget = aiDecision?.intent?.budget || (budget ? `$${budget}` : null);
    const intentUseCase = aiDecision?.intent?.use_case || "shopping / comparison";
    const intentPrefs = Array.isArray(aiDecision?.intent?.preferences)
      ? aiDecision.intent.preferences
      : [];

    const optionLines: string[] = [];
    const options = Array.isArray(aiDecision?.options)
      ? aiDecision.options.filter((o: any) => inventoryIdSet.has(`${o?.id}`))
      : [];
    for (const opt of options) {
      const id = opt?.id;
      const product = id ? finalProducts.find((p) => `${p.id}` === `${id}`) : undefined;
      const title = product?.title || (typeof id === "string" ? id : "");
      const why = Array.isArray(opt?.why) ? opt.why : [];

      if (title) {
        optionLines.push(`• ${opt?.label || "Option"}: ${title}`);
        for (const w of why.slice(0, 3)) {
          optionLines.push(`  → ${w}`);
        }
      }
    }

    // If the model didn't produce usable options, derive them from returned products.
    if (optionLines.length === 0 && finalProducts.length > 0) {
      const bestOverall = finalProducts[0];
      const bestValue = finalProducts[1] || finalProducts[0];
      optionLines.push(`• Best overall: ${bestOverall.title}`);
      optionLines.push(`  → Strong all-round fit for your query`);
      optionLines.push(`• Best value: ${bestValue.title}`);
      optionLines.push(`  → Good value among verified matches`);
    }

    const comparisonLines = Array.isArray(aiDecision?.comparison) ? aiDecision.comparison : [];

    const replyLines: string[] = [];
    replyLines.push("🔍 Understanding your needs:");
    replyLines.push(`- Budget: ${intentBudget || "Not specified"}`);
    replyLines.push(`- Use case: ${intentUseCase}`);
    replyLines.push(`- Preferences: ${intentPrefs.length ? intentPrefs.join(", ") : "Not specified"}`);
    replyLines.push("");

    replyLines.push("🏆 Best options:");
    if (optionLines.length) replyLines.push(optionLines.join("\n"));
    else replyLines.push("Based on your query, here are the best options from verified inventory.");
    replyLines.push("");

    if (comparisonLines.length) {
      replyLines.push("⚖️ Comparison:");
      for (const c of comparisonLines.slice(0, 6)) replyLines.push(`- ${c}`);
      replyLines.push("");
    }

    replyLines.push("💡 Recommendation:");
    replyLines.push(aiDecision?.recommendation || "Pick the best overall unless budget is tight—then go best value.");
    replyLines.push("");

    replyLines.push("👉 Next step:");
    replyLines.push("👉 I can show you the best prices across stores — click below:");
    replyLines.push(`[ Compare Prices ] ${platformUrl}`);

    return NextResponse.json({
      reply: replyLines.join("\n"),
      products: finalProducts,
      modelUsed,
      platformQuery,
      platformUrl,
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ reply: "Sync error. Please try again.", products: [] }, { status: 500 });
  }
}
