import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { clearBlogCache } from "@/lib/db-blog";
import { rm } from "fs/promises";
import path from "path";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const updateData: Record<string, unknown> = {};
    const allowedFields = [
      "title",
      "titleEn",
      "excerpt",
      "excerptEn",
      "content",
      "contentEn",
      "category",
      "author",
      "heroImage",
      "readingTime",
      "status",
    ];

    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    if ("tags" in body && Array.isArray(body.tags)) {
      updateData.tags = JSON.stringify(body.tags);
    }
    if ("inlineImages" in body && Array.isArray(body.inlineImages)) {
      updateData.inlineImages = JSON.stringify(body.inlineImages);
    }

    // Handle publishing
    if (body.status === "published") {
      const existing = await prisma.blogPost.findUnique({ where: { id } });
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    clearBlogCache();
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Delete images directory
    try {
      const dir = path.join(process.cwd(), "public", "images", "blog", post.slug);
      await rm(dir, { recursive: true, force: true });
    } catch {
      // Ignore image deletion errors
    }

    await prisma.blogPost.delete({ where: { id } });
    clearBlogCache();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
