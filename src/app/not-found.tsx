import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4F4F9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 450, padding: "0 24px" }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(to bottom, rgba(212,175,55,0.3), rgba(212,175,55,0.05))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 24,
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0B1F3F",
              marginBottom: 12,
            }}
          >
            الصفحة مش موجودة
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#2C3E50",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            الصفحة اللي بتدور عليها مش موجودة أو تم نقلها.
          </p>
          <Link
            href="/ar"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "#D4AF37",
              color: "#0B1F3F",
              fontWeight: 700,
              borderRadius: 12,
              textDecoration: "none",
              fontSize: 16,
            }}
          >
            العودة للرئيسية
          </Link>
        </div>
      </body>
    </html>
  );
}
