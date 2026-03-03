import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const where: Record<string, string> = {};
  if (status) where.status = status;

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Build CSV with BOM for Arabic support in Excel
  const BOM = "\uFEFF";
  const headers = [
    "الاسم",
    "البريد",
    "الهاتف",
    "النوع",
    "الحالة",
    "نوع الخدمة",
    "الشركة",
    "الميزانية",
    "الجدول الزمني",
    "التاريخ المطلوب",
    "الفترة",
    "ملاحظات",
    "الوصف",
    "تاريخ الإنشاء",
  ];

  const statusMap: Record<string, string> = {
    pending: "في الانتظار",
    confirmed: "مؤكد",
    completed: "مكتمل",
    cancelled: "ملغي",
  };

  const typeMap: Record<string, string> = {
    consultation: "استشارة",
    quote: "عرض سعر",
  };

  const escapeCSV = (val: string | null | undefined) => {
    if (!val) return "";
    const escaped = val.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = bookings.map((b) =>
    [
      escapeCSV(b.name),
      escapeCSV(b.email),
      escapeCSV(b.phone),
      escapeCSV(typeMap[b.type] || b.type),
      escapeCSV(statusMap[b.status] || b.status),
      escapeCSV(b.serviceType),
      escapeCSV(b.company),
      escapeCSV(b.budget),
      escapeCSV(b.timeline),
      escapeCSV(b.date),
      escapeCSV(b.timeSlot),
      escapeCSV(b.notes),
      escapeCSV(b.description),
      escapeCSV(new Date(b.createdAt).toLocaleDateString("ar-EG")),
    ].join(",")
  );

  const csv = BOM + headers.map((h) => escapeCSV(h)).join(",") + "\n" + rows.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bookings-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
