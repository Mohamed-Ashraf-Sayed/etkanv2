import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    todayViews,
    weekViews,
    monthViews,
    todayUnique,
    weekUnique,
    monthUnique,
    topPages,
    dailyViews,
  ] = await Promise.all([
    // Total views
    prisma.pageView.count({ where: { createdAt: { gte: today } } }),
    prisma.pageView.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: monthAgo } } }),
    // Unique visitors (by sessionId)
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: today } },
    }).then((r) => r.length),
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: weekAgo } },
    }).then((r) => r.length),
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: monthAgo } },
    }).then((r) => r.length),
    // Top pages (last 30 days)
    prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: monthAgo } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    // Daily views for last 7 days
    prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT DATE(createdAt) as date, COUNT(*) as count
      FROM PageView
      WHERE createdAt >= ${weekAgo}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    `,
  ]);

  return NextResponse.json({
    today: { views: todayViews, unique: todayUnique },
    week: { views: weekViews, unique: weekUnique },
    month: { views: monthViews, unique: monthUnique },
    topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
    dailyViews: dailyViews.map((d) => ({
      date: d.date,
      count: Number(d.count),
    })),
  });
}
