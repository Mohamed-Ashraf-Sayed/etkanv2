import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function getClientIP(req: NextRequest): string {
  // Check common proxy headers
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export async function POST(req: NextRequest) {
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
