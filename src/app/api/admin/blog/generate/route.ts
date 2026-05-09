import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { prisma } from "@/lib/db";
import { clearBlogCache } from "@/lib/db-blog";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

let _anthropic: Anthropic | null = null;
let _openai: OpenAI | null = null;

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _anthropic;
}

function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

interface GeneratedArticle {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  tldr?: string;
  content: string;
  contentEn: string;
  category: string;
  tags: string[];
  faqs?: { question: string; answer: string }[];
  imagePrompts: string[];
  readingTime: number;
}

const ARTICLE_SYSTEM_PROMPT = `أنت كاتب محتوى SEO محترف لشركة "إتقان للحلول المتكاملة" - شركة برمجيات في مصر والسعودية.

اكتب مقال احترافي محسن لـ Google AI Overviews و Featured Snippets.

📋 متطلبات المحتوى:
- العنوان: جذاب، يحتوي keyword أساسي في أول 30 حرف، 50-65 حرف total
- المحتوى: 1800-2500 كلمة (long-form بيرتب أعلى)
- ابدأ بـ TL;DR (ملخص في 50 كلمة) في أول الـ content
- استخدم Markdown: ## للأقسام، ### للفرعية
- مقدمة 80-120 كلمة تجاوب السؤال في أول جملة
- 6-9 أقسام H2 + H3 subsections
- جمل قصيرة (15-20 كلمة) للـ AI Overviews
- بيانات وأرقام حقيقية (مثل: "زاد بنسبة 40% حسب McKinsey 2025")
- اذكر شركة "إتقان" بشكل طبيعي 2-3 مرات (مش spam)
- الخاتمة: CTA واضح للاستشارة

🎯 SEO requirements:
- استخدم primary keyword في: title, first paragraph, H2, H3, meta description, last paragraph
- LSI keywords (synonyms) خلال المقال
- Internal linking opportunities (سنضيفهم تلقائياً)
- اللغة: عربية فصحى بسيطة + بعض المصطلحات الإنجليزية حسب السياق

أرجع JSON valid (بدون markdown code fences):
{
  "slug": "url-friendly-english-slug",
  "title": "العنوان بالعربية",
  "titleEn": "Title in English (60-70 chars)",
  "excerpt": "ملخص جذاب 150-160 حرف يحتوي keyword",
  "excerptEn": "Compelling excerpt 150-160 chars in English",
  "tldr": "ملخص سريع للقراء المستعجلين، 40-60 كلمة، يجاوب السؤال الرئيسي مباشرة",
  "content": "المحتوى الكامل بـ markdown، يبدأ بمقدمة قوية، يحتوي 6-9 أقسام H2 مع H3 subsections",
  "contentEn": "Full English content in markdown",
  "category": "تطوير الويب|تطبيقات الموبايل|أنظمة الإدارة|الأمن السيبراني|التحول الرقمي|التسويق الرقمي",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "faqs": [
    { "question": "سؤال شائع 1", "answer": "إجابة 30-50 كلمة" },
    { "question": "سؤال شائع 2", "answer": "إجابة 30-50 كلمة" },
    { "question": "سؤال شائع 3", "answer": "إجابة 30-50 كلمة" },
    { "question": "سؤال شائع 4", "answer": "إجابة 30-50 كلمة" },
    { "question": "سؤال شائع 5", "answer": "إجابة 30-50 كلمة" }
  ],
  "imagePrompts": [
    "Hero image: detailed prompt for editorial cover. Professional 3D rendering style, navy blue and gold color scheme. Include relevant icons, text labels, charts. Should match the article topic exactly.",
    "Inline image 1: explanatory diagram or infographic with labels showing key concept",
    "Inline image 2: practical example or scenario visualization"
  ],
  "readingTime": 9
}

⚠️ مهم: اجعل الـ FAQs مبنية على أسئلة Google's 'People Also Ask' الفعلية.`;

async function generateArticle(topic: string): Promise<GeneratedArticle> {
  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
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

  // Strip code fences and extract JSON object
  let cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // Find first { and last } to extract just the JSON
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned) as GeneratedArticle;
  } catch (e) {
    console.error("JSON parse failed. Length:", cleaned.length);
    console.error("Last 500 chars:", cleaned.slice(-500));
    throw new Error(
      `Failed to parse article JSON: ${e instanceof Error ? e.message : "unknown"}`
    );
  }
}

async function generateImage(prompt: string): Promise<string> {
  const response = await getOpenAI().images.generate({
    model: "gpt-image-2",
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

async function saveImage(b64: string, slug: string, idx: number): Promise<string> {
  const buffer = Buffer.from(b64, "base64");
  const dir = path.join(process.cwd(), "data", "uploads", "blog", slug);
  await mkdir(dir, { recursive: true });
  const filename = `${idx === 0 ? "hero" : `inline-${idx}`}.jpg`;
  await writeFile(path.join(dir, filename), buffer);
  return `/api/uploads/blog/${slug}/${filename}`;
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

    // Build enhanced content with TL;DR + FAQ
    let enhancedContent = "";
    if (article.tldr) {
      enhancedContent += `> **الملخص السريع:** ${article.tldr}\n\n`;
    }
    enhancedContent += article.content;

    // Insert inline images at strategic positions in content
    if (inlineImages.length > 0) {
      const sections = enhancedContent.split(/(?=^## )/m);
      if (sections.length > 3 && inlineImages[0]) {
        sections.splice(
          2,
          0,
          `![صورة توضيحية](${inlineImages[0]})\n\n`
        );
      }
      if (sections.length > 5 && inlineImages[1]) {
        sections.splice(
          4,
          0,
          `![صورة توضيحية](${inlineImages[1]})\n\n`
        );
      }
      enhancedContent = sections.join("");
    }

    // Add FAQ section
    if (article.faqs && article.faqs.length > 0) {
      enhancedContent += `\n\n## الأسئلة الشائعة\n\n`;
      for (const faq of article.faqs) {
        enhancedContent += `### ${faq.question}\n\n${faq.answer}\n\n`;
      }
    }

    // 4. Save to DB as draft
    const post = await prisma.blogPost.create({
      data: {
        slug: finalSlug,
        title: article.title,
        titleEn: article.titleEn,
        excerpt: article.excerpt,
        excerptEn: article.excerptEn,
        content: enhancedContent,
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
