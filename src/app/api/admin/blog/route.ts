import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        heroImage: true,
        status: true,
        readingTime: true,
        publishedAt: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("List blog posts error:", error);
    return NextResponse.json({ error: "Failed to list posts" }, { status: 500 });
  }
}
