import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `أنت خبير تقني في شركة إتقان للحلول المتكاملة. مهمتك تحلل وصف المشروع اللي العميل بيكتبه وتطلع خطة مشروع مبسطة.

لازم ترد بـ JSON فقط (بدون أي نص تاني) بالشكل ده:
{
  "projectName": "اسم مقترح للمشروع (عربي قصير)",
  "projectNameEn": "Suggested project name (English short)",
  "type": "website" | "ecommerce" | "mobile" | "system" | "other",
  "phases": [
    { "name": "اسم المرحلة", "duration": "2 أسابيع", "tasks": ["مهمة 1", "مهمة 2", "مهمة 3"] }
  ],
  "techStack": ["React", "Next.js", "Node.js"],
  "estimatedWeeks": 8,
  "budgetRange": { "min": 15000, "max": 30000, "currency": "EGP" },
  "teamSize": 3,
  "features": ["ميزة 1", "ميزة 2", "ميزة 3"],
  "risks": ["مخاطرة 1"],
  "summary": "ملخص قصير للمشروع في جملتين",
  "canBeWordPress": true,
  "wordPressOption": {
    "recommended": true,
    "estimatedWeeks": 4,
    "budgetRange": { "min": 8000, "max": 15000, "currency": "EGP" },
    "techStack": ["WordPress", "Elementor", "WooCommerce"],
    "pros": ["أسرع في التنفيذ", "أسهل في الإدارة"],
    "cons": ["محدود في التخصيص", "أبطأ في الأداء"],
    "description": "ملخص قصير ليه WordPress مناسب أو مش مناسب"
  }
}

قواعد مهمة:
- الـ phases لازم تكون 3-5 مراحل (دي للبرمجة الخاصة)
- الـ techStack لازم تكون تقنيات حقيقية ومناسبة
- الـ budget لازم يكون واقعي بالجنيه المصري
- الـ features لازم تكون 4-6 ميزات
- الـ risks لازم تكون 1-2 مخاطرة
- كل الردود بالعربي ماعدا أسماء التقنيات والـ projectNameEn
- canBeWordPress = true لو المشروع ممكن يتعمل بـ WordPress (مواقع، متاجر، مدونات، مواقع شركات)
- canBeWordPress = false لو المشروع محتاج برمجة خاصة بس (تطبيقات موبايل، أنظمة معقدة، APIs خاصة)
- لو canBeWordPress = true، لازم تملا wordPressOption بالكامل مع مقارنة واقعية
- لو canBeWordPress = false، wordPressOption يكون null
- wordPressOption.recommended = true لو WordPress أفضل للمشروع ده
- الـ pros و cons لازم يكونوا 2-3 نقاط واقعية
- رد بـ JSON فقط، بدون أي كلام قبله أو بعده`;

const SYSTEM_PROMPT_EN = `You are a technical expert at Etqan IT Solutions. Your job is to analyze the project description and output a simplified project plan.

You MUST respond with JSON only (no other text) in this format:
{
  "projectName": "اسم المشروع بالعربي",
  "projectNameEn": "Project name in English",
  "type": "website" | "ecommerce" | "mobile" | "system" | "other",
  "phases": [
    { "name": "Phase name", "duration": "2 weeks", "tasks": ["Task 1", "Task 2", "Task 3"] }
  ],
  "techStack": ["React", "Next.js", "Node.js"],
  "estimatedWeeks": 8,
  "budgetRange": { "min": 15000, "max": 30000, "currency": "EGP" },
  "teamSize": 3,
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "risks": ["Risk 1"],
  "summary": "Short 2-sentence project summary",
  "canBeWordPress": true,
  "wordPressOption": {
    "recommended": true,
    "estimatedWeeks": 4,
    "budgetRange": { "min": 8000, "max": 15000, "currency": "EGP" },
    "techStack": ["WordPress", "Elementor", "WooCommerce"],
    "pros": ["Faster to build", "Easy to manage"],
    "cons": ["Limited customization", "Slower performance"],
    "description": "Short summary of why WordPress is or isn't suitable"
  }
}

Important rules:
- phases must be 3-5 phases (these are for custom development)
- techStack must be real, suitable technologies
- budget must be realistic in EGP (Egyptian Pounds)
- features must be 4-6 features
- risks must be 1-2 risks
- canBeWordPress = true if the project can be built with WordPress (websites, stores, blogs, corporate sites)
- canBeWordPress = false if the project needs only custom development (mobile apps, complex systems, custom APIs)
- If canBeWordPress = true, fill wordPressOption completely with realistic comparison
- If canBeWordPress = false, wordPressOption should be null
- wordPressOption.recommended = true if WordPress is the better choice for this project
- pros and cons must be 2-3 realistic points each
- Respond with JSON only, no text before or after`;

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const { allowed, resetIn } = rateLimit(`scope:${ip}`, 10, 10 * 60 * 1000);
  if (!allowed) {
    return Response.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } }
    );
  }

  try {
    const { description, locale } = await req.json();

    if (!description || typeof description !== "string" || description.length < 10) {
      return Response.json({ error: "Description too short" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT,
      messages: [{ role: "user", content: description }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "Failed to parse response" }, { status: 500 });
    }

    const scope = JSON.parse(jsonMatch[0]);
    return Response.json(scope);
  } catch (error) {
    console.error("Scope API error:", error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
