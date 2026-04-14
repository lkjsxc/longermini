import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { cookies } from "next/headers";
import { checkRateLimit, setRateLimitCookie } from "@/utils/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const language = body.language || "English";
    const model = "gemini-3-flash-preview";

    const cookieStore = await cookies();
    const { limitReached, remaining, usage } = checkRateLimit(cookieStore);

    if (limitReached) {
      return NextResponse.json(
        { error: "Daily limit of 10 requests reached." },
        { status: 429 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Internal Server Error: Missing API Key" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Generate a very short, random, casual sentence in ${language}. It should be high-quality but funny, mundane, or relatable (e.g., "I'm hungry", "My back hurts", "The moon is beautiful", "I want to eat karaage").
    Do not include translations, explanations, or quotes. Just output the sentence.
    You MUST output your thoughts first inside <think>...</think> tags, then output ONLY the final text outside the tags.
    CRITICAL: Keep your thinking phase extremely brief (simulate under 5 seconds of thought).`;

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
        } catch (e) {
          console.error("Stream error", e);
        } finally {
          controller.close();
        }
      }
    });

    const response = new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Remaining-Uses": remaining.toString(),
      }
    });

    setRateLimitCookie(response, usage);

    return response;
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to generate seed" },
      { status: 500 }
    );
  }
}
