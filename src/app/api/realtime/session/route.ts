import { rateLimit, getClientIp } from "@/lib/rate-limit";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`realtime:${ip}`, 10, 5 * 60 * 1000);
  if (!allowed) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { locale } = await req.json();

    const instructions =
      locale === "en"
        ? `You are "Sara" — a skilled sales rep at Etqan IT Solutions on a phone call.
Keep responses SHORT — 2-3 sentences max. Confident, warm, persuasive.
FIRST THING: Ask the client their name. Use their name naturally throughout the call — like a real person would.
Don't ask too many questions — understand quickly then sell the value.
Use social proof: "we've done similar projects", "our team specializes in this".
When they need something → tell how Etqan solves it and push toward leaving their number.
When they ask pricing → "Best way is for our team to call you with a proper quote — no commitment".
After understanding their need: "So [name], what's your number so our team can follow up with you?"
When the client gives their number → repeat it back to confirm.
About Etqan: Egyptian software company — websites, mobile apps, management systems. Free consultation. Ongoing support.
This is a phone call — talk naturally, use the client's name, every response should move toward conversion.`
        : `أنتِ "سارة" — سيلز محترفة في شركة إتقان للحلول البرمجية. بتتكلمي في تليفون مع عميل.
اتكلمي عامية مصرية 100%. ردود قصيرة — جملتين تلاتة بالكتير.
أول حاجة: اسألي العميل اسمه إيه. واستخدمي اسمه طول المكالمة بشكل طبيعي — زي ما حد حقيقي بيتكلم.
متسأليش أسئلة كتير — افهمي بسرعة واقنعي.
استخدمي إقناع: "إحنا عملنا مشاريع شبه دي كتير"، "الفريق متخصص في الحتة دي".
لما يقول احتياجه → قوليله إزاي إتقان هتحله ووجهيه يسيب رقمه.
لما يسأل عن أسعار → "أحسن حاجة تسيبلي رقمك والفريق يكلمك ويديك عرض سعر".
بعد ما تفهمي احتياجه: "تمام يا [الاسم]، سيبلي رقمك والفريق هيتواصل معاك"
لما العميل يقولك رقمه → كرريه عليه عشان تتأكدي إنه صح.
عن إتقان: شركة برمجيات مصرية — مواقع، تطبيقات، أنظمة إدارة. استشارة مجانية. دعم مستمر.
ده تليفون — اتكلمي طبيعي، نادي العميل باسمه، كل رد يقرّب العميل للتواصل.`;

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-realtime-1.5",
        voice: "marin",
        instructions,
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: {
          model: "gpt-4o-mini-transcribe",
          language: locale === "en" ? "en" : "ar",
          prompt: locale === "en"
            ? "Phone numbers like 01094807674. Digits: 0 1 2 3 4 5 6 7 8 9 10."
            : "أرقام تليفون مصرية زي 01094807674. صفر واحد اتنين تلاتة أربعة خمسة ستة سبعة تمانية تسعة عشرة.",
        },
        input_audio_noise_reduction: {
          type: "far_field",
        },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
        max_response_output_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Realtime session error:", response.status, err);
      return Response.json({ error: "Failed to create session" }, { status: 500 });
    }

    const data = await response.json();
    return Response.json({
      token: data.client_secret?.value,
      expiresAt: data.client_secret?.expires_at,
    });
  } catch (error) {
    console.error("Realtime session error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
