import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

function getClientIP(req: NextRequest): string {
  return getClientIp(req.headers);
}

export async function POST(req: NextRequest) {
  // Rate limit: 60 page views per IP per minute
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`track:${ip}`, 60, 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ ok: true }); // Silent drop
  }

  try {
    const { path, referrer, sessionId } = await req.json();

    if (!path || !sessionId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") || undefined;
    const ip = getClientIP(req);

    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent,
        ip,
        sessionId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
