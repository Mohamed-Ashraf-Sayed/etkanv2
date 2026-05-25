import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Soft 404s: blog taxonomy root URLs were being caught by /blog/[slug]
      // and rendering "post not found" with HTTP 200. Send Google to /blog
      // with a clean 308 instead.
      { source: "/blog/tag", destination: "/blog", permanent: true },
      { source: "/blog/category", destination: "/blog", permanent: true },
      { source: "/blog/author", destination: "/blog", permanent: true },
      { source: "/en/blog/tag", destination: "/en/blog", permanent: true },
      { source: "/en/blog/category", destination: "/en/blog", permanent: true },
      { source: "/en/blog/author", destination: "/en/blog", permanent: true },
      // /tech-radar was an old route that got removed; send to /scope
      { source: "/tech-radar", destination: "/scope", permanent: true },
      { source: "/en/tech-radar", destination: "/en/scope", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
