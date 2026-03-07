import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const systemPrompt = `You are the SKCS AI Shopping Assistant. Always recommend 3 options based on price, value, and quality.`;

    // 1. The Multi-Platform AI Waterfall
    const providers = [
      {
        name: "Groq",
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: process.env.GROQ_KEY || process.env.GROQ_API_KEY,
        model: "llama-3.1-8b-instant",
        format: "openai"
      },
      {
        name: "Gemini",
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        key: process.env.GEMINI_API_KEY,
        model: "gemini-1.5-flash",
        format: "gemini"
      },
      {
        name: "DeepSeek",
        url: "https://api.deepseek.com/chat/completions",
        key: process.env.DEPPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY,
        model: "deepseek-chat",
        format: "openai"
      },
      {
        name: "OpenRouter",
        url: "https://openrouter.ai/api/v1/chat/completions",
        key: process.env.OPENROUTER_KEY || process.env.OPENROUTER_API_KEY,
        model: "meta-llama/llama-3-8b-instruct:free",
        format: "openai"
      },
      {
        name: "Cohere",
        url: "https://api.cohere.ai/v1/chat",
        key: process.env.COHERE_API_KEY,
        model: "command-r",
        format: "cohere"
      },
      {
        name: "HuggingFace",
        url: "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
        key: process.env.HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_KEY,
        model: "hf",
        format: "huggingface"
      }
      // Comment out OpenAI for now
      // {
      //   name: "OpenAI",
      //   url: "https://api.openai.com/v1/chat/completions",
      //   key: process.env.OPENAI_KEY || process.env.OPENAI_APP_KEY,
      //   model: "gpt-4o-mini",
      //   format: "openai"
      // },
    ];

    let finalReply = "";
    let isSuccess = false;

    // 2. Loop through providers
    for (const provider of providers) {
      if (!provider.key) {
        console.log(`⏩ Skipping ${provider.name} - No API key found`);
        continue;
      }

      console.log(`🔄 Attempting to fetch from ${provider.name}...`);

      try {
        let requestBody;
        let requestHeaders: Record<string, string> = {
          "Content-Type": "application/json",
        };

        // 3. The Universal Translator: Format request based on AI type
        if (provider.format === "openai") {
          requestHeaders["Authorization"] = `Bearer ${provider.key}`;
          requestBody = JSON.stringify({
            model: provider.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message }
            ]
          });
        } 
        else if (provider.format === "gemini") {
          // Gemini does not use Bearer tokens in headers, key is in URL
          requestBody = JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemPrompt}\n\nUser Question: ${message}` }
                ]
              }
            ]
          });
        }
        else if (provider.format === "cohere") {
          requestHeaders["Authorization"] = `Bearer ${provider.key}`;
          requestHeaders["Accept"] = "application/json";
          requestBody = JSON.stringify({
            model: provider.model,
            message: `${systemPrompt}\n\nUser Question: ${message}`
          });
        }
        else if (provider.format === "huggingface") {
          requestHeaders["Authorization"] = `Bearer ${provider.key}`;
          // HuggingFace standard inference format
          requestBody = JSON.stringify({
            inputs: `[INST] ${systemPrompt}\n\n${message} [/INST]`,
            parameters: { max_new_tokens: 500 }
          });
        }

        const response = await fetch(provider.url, {
          method: "POST",
          headers: requestHeaders,
          body: requestBody,
        });

        // 🚨 Diagnostic Logging
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`\n🚨 ${provider.name} REJECTED THE REQUEST!`);
          console.error(`Status Code: ${response.status}`);
          console.error(`Reason: ${errorText}\n`);
          continue; // Move to the next backup
        }

        const data = await response.json();

        // 4. Extract the text based on the provider's specific response format
        if (provider.format === "openai") {
          finalReply = data.choices[0].message.content;
        } 
        else if (provider.format === "gemini") {
          finalReply = data.candidates[0].content.parts[0].text;
        }
        else if (provider.format === "cohere") {
          finalReply = data.text;
        }
        else if (provider.format === "huggingface") {
          // HuggingFace usually returns an array with the generated text
          finalReply = Array.isArray(data) ? data[0].generated_text : data.generated_text;
          // Strip out the prompt text if HF repeats it
          finalReply = finalReply.split("[/INST]").pop()?.trim() || finalReply;
        }

        isSuccess = true;
        console.log(`✅ Success! Response generated by ${provider.name}`);
        break; // Stop the loop, we got our answer!

      } catch (error) {
        console.error(`❌ ${provider.name} completely crashed:`, error);
      }
    }

    if (!isSuccess) {
      return NextResponse.json({ 
        reply: "System Notice: Our AI shopping servers are experiencing exceptionally high traffic. Please try again in a few moments." 
      });
    }

    return NextResponse.json({ reply: finalReply });

  } catch (error) {
    console.error("Critical API Route Crash:", error);
    return NextResponse.json({ reply: "The AI engine is temporarily offline." });
  }
}