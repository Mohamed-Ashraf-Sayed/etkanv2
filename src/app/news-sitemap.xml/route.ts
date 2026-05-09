import { getPublishedBlogPosts } from "@/lib/db-blog";
import { blogPosts } from "@/data/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export async function GET() {
  const dbPosts = await getPublishedBlogPosts("ar");
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const allPosts = [
    ...dbPosts,
    ...blogPosts.filter((p) => !dbSlugs.has(p.slug)),
  ];

  // Only articles from the last 2 days qualify for Google News
  const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
  const recentPosts = allPosts.filter((p) => {
    const date = new Date(p.date).getTime();
    return !isNaN(date) && date >= twoDaysAgo;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentPosts
  .map(
    (post) => `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>إتقان للحلول المتكاملة</news:name>
        <news:language>ar</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
