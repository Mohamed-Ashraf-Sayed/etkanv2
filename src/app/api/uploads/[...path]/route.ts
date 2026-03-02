import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const segments = (await params).path;

    // Security: prevent path traversal
    for (const seg of segments) {
      if (seg.includes("..") || seg.includes("~")) {
        return NextResponse.json({ error: "Invalid path" }, { status: 400 });
      }
    }

    const filePath = path.join(process.cwd(), "data", "uploads", ...segments);

    // Check file exists
    try {
      await stat(filePath);
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const ext = path.extname(filePath).slice(1).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Serve file error:", error);
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 });
  }
}
