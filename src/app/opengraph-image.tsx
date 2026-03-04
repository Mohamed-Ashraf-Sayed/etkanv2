import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "إتقان للحلول المتكاملة | Etqan IT Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A1628 0%, #132240 50%, #0A1628 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "1px solid rgba(212, 175, 55, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "1px solid rgba(212, 175, 55, 0.08)",
          }}
        />

        {/* Company name Arabic */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#FFFFFF",
            marginBottom: "8px",
            display: "flex",
          }}
        >
          إتقان
        </div>

        {/* Subtitle Arabic */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#D4AF37",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          للحلول المتكاملة
        </div>

        {/* English name */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            marginBottom: "40px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Etqan IT Solutions
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            background: "#D4AF37",
            marginBottom: "40px",
          }}
        />

        {/* Services */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {["مواقع", "تطبيقات", "أنظمة إدارة", "بنية تحتية"].map(
            (service) => (
              <div
                key={service}
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#D4AF37",
                  }}
                />
                {service}
              </div>
            )
          )}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "18px",
            color: "rgba(212, 175, 55, 0.6)",
            letterSpacing: "2px",
            display: "flex",
          }}
        >
          etqanly.com
        </div>

        {/* Gold accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
