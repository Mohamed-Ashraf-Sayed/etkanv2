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
    recentVisitors,
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
    // Recent unique visitors with IP (last 50)
    prisma.$queryRaw<Array<{
      ip: string;
      sessionId: string;
      pages: bigint;
      lastPath: string;
      userAgent: string | null;
      firstSeen: Date;
      lastSeen: Date;
    }>>`
      SELECT
        ip,
        sessionId,
        COUNT(*) as pages,
        (SELECT path FROM PageView p2 WHERE p2.sessionId = PageView.sessionId ORDER BY createdAt DESC LIMIT 1) as lastPath,
        (SELECT userAgent FROM PageView p3 WHERE p3.sessionId = PageView.sessionId ORDER BY createdAt DESC LIMIT 1) as userAgent,
        MIN(createdAt) as firstSeen,
        MAX(createdAt) as lastSeen
      FROM PageView
      WHERE createdAt >= ${weekAgo}
      GROUP BY ip, sessionId
      ORDER BY lastSeen DESC
      LIMIT 50
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
    recentVisitors: recentVisitors.map((v) => ({
      ip: v.ip,
      sessionId: v.sessionId,
      pages: Number(v.pages),
      lastPath: v.lastPath,
      device: parseDevice(v.userAgent),
      firstSeen: v.firstSeen,
      lastSeen: v.lastSeen,
    })),
  });
}

function parseDevice(ua: string | null): string {
  if (!ua) return "غير معروف";
  const lower = ua.toLowerCase();
  if (lower.includes("iphone")) return "iPhone";
  if (lower.includes("ipad")) return "iPad";
  if (lower.includes("android")) {
    if (lower.includes("mobile")) return "Android Phone";
    return "Android Tablet";
  }
  if (lower.includes("macintosh")) return "Mac";
  if (lower.includes("windows")) return "Windows";
  if (lower.includes("linux")) return "Linux";
  if (lower.includes("bot") || lower.includes("crawler") || lower.includes("spider")) return "Bot";
  return "غير معروف";
}
