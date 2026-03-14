import { generateText } from "ai"; 
import { google } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createCohere } from "@ai-sdk/cohere";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"; 

export const maxDuration = 30;

// ==========================================
// 1. INITIALIZE SUPABASE ADMIN (VIP Access)
// ==========================================
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "" 
);

// ==========================================
// 2. INITIALIZE ALL 6 PROVIDERS
// ==========================================
const groq = createOpenAI({ baseURL: "https://api.groq.com/openai/v1", apiKey: process.env.GROQ_API_KEY || "" });
const deepseek = createOpenAI({ baseURL: "https://api.deepseek.com", apiKey: process.env.DEEPSEEK_API_KEY || "" });
const openrouter = createOpenAI({ baseURL: "https://openrouter.ai/api/v1", apiKey: process.env.OPENROUTER_API_KEY || "" });
const huggingface = createOpenAI({ baseURL: "https://api-inference.huggingface.co/v1", apiKey: process.env.HUGGINGFACE_API_KEY || "" });
const cohere = createCohere({ apiKey: process.env.COHERE_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const userQuery = message?.toLowerCase().trim() || "";

    // ==========================================
    // 3. CONVERSATIONAL DATABASE SEARCH
    // ==========================================
    const stopWords = ['i', 'am', 'looking', 'for', 'a', 'an', 'the', 'do', 'you', 'have', 'any', 'need', 'want', 'some', 'what', 'can', 'get', 'me', 'show', 'is', 'are', 'my'];
    
    const keywords = userQuery
      .replace(/[^\w\s]/gi, '') 
      .split(" ")
      .filter((w: string) => w.length > 2 && !stopWords.includes(w));

    // Search the live 'products' table
    let query = supabaseAdmin
      .from("products")
      .select("*")
      .limit(6); 

    if (keywords.length > 0) {
      const orConditions = keywords.map((w: string) => `title.ilike.%${w}%,category.ilike.%${w}%,product_group.ilike.%${w}%`).join(',');
      query = query.or(orConditions);
    }

    const { data: products, error: dbError } = await query;

    if (dbError) console.error("Supabase Error:", dbError.message);

    // ==========================================
    // 4. HARD CHECK: INVENTORY VALIDATION
    // ==========================================
    if (!products || products.length === 0) {
      return NextResponse.json({ 
        reply: "I't couldn't find matches for those keywords in our verified inventory.",
        products: [],
        modelUsed: "Core Intelligence"
      });
    }

    // ==========================================
    // 5. FORMAT PRODUCTS FOR YOUR FRONTEND GRID
    // ==========================================
    const formattedProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      brand: p.brand || "SKCS Verified",
      price: p.price,
      image: p.image_url, // Maps to your UI
      product_url: p.affiliate_url, // Maps to your UI
      description: p.product_group || p.category 
    }));

    // ==========================================
    // 6. THE 6-LAYER MANUAL WATERFALL LOOP
    // ==========================================
    const systemPrompt = `You are the SKCS Assistant. The user wants: "${userQuery}". 
    We found ${products.length} items. Write a professional 1-sentence summary for the user.`;

    const models = [
      groq("llama3-8b-8192"),                             
      deepseek("deepseek-chat"),                          
      openrouter("meta-llama/llama-3-8b-instruct"),       
      google("gemini-1.5-flash"),                    
      cohere("command-r-plus"),                           
      huggingface("meta-llama/Meta-Llama-3-8B-Instruct")  
    ];

    let aiReply = "I curated these top matches for you.";
    let modelUsed = "Core Intelligence";

    for (const model of models) {
      try {
        const { text } = await generateText({
          model: model,
          prompt: systemPrompt,
          temperature: 0.3, 
        });
        
        aiReply = text;
        modelUsed = model.modelId; // Track which one worked
        break; // Stop waterfall on success
      } catch (err) {
        console.warn(`${model.modelId} failed, trying next...`);
        continue;
      }
    }

    // ==========================================
    // 7. RETURN JSON TO YOUR DARK-MODE UI
    // ==========================================
    return NextResponse.json({
      reply: aiReply,
      products: formattedProducts,
      modelUsed: modelUsed
    });

  } catch (error) {
    console.error("Critical Server Error:", error);
    return NextResponse.json({ 
      reply: "There was a brief interruption. Please try again.",
      products: [],
      modelUsed: "Error Fallback"
    }, { status: 500 });
  }
}