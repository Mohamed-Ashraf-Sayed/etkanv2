import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Use localhost to avoid nginx timeout for long-running generation
const INTERNAL_URL = "http://localhost:3000";

// Generate one article in background and continue with the next
async function processBatch(topics: string[], jobId: string) {
  for (const topic of topics) {
    try {
      // Call the existing generate endpoint via localhost (bypass nginx)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8 * 60 * 1000); // 8 min
      const res = await fetch(`${INTERNAL_URL}/api/admin/blog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error(
          `Batch ${jobId}: failed for "${topic}"`,
          res.status,
          text.slice(0, 200)
        );
      } else {
        console.log(`Batch ${jobId}: completed "${topic}"`);
      }
    } catch (e) {
      console.error(
        `Batch ${jobId}: error for "${topic}"`,
        e instanceof Error ? e.message : e
      );
    }
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 2000));
  }
}

export async function POST(req: Request) {
  try {
    const { topics } = await req.json();

    if (!Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: "topics must be a non-empty array" },
        { status: 400 }
      );
    }

    const validTopics = topics
      .map((t) => String(t).trim())
      .filter((t) => t.length >= 5)
      .slice(0, 30); // Max 30 per batch

    if (validTopics.length === 0) {
      return NextResponse.json(
        { error: "No valid topics (min 5 chars each)" },
        { status: 400 }
      );
    }

    const jobId = `batch-${Date.now()}`;

    // Fire and forget - process in background
    processBatch(validTopics, jobId).catch((e) =>
      console.error(`Batch ${jobId} crashed:`, e)
    );

    return NextResponse.json({
      success: true,
      jobId,
      total: validTopics.length,
      message: `Processing ${validTopics.length} articles in background. Check the blog list to see progress.`,
    });
  } catch (error) {
    console.error("Batch error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
