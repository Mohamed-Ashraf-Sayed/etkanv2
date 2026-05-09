import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

// Generate one article in background and continue with the next
async function processBatch(topics: string[], jobId: string) {
  for (const topic of topics) {
    try {
      // Call the existing generate endpoint internally
      const res = await fetch(`${BASE_URL}/api/admin/blog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) {
        console.error(`Batch ${jobId}: failed for "${topic}"`, res.status);
      } else {
        console.log(`Batch ${jobId}: completed "${topic}"`);
      }
    } catch (e) {
      console.error(`Batch ${jobId}: error for "${topic}"`, e);
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
