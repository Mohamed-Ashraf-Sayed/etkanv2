import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { prisma } from "@/lib/db";
import { clearBlogCache } from "@/lib/db-blog";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface GeneratedArticle {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  category: string;
  tags: string[];
  imagePrompts: string[];
  readingTime: number;
}

const ARTICLE_SYSTEM_PROMPT = `أنت كاتب محتوى تقني محترف لشركة "إتقان للحلول المتكاملة" - شركة برمجيات في مصر والسعودية.

اكتب مقال احترافي بالعربية الفصحى البسيطة (مش عامية) عن الموضوع المطلوب.

المتطلبات:
- العنوان: جذاب، يحتوي على keywords، 50-65 حرف
- المحتوى: 1500-2000 كلمة minimum
- استخدم Markdown headings (## للأقسام الرئيسية، ### للفرعية)
- اكتب مقدمة قوية + 5-8 أقسام + خاتمة
- اذكر شركة "إتقان" بشكل طبيعي 2-3 مرات
- استخدم bullet points و numbered lists
- ضع في الاعتبار الـ SEO (keywords طبيعية، LSI keywords)
- اكتب بأسلوب Egyptian-friendly لكن mostly Modern Standard Arabic

أرجع JSON valid (بدون markdown code fences) بالشكل ده بالظبط:
{
  "slug": "url-friendly-english-slug",
  "title": "العنوان بالعربية",
  "titleEn": "Title in English",
  "excerpt": "ملخص المقال 150-160 حرف",
  "excerptEn": "Excerpt in English 150-160 chars",
  "content": "المحتوى الكامل بـ markdown",
  "contentEn": "Full content in English markdown",
  "category": "تطوير الويب|تطبيقات الموبايل|أنظمة الإدارة|الأمن السيبراني|التحول الرقمي",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "imagePrompts": [
    "Hero image prompt - professional, no text, modern tech style, Arabic-friendly",
    "Inline image 1 prompt - illustrating a key concept",
    "Inline image 2 prompt - showing application or example"
  ],
  "readingTime": 8
}`;

async function generateArticle(topic: string): Promise<GeneratedArticle> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: ARTICLE_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `اكتب مقال شامل عن: ${topic}`,
      },
    ],
  });

  const text = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("");

  // Strip code fences if present
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  return JSON.parse(cleaned) as GeneratedArticle;
}

async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `${prompt}. Professional, modern, clean, no text, no words, suitable for a tech blog hero image. Style: minimalist, corporate, navy blue and gold accents.`,
    n: 1,
    size: "1792x1024",
    quality: "standard",
    response_format: "b64_json",
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data returned");
  return b64;
}

async function saveImage(b64: string, slug: string, idx: number): Promise<string> {
  const buffer = Buffer.from(b64, "base64");
  const dir = path.join(process.cwd(), "public", "images", "blog", slug);
  await mkdir(dir, { recursive: true });
  const filename = `${idx === 0 ? "hero" : `inline-${idx}`}.jpg`;
  await writeFile(path.join(dir, filename), buffer);
  return `/images/blog/${slug}/${filename}`;
}

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (!topic || typeof topic !== "string" || topic.length < 5) {
      return NextResponse.json(
        { error: "Topic is required (min 5 chars)" },
        { status: 400 }
      );
    }

    // 1. Generate article via Claude
    console.log("Generating article for topic:", topic);
    const article = await generateArticle(topic);

    // 2. Check slug uniqueness, suffix if needed
    let finalSlug = article.slug;
    let suffix = 1;
    while (
      await prisma.blogPost.findUnique({ where: { slug: finalSlug } })
    ) {
      finalSlug = `${article.slug}-${suffix}`;
      suffix++;
    }

    // 3. Generate images via DALL-E (sequential to avoid rate limits)
    console.log("Generating images:", article.imagePrompts.length);
    const imagePaths: string[] = [];
    for (let i = 0; i < article.imagePrompts.length; i++) {
      try {
        const b64 = await generateImage(article.imagePrompts[i]);
        const imgPath = await saveImage(b64, finalSlug, i);
        imagePaths.push(imgPath);
      } catch (e) {
        console.error(`Image ${i} generation failed:`, e);
        imagePaths.push("");
      }
    }

    const heroImage = imagePaths[0] || "";
    const inlineImages = imagePaths.slice(1).filter(Boolean);

    // 4. Save to DB as draft
    const post = await prisma.blogPost.create({
      data: {
        slug: finalSlug,
        title: article.title,
        titleEn: article.titleEn,
        excerpt: article.excerpt,
        excerptEn: article.excerptEn,
        content: article.content,
        contentEn: article.contentEn,
        category: article.category,
        tags: JSON.stringify(article.tags),
        heroImage,
        inlineImages: JSON.stringify(inlineImages),
        readingTime: article.readingTime,
        author: "فريق إتقان",
        status: "draft",
      },
    });

    clearBlogCache();

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        heroImage: post.heroImage,
        inlineImages: JSON.parse(post.inlineImages),
        status: post.status,
      },
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
