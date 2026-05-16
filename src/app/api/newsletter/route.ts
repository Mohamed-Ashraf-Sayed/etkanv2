import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email, locale, source } = await req.json();

    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    const userAgent = req.headers.get("user-agent");
    const normalizedEmail = email.toLowerCase().trim();
    const cleanSource = typeof source === "string" ? source : "footer";

    const result = await prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: { active: true },
      create: {
        email: normalizedEmail,
        locale: typeof locale === "string" ? locale : "ar",
        source: cleanSource,
        ipAddress: ip,
        userAgent: userAgent || null,
      },
    });

    const isNew = Math.abs(result.createdAt.getTime() - Date.now()) < 5000;
    if (isNew) {
      await sendTelegramMessage(
        `📧 <b>اشتراك جديد في النشرة</b>\n\n` +
          `<b>البريد:</b> ${normalizedEmail}\n` +
          `<b>المصدر:</b> ${cleanSource}\n` +
          `<b>اللغة:</b> ${result.locale}\n` +
          `<b>IP:</b> ${ip || "—"}`
      ).catch((e) => console.error("Telegram notify failed:", e));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
