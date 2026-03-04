import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "إتقان للحلول المتكاملة | Etqan IT Solutions",
    short_name: "إتقان",
    description:
      "شريكك التقني الموثوق لتطوير المواقع والتطبيقات، الأنظمة الداخلية، تجهيز البنية التحتية، والدعم الفني.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1628",
    theme_color: "#0A1628",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
