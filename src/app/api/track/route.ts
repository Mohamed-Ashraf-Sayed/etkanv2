import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { path, referrer, sessionId } = await req.json();

    if (!path || !sessionId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") || undefined;

    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent,
        sessionId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
