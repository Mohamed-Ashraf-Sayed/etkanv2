import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
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
