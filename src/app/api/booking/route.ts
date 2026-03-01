import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendTelegramMessage } from "@/lib/telegram";
import { prisma } from "@/lib/db";
import {
  buildAdminEmailHtml,
  buildClientEmailHtml,
  buildTelegramBookingMessage,
} from "@/lib/email-templates";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";

    // 1. Send admin notification email
    const resend = getResend();
    if (resend && adminEmail) {
      const subject =
        data.type === "consultation"
          ? `حجز استشارة جديد - ${data.name}`
          : `طلب عرض سعر جديد - ${data.name}`;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject,
        html: buildAdminEmailHtml(data),
      });

      // 2. Send client confirmation email
      if (data.email) {
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject:
            data.type === "consultation"
              ? "تأكيد حجز موعدك - إتقان للحلول البرمجية"
              : "استلمنا طلبك - إتقان للحلول البرمجية",
          html: buildClientEmailHtml(data),
        });
      }
    }

    // 3. Send Telegram notification
    await sendTelegramMessage(buildTelegramBookingMessage(data));

    // 4. Save to database
    try {
      await prisma.booking.create({
        data: {
          type: data.type,
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date || null,
          timeSlot: data.timeSlot || null,
          serviceType: data.serviceType || null,
          notes: data.notes || null,
          services: data.serviceCategories
            ? JSON.stringify(data.serviceCategories)
            : null,
          features: data.features ? JSON.stringify(data.features) : null,
          budget: data.budgetRange || null,
          timeline: data.timeline || null,
          company: data.companyName || null,
          description: data.projectDescription || null,
        },
      });
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "حصل خطأ، حاول تاني" },
      { status: 500 }
    );
  }
}
