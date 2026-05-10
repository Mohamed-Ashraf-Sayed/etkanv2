import { NextResponse } from "next/server";
import { generateAndSaveArticle } from "@/lib/blog-generator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

async function processBatch(topics: string[], jobId: string) {
  let success = 0;
  let failed = 0;
  for (const topic of topics) {
    try {
      const result = await generateAndSaveArticle(topic);
      if (result.success) {
        success++;
        console.log(`Batch ${jobId}: ✓ "${topic}" → ${result.slug}`);
      } else {
        failed++;
        console.error(`Batch ${jobId}: ✗ "${topic}" → ${result.error}`);
      }
    } catch (e) {
      failed++;
      console.error(
        `Batch ${jobId}: crashed for "${topic}"`,
        e instanceof Error ? e.message : e
      );
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.log(
    `Batch ${jobId}: done. success=${success}, failed=${failed}, total=${topics.length}`
  );
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
      .slice(0, 30);

    if (validTopics.length === 0) {
      return NextResponse.json(
        { error: "No valid topics (min 5 chars each)" },
        { status: 400 }
      );
    }

    const jobId = `batch-${Date.now()}`;

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
