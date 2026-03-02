import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (category) where.category = category;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { displayOrder: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return NextResponse.json({
    projects,
    total,
    pages: Math.ceil(total / limit),
    page,
  });
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // Generate slug from title if not provided
    if (!data.slug) {
      const base = (data.titleEn || data.title || "project")
        .toLowerCase()
        .replace(/[^\w\s\u0621-\u064A-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      data.slug = base || `project-${Date.now().toString(36)}`;
    }

    // Ensure JSON fields are strings
    const jsonFields = ["results", "resultsEn", "tags", "tagsEn", "testimonial", "testimonialEn", "techStack", "images"];
    for (const field of jsonFields) {
      if (data[field] && typeof data[field] !== "string") {
        data[field] = JSON.stringify(data[field]);
      }
    }

    const project = await prisma.project.create({
      data: {
        slug: data.slug,
        category: data.category || "website",
        title: data.title,
        titleEn: data.titleEn || "",
        client: data.client || "",
        clientEn: data.clientEn || "",
        industry: data.industry || "",
        industryEn: data.industryEn || "",
        summary: data.summary || "",
        summaryEn: data.summaryEn || "",
        description: data.description || "",
        descriptionEn: data.descriptionEn || "",
        problem: data.problem || "",
        problemEn: data.problemEn || "",
        solution: data.solution || "",
        solutionEn: data.solutionEn || "",
        results: data.results || "[]",
        resultsEn: data.resultsEn || "[]",
        tags: data.tags || "[]",
        tagsEn: data.tagsEn || "[]",
        testimonial: data.testimonial || "{}",
        testimonialEn: data.testimonialEn || "{}",
        techStack: data.techStack || "[]",
        thumbnail: data.thumbnail || "",
        images: data.images || "[]",
        duration: data.duration || "",
        durationEn: data.durationEn || "",
        year: data.year || new Date().getFullYear().toString(),
        displayOrder: data.displayOrder || 0,
        isActive: data.isActive !== false,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حصل خطأ في إنشاء المشروع" },
      { status: 500 }
    );
  }
}
