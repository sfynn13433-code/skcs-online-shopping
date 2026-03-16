import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export interface AIRouterResult {
  text: string;
  provider: "groq" | "openai" | "anthropic" | "heuristic";
}

const groqClient = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || "",
});

const openAIClient = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

async function anthropicModel(prompt: string): Promise<AIRouterResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Anthropic API key missing");
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 256,
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Anthropic failed with status ${res.status}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text || "AI response unavailable.";
  return { text, provider: "anthropic" };
}

async function groqModel(prompt: string): Promise<AIRouterResult> {
  if (!process.env.GROQ_API_KEY) throw new Error("Groq key missing");

  const { text } = await generateText({
    model: groqClient("llama-3.3-70b-versatile"),
    prompt,
    temperature: 0.35,
  });

  return { text, provider: "groq" };
}

async function openAIModel(prompt: string): Promise<AIRouterResult> {
  if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI key missing");

  const { text } = await generateText({
    model: openAIClient("gpt-4o-mini"),
    prompt,
    temperature: 0.35,
  });

  return { text, provider: "openai" };
}

function heuristicFallback(prompt: string): AIRouterResult {
  const trimmed = prompt.slice(0, 120);
  return {
    text: `Quick insight: ${trimmed}. We will confirm with live pricing and historical trends before recommending action.`,
    provider: "heuristic",
  };
}

export async function runAI(prompt: string): Promise<AIRouterResult> {
  try {
    return await groqModel(prompt);
  } catch (groqError) {
    console.warn("Groq layer failed", groqError);
    try {
      return await openAIModel(prompt);
    } catch (openAIError) {
      console.warn("OpenAI layer failed", openAIError);
      try {
        return await anthropicModel(prompt);
      } catch (anthropicError) {
        console.warn("Anthropic layer failed", anthropicError);
        return heuristicFallback(prompt);
      }
    }
  }
}

export const aiRouter = {
  groqModel,
  openAIModel,
  anthropicModel,
  heuristicFallback,
  runAI,
};
