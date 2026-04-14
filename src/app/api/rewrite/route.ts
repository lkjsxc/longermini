import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { cookies } from "next/headers";
import { checkRateLimit, setRateLimitCookie } from "@/utils/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text;
    const model = "gemini-3-flash-preview";

    if (!text || text.length > 10000) {
      return NextResponse.json(
        { error: "Valid text under 10000 characters is required" },
        { status: 400 }
      );
    }

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
    
    const prompt = `Rewrite the following text into a progressively longer, more verbose piece of text with a similar meaning.
    The generated text should be approximately 1.5 times longer than the original text.
    Explicitly avoid adding new information or altering the core meaning. Only expand the existing concepts (e.g., "My stomach hurts" becomes "My internal organs, probably my stomach and intestines, are crying out").
    You MUST output your thoughts first inside <think>...</think> tags, then output ONLY the final rewritten text outside the tags.
    CRITICAL: Keep your thinking phase extremely brief (simulate under 5 seconds of thought).

    Original Text: ${text}

    Response:`;

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
    console.error("Rewrite error:", error);
    return NextResponse.json(
      { error: "Failed to rewrite text" },
      { status: 500 }
    );
  }
}
