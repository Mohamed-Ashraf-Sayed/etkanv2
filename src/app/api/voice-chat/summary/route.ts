import { sendTelegramMessage } from "@/lib/telegram";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Arabic/English number words → digits
const numberWords: Record<string, string> = {
  // Arabic
  "صفر": "0", "زيرو": "0", "سيرو": "0",
  "واحد": "1", "واحده": "1",
  "اتنين": "2", "اثنين": "2", "اثنان": "2",
  "تلاتة": "3", "ثلاثة": "3", "تلاته": "3", "تلات": "3",
  "أربعة": "4", "اربعة": "4", "اربعه": "4", "أربع": "4", "اربع": "4",
  "خمسة": "5", "خمسه": "5", "خمس": "5",
  "ستة": "6", "سته": "6", "ست": "6",
  "سبعة": "7", "سبعه": "7", "سبع": "7",
  "ثمانية": "8", "تمانية": "8", "تمانيه": "8", "تماني": "8", "تمنية": "8", "ثمانيه": "8",
  "تسعة": "9", "تسعه": "9", "تسع": "9",
  "عشرة": "10", "عشره": "10", "عشر": "10",
  // English
  "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
  "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10",
};

// Convert spoken number words to digits, then fix separated digits
function fixPhoneNumbers(text: string): string {
  // Step 1: Convert Arabic/English number words to digits
  let result = text;
  const wordsPattern = Object.keys(numberWords)
    .sort((a, b) => b.length - a.length) // longest first
    .join("|");
  result = result.replace(
    new RegExp(`(${wordsPattern})`, "gi"),
    (match) => numberWords[match.toLowerCase()] || numberWords[match] || match
  );

  // Step 2: Collapse sequences of digits separated by spaces/dashes/dots
  result = result.replace(
    /\b(\d[\s\-\.]+){6,}\d\b/g,
    (match) => match.replace(/[\s\-\.]+/g, "")
  );

  // Step 3: Also collapse digits that are just space-separated (after word conversion)
  result = result.replace(
    /(?<!\d)(\d{1,2}\s+){5,}\d{1,2}(?!\d)/g,
    (match) => match.replace(/\s+/g, "")
  );

  return result;
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`voice-summary:${ip}`, 10, 5 * 60 * 1000);
  if (!allowed) {
    return new Response("Too many requests", { status: 429 });
  }

  try {
    const { messages, duration } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length < 2) {
      return new Response("No conversation to summarize", { status: 400 });
    }

    // Format duration
    const mins = Math.floor((duration || 0) / 60);
    const secs = (duration || 0) % 60;
    const durationStr = `${mins}:${secs.toString().padStart(2, "0")}`;

    // Build conversation text — fix phone numbers
    const conversationLines = messages
      .map((m: { role: string; content: string }) => {
        const label = m.role === "user" ? "👤 العميل" : "🤖 سارة";
        return `${label}: ${fixPhoneNumbers(m.content)}`;
      })
      .join("\n");

    // Try to extract phone number from conversation
    const allText = messages.map((m: { content: string }) => fixPhoneNumbers(m.content)).join(" ");
    const phoneMatch = allText.match(/(?:01[0125]\d{8}|(?:\+?2)?01[0125]\d{8})/);
    const phoneInfo = phoneMatch ? `\n📱 رقم العميل: <code>${phoneMatch[0]}</code>` : "";

    const telegramMessage = `📞 <b>مكالمة صوتية جديدة — AI Voice Call</b>
⏱ المدة: ${durationStr}
💬 عدد الرسائل: ${messages.length}${phoneInfo}

━━━━━━━━━━━━━━━━━━
${conversationLines}
━━━━━━━━━━━━━━━━━━

⚡️ <i>تم إرسالها تلقائياً من المكالمة الصوتية</i>`;

    await sendTelegramMessage(telegramMessage);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Voice summary error:", error);
    return new Response("Error", { status: 500 });
  }
}
