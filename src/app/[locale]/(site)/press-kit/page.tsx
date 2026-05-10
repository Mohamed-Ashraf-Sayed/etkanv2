import type { Metadata } from "next";
import { Mail, Phone, Download, Globe } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "الملف الإعلامي - Press Kit | إتقان للحلول المتكاملة",
  description:
    "ملف إعلامي شامل لشركة إتقان: لوجو، صور، معلومات، إحصائيات. للصحفيين والمدونين والشركاء.",
  alternates: getAlternates("/press-kit"),
};

export default function PressKitPage() {
  const schema = getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "Press Kit", url: `${BASE_URL}/press-kit` },
  ]);

  const facts = [
    { value: "+200", label: "مشروع ناجح" },
    { value: "+75", label: "عميل" },
    { value: "+30", label: "مهندس" },
    { value: "+6", label: "سنوات خبرة" },
    { value: "5", label: "دول" },
    { value: "4.9/5", label: "تقييم العملاء" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb items={[{ label: "Press Kit" }]} />
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold">للصحفيين والمدونين</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-4">
              الملف الإعلامي
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-lg text-white/60 font-cairo leading-relaxed">
              كل اللي تحتاجه عن إتقان للحلول المتكاملة في مكان واحد. لوجو، صور،
              إحصائيات، ومعلومات الاتصال.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <div className="max-w-5xl mx-auto space-y-12">
            {/* About */}
            <div>
              <h2 className="text-h2 font-bold font-cairo text-text-primary mb-4">
                عن إتقان
              </h2>
              <p className="text-text-secondary font-cairo text-lg leading-relaxed mb-4">
                <strong>إتقان للحلول المتكاملة</strong> شركة برمجيات مصرية
                تأسست سنة 2020، متخصصة في تطوير المواقع، التطبيقات، أنظمة ERP و
                CRM، تجهيز البنية التحتية، والدعم الفني.
              </p>
              <p className="text-text-secondary font-cairo text-lg leading-relaxed">
                نخدم أكثر من 75 شركة في مصر، السعودية، الإمارات، قطر، والكويت.
                فريقنا من 30+ مهندس ومصمم يعمل على بناء حلول تقنية تساعد
                الشركات على النمو والتحول الرقمي.
              </p>
            </div>

            {/* Facts */}
            <div>
              <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
                إحصائيات سريعة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {facts.map((f, i) => (
                  <div
                    key={i}
                    className="text-center p-5 rounded-xl bg-surface border border-border"
                  >
                    <div className="text-2xl md:text-3xl font-black font-cairo text-accent mb-1">
                      {f.value}
                    </div>
                    <div className="text-xs text-text-muted font-cairo">
                      {f.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Downloads */}
            <div>
              <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
                اللوجو والـ Brand Assets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-surface border border-border">
                  <div className="bg-navy rounded-xl p-8 mb-4 text-center">
                    <img
                      src="/logo.png"
                      alt="Etqan Logo"
                      className="h-16 mx-auto brightness-0 invert"
                    />
                  </div>
                  <h3 className="font-bold font-cairo text-text-primary mb-2">
                    لوجو أبيض (Light)
                  </h3>
                  <p className="text-sm text-text-muted font-cairo mb-4">
                    استخدمه على خلفيات داكنة
                  </p>
                  <a
                    href="/logo.png"
                    download
                    className="inline-flex items-center gap-2 text-accent font-bold font-cairo text-sm"
                  >
                    <Download className="w-4 h-4" />
                    تحميل PNG
                  </a>
                </div>
                <div className="p-6 rounded-2xl bg-surface border border-border">
                  <div className="bg-white rounded-xl p-8 mb-4 text-center">
                    <img
                      src="/logo.png"
                      alt="Etqan Logo"
                      className="h-16 mx-auto"
                    />
                  </div>
                  <h3 className="font-bold font-cairo text-text-primary mb-2">
                    لوجو ملون (Light bg)
                  </h3>
                  <p className="text-sm text-text-muted font-cairo mb-4">
                    استخدمه على خلفيات فاتحة
                  </p>
                  <a
                    href="/logo.png"
                    download
                    className="inline-flex items-center gap-2 text-accent font-bold font-cairo text-sm"
                  >
                    <Download className="w-4 h-4" />
                    تحميل PNG
                  </a>
                </div>
              </div>
            </div>

            {/* Brand Colors */}
            <div>
              <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
                ألوان الـ Brand
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Navy", hex: "#0B1F3F", bg: "bg-[#0B1F3F]" },
                  { name: "Gold", hex: "#D4AF37", bg: "bg-[#D4AF37]" },
                  { name: "Light", hex: "#F4F4F9", bg: "bg-[#F4F4F9]" },
                  { name: "Accent", hex: "#1A3B70", bg: "bg-[#1A3B70]" },
                ].map((color, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-border"
                  >
                    <div className={`${color.bg} h-24`} />
                    <div className="p-4">
                      <h4 className="font-bold font-cairo text-text-primary">
                        {color.name}
                      </h4>
                      <p className="text-xs text-text-muted font-mono">
                        {color.hex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl bg-surface border border-border p-8">
              <h2 className="text-h2 font-bold font-cairo text-text-primary mb-6">
                للاستفسارات الإعلامية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Mail className="w-6 h-6 text-accent mb-2" />
                  <p className="text-xs text-text-muted font-cairo mb-1">
                    الإيميل
                  </p>
                  <a
                    href="mailto:info@etqanly.com"
                    className="font-bold font-cairo text-text-primary hover:text-accent"
                    dir="ltr"
                  >
                    info@etqanly.com
                  </a>
                </div>
                <div>
                  <Phone className="w-6 h-6 text-accent mb-2" />
                  <p className="text-xs text-text-muted font-cairo mb-1">
                    الهاتف
                  </p>
                  <a
                    href="tel:+201094807674"
                    className="font-bold font-cairo text-text-primary hover:text-accent"
                    dir="ltr"
                  >
                    +20 109 480 7674
                  </a>
                </div>
                <div>
                  <Globe className="w-6 h-6 text-accent mb-2" />
                  <p className="text-xs text-text-muted font-cairo mb-1">
                    الموقع
                  </p>
                  <a
                    href="https://etqanly.com"
                    className="font-bold font-cairo text-text-primary hover:text-accent"
                    dir="ltr"
                  >
                    etqanly.com
                  </a>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <Button href="/contact" variant="gold">
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
