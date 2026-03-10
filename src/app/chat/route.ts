import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { cohere } from '@ai-sdk/cohere';
import { deepseek } from '@ai-sdk/deepseek';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const providers = [
  { name: 'Google Gemini', model: () => google('gemini-1.5-pro-latest') },
  { name: 'Groq', model: () => groq('llama3-70b-8192') },
  { name: 'DeepSeek', model: () => deepseek('deepseek-chat') },
  { name: 'Cohere', model: () => cohere('command-r-plus') },
  { name: 'OpenRouter (Mistral)', model: () => openrouter('mistralai/mistral-7b-instruct') },
];

export async function POST(req: Request) {
  try {
    const { messages }: { messages: any[] } = await req.json();

    for (const provider of providers) {
      try {
        console.log(`Trying provider: ${provider.name}`);
        const result = await streamText({
          model: provider.model() as any,
          messages,
          temperature: 0.7,
        });
        return result.toAIStreamResponse();
      } catch (error: any) {
        console.error(`Provider ${provider.name} failed:`, error.message);
        if (providers.indexOf(provider) === providers.length - 1) throw error;
      }
    }
    throw new Error('All providers failed');
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}