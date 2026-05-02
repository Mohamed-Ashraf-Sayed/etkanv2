import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/db";
import { clearBlogCache } from "@/lib/db-blog";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
}

async function generateImage(prompt: string): Promise<string> {
  const response = await getOpenAI().images.generate({
    model: "gpt-image-1",
    prompt: `${prompt}

STYLE REQUIREMENTS:
- Highly professional, premium editorial quality
- Modern tech/business illustration suitable for a corporate blog
- Color palette: deep navy blue (#0B1F3F), gold (#D4AF37), white, with subtle accent colors
- Clean, polished, magazine-quality composition
- Sharp details, professional lighting, depth and dimension
- Can include relevant Arabic/English text labels, icons, or annotations to enhance the message
- 3D rendered or high-quality vector style preferred
- No watermarks, no stock photo look`,
    n: 1,
    size: "1536x1024",
    quality: "high",
  });
  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data returned");
  return b64;
}

async function saveImage(b64: string, slug: string, type: "hero" | "inline", idx?: number): Promise<string> {
  const buffer = Buffer.from(b64, "base64");
  const dir = path.join(process.cwd(), "data", "uploads", "blog", slug);
  await mkdir(dir, { recursive: true });
  // Use timestamp to bust browser cache
  const ts = Date.now();
  const filename = type === "hero" ? `hero-${ts}.jpg` : `inline-${idx}-${ts}.jpg`;
  await writeFile(path.join(dir, filename), buffer);
  return `/api/uploads/blog/${slug}/${filename}`;
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const { prompt, target, index } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.length < 5) {
      return NextResponse.json(
        { error: "Prompt is required (min 5 chars)" },
        { status: 400 }
      );
    }
    if (target !== "hero" && target !== "inline") {
      return NextResponse.json({ error: "Invalid target" }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const b64 = await generateImage(prompt);
    const imagePath = await saveImage(
      b64,
      post.slug,
      target,
      typeof index === "number" ? index : 0
    );

    const updateData: { heroImage?: string; inlineImages?: string } = {};
    if (target === "hero") {
      updateData.heroImage = imagePath;
    } else {
      const inline = JSON.parse(post.inlineImages || "[]") as string[];
      const idx = typeof index === "number" ? index : inline.length;
      inline[idx] = imagePath;
      updateData.inlineImages = JSON.stringify(inline);
    }

    await prisma.blogPost.update({ where: { id }, data: updateData });
    clearBlogCache();

    return NextResponse.json({ success: true, imagePath });
  } catch (error) {
    console.error("Regenerate image error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
