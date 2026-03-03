import { rateLimit, getClientIp } from "@/lib/rate-limit";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`tts:${ip}`, 60, 5 * 60 * 1000);
  if (!allowed) {
    return new Response("Too many requests", { status: 429 });
  }

  try {
    const { text, locale } = await req.json();

    if (!text || typeof text !== "string" || text.length > 1000) {
      return new Response("Invalid text", { status: 400 });
    }

    const clean = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/https?:\/\/\S+/g, "")
      .trim();

    if (!clean) {
      return new Response("Empty text", { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: clean,
        voice: "shimmer",
        response_format: "opus",
        speed: 1.2,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI TTS error:", response.status, err);
      return new Response("TTS failed", { status: 500 });
    }

    // Buffer the full audio
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "audio/ogg",
        "Content-Length": String(arrayBuffer.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return new Response("TTS failed", { status: 500 });
  }
}
