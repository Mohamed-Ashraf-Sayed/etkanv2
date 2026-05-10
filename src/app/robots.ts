import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "cohere-ai", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Bytespider", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Applebot", allow: "/", disallow: ["/admin/", "/api/"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/admin/", "/api/"] },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/news-sitemap.xml`,
    ],
  };
}
