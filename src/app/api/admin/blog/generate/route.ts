import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateAndSaveArticle } from "@/lib/blog-generator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (!topic || typeof topic !== "string" || topic.length < 5) {
      return NextResponse.json(
        { error: "Topic is required (min 5 chars)" },
        { status: 400 }
      );
    }

    const result = await generateAndSaveArticle(topic);

    if (!result.success || !result.slug) {
      return NextResponse.json(
        { error: result.error || "Generation failed" },
        { status: 500 }
      );
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug: result.slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post created but not retrievable" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        heroImage: post.heroImage,
        inlineImages: JSON.parse(post.inlineImages || "[]"),
        status: post.status,
      },
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
