import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 3 attempts per IP per hour
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`seed:${ip}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  try {
    const existing = await prisma.adminUser.count();
    if (existing > 0) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    const { email, password, name } = await req.json();
    const hashed = await hashPassword(password);

    const user = await prisma.adminUser.create({
      data: { email, password: hashed, name },
    });

    return NextResponse.json({
      success: true,
      message: `Admin "${user.name}" created`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}
