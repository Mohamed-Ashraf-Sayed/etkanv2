import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-reset-secret");
  if (secret !== "etqan-reset-temp-2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, password, name } = await req.json();
    const hashed = await hashPassword(password);

    // Delete all existing admins and create new one
    await prisma.adminUser.deleteMany();
    const user = await prisma.adminUser.create({
      data: { email, password: hashed, name },
    });

    return NextResponse.json({
      success: true,
      message: `Admin "${user.name}" created with email: ${user.email}`,
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json({ error: "Failed to reset" }, { status: 500 });
  }
}
