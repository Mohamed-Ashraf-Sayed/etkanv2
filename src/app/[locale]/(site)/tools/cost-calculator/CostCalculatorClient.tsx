"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import {
  Globe,
  Smartphone,
  Database,
  CheckCircle2,
  ArrowLeft,
  Calculator,
  Code2,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";

type ProjectType = "website" | "mobile" | "system";
type WebsitePlatform = "custom" | "wordpress";

interface ProjectConfig {
  type: ProjectType;
  websitePlatform: WebsitePlatform;
  complexity: "simple" | "medium" | "complex";
  features: string[];
  pages?: number;
  platforms?: ("ios" | "android")[];
  bilingual: boolean;
  needsHosting: boolean;
  needsMaintenance: boolean;
}

const projectTypes = [
  {
    id: "website" as const,
    name: "موقع إلكتروني",
    icon: Globe,
    description: "موقع شركة، متجر إلكتروني، أو منصة",
    basePriceMin: 5000,
    basePriceMax: 25000,
  },
  {
    id: "mobile" as const,
    name: "تطبيق موبايل",
    icon: Smartphone,
    description: "تطبيق iOS و/أو Android",
    basePriceMin: 60000,
    basePriceMax: 150000,
  },
  {
    id: "system" as const,
    name: "نظام إدارة",
    icon: Database,
    description: "ERP, CRM, نظام مخصص",
    basePriceMin: 80000,
    basePriceMax: 200000,
  },
];

const complexityMultipliers = {
  simple: { min: 1, max: 1.3, label: "بسيط (وظائف أساسية)" },
  medium: { min: 1.5, max: 2.5, label: "متوسط (custom features)" },
  complex: { min: 3, max: 6, label: "معقد (advanced + integrations)" },
};

const websitePlatforms = [
  {
    id: "custom" as const,
    name: "برمجة مخصصة",
    icon: Code2,
    description: "كود مخصص، أداء أعلى، تحكم كامل في كل التفاصيل",
    pros: ["أداء وسرعة أعلى", "أمان أقوى", "قابل للتوسع بلا حدود", "ملكية كاملة للكود"],
    multiplier: { min: 1, max: 1 },
    weekShift: 0,
  },
  {
    id: "wordpress" as const,
    name: "WordPress",
    icon: Zap,
    description: "تنفيذ أسرع، تكلفة أقل، سهل الإدارة بعد التسليم",
    pros: ["أسرع تنفيذ (وقت أقل بـ 40%)", "تكلفة أوفر (~50% أقل)", "سهل التعديل بنفسك", "آلاف الـ Plugins جاهزة"],
    multiplier: { min: 0.5, max: 0.55 },
    weekShift: -3,
  },
];

const websiteFeatures = [
  { id: "ecommerce", name: "متجر إلكتروني (e-commerce)", price: 15000 },
  { id: "blog", name: "مدونة + CMS", price: 5000 },
  { id: "users", name: "حسابات مستخدمين + تسجيل دخول", price: 8000 },
  { id: "payment", name: "بوابات دفع متعددة", price: 7000 },
  { id: "api", name: "API integrations", price: 10000 },
  { id: "analytics", name: "Analytics + Dashboard", price: 8000 },
  { id: "chat", name: "Live chat / chatbot", price: 5000 },
  { id: "multilingual", name: "متعدد اللغات (3+)", price: 10000 },
  { id: "seo", name: "SEO advanced + Schema", price: 5000 },
];

const mobileFeatures = [
  { id: "auth", name: "Authentication + profile", price: 10000 },
  { id: "push", name: "Push notifications", price: 5000 },
  { id: "payment", name: "In-app payments", price: 15000 },
  { id: "maps", name: "Maps + GPS tracking", price: 12000 },
  { id: "chat", name: "Chat / messaging", price: 20000 },
  { id: "social", name: "Social login + sharing", price: 6000 },
  { id: "admin", name: "Admin panel", price: 25000 },
  { id: "analytics", name: "Analytics + reports", price: 10000 },
];

const systemFeatures = [
  { id: "accounting", name: "محاسبة كاملة", price: 30000 },
  { id: "inventory", name: "إدارة مخازن", price: 25000 },
  { id: "hr", name: "إدارة موارد بشرية", price: 25000 },
  { id: "crm", name: "CRM متكامل", price: 35000 },
  { id: "pos", name: "نقاط بيع POS", price: 25000 },
  { id: "reports", name: "تقارير ذكاء أعمال (BI)", price: 20000 },
  { id: "multibranch", name: "Multi-branch / multi-warehouse", price: 30000 },
  { id: "mobile", name: "Mobile app companion", price: 40000 },
];

export default function CostCalculatorClient() {
  const [config, setConfig] = useState<ProjectConfig>({
    type: "website",
    websitePlatform: "custom",
    complexity: "medium",
    features: [],
    pages: 5,
    platforms: ["ios", "android"],
    bilingual: false,
    needsHosting: true,
    needsMaintenance: false,
  });

  const features =
    config.type === "website"
      ? websiteFeatures
      : config.type === "mobile"
      ? mobileFeatures
      : systemFeatures;

  const result = useMemo(() => {
    const projectType = projectTypes.find((p) => p.id === config.type)!;
    const multiplier = complexityMultipliers[config.complexity];

    let baseMin = projectType.basePriceMin * multiplier.min;
    let baseMax = projectType.basePriceMax * multiplier.max;

    // Add feature costs
    const featureCost = config.features.reduce((sum, fId) => {
      const f = features.find((x) => x.id === fId);
      return sum + (f?.price || 0);
    }, 0);

    baseMin += featureCost * 0.7;
    baseMax += featureCost * 1.3;

    // WordPress platform: cheaper but lower customization
    if (config.type === "website" && config.websitePlatform === "wordpress") {
      const platformMultiplier = websitePlatforms.find(
        (p) => p.id === "wordpress"
      )!.multiplier;
      baseMin *= platformMultiplier.min;
      baseMax *= platformMultiplier.max;
    }

    // Mobile platforms multiplier
    if (config.type === "mobile" && config.platforms) {
      const platforms = config.platforms.length;
      if (platforms === 2) {
        baseMin *= 1.5;
        baseMax *= 1.7;
      }
    }

    // Bilingual
    if (config.bilingual) {
      baseMin *= 1.15;
      baseMax *= 1.25;
    }

    // Pages (websites)
    if (config.type === "website" && config.pages && config.pages > 5) {
      const extra = (config.pages - 5) * 1500;
      baseMin += extra * 0.8;
      baseMax += extra * 1.2;
    }

    // Time estimation
    let weeksMin = 4;
    let weeksMax = 8;
    if (config.complexity === "complex") {
      weeksMin = 16;
      weeksMax = 24;
    } else if (config.complexity === "medium") {
      weeksMin = 8;
      weeksMax = 14;
    }
    if (config.type === "mobile") {
      weeksMin += 4;
      weeksMax += 6;
    }
    if (config.type === "system") {
      weeksMin += 6;
      weeksMax += 10;
    }

    // WordPress is faster
    if (config.type === "website" && config.websitePlatform === "wordpress") {
      weeksMin = Math.max(2, weeksMin - 3);
      weeksMax = Math.max(4, weeksMax - 5);
    }

    // Hosting + maintenance
    const monthlyHosting = config.needsHosting ? 800 : 0;
    const monthlyMaintenance = config.needsMaintenance
      ? Math.round(baseMax * 0.02)
      : 0;

    return {
      priceMin: Math.round(baseMin / 100) * 100,
      priceMax: Math.round(baseMax / 100) * 100,
      weeksMin,
      weeksMax,
      monthlyHosting,
      monthlyMaintenance,
    };
  }, [config, features]);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar-EG").format(n);

  const toggleFeature = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Configuration */}
      <div className="lg:col-span-2 space-y-6">
        {/* Project Type */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="font-bold font-cairo text-text-primary mb-4">
            1. نوع المشروع
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {projectTypes.map((t) => {
              const Icon = t.icon;
              const isActive = config.type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setConfig({ ...config, type: t.id, features: [] })
                  }
                  className={`p-5 rounded-xl border-2 text-start transition-all ${
                    isActive
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mb-3 ${
                      isActive ? "text-accent" : "text-text-muted"
                    }`}
                  />
                  <h4 className="font-bold font-cairo text-text-primary text-sm mb-1">
                    {t.name}
                  </h4>
                  <p className="text-xs text-text-muted font-cairo">
                    {t.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Website Platform: Custom vs WordPress */}
        {config.type === "website" && (
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="font-bold font-cairo text-text-primary mb-2">
              2. منصة التطوير
            </h3>
            <p className="text-xs text-text-muted font-cairo mb-4">
              عايز موقعك مبرمج خصيصاً أم تفضّل WordPress الأسرع والأرخص؟
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {websitePlatforms.map((p) => {
                const Icon = p.icon;
                const isActive = config.websitePlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setConfig({ ...config, websitePlatform: p.id })
                    }
                    className={`p-5 rounded-xl border-2 text-start transition-all ${
                      isActive
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon
                        className={`w-7 h-7 ${
                          isActive ? "text-accent" : "text-text-muted"
                        }`}
                      />
                      {p.id === "wordpress" && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-cairo">
                          أوفر ~50%
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold font-cairo text-text-primary text-base mb-1">
                      {p.name}
                    </h4>
                    <p className="text-xs text-text-muted font-cairo mb-3 leading-relaxed">
                      {p.description}
                    </p>
                    <ul className="space-y-1">
                      {p.pros.map((pro, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-xs text-text-secondary font-cairo"
                        >
                          <CheckCircle2
                            className={`w-3 h-3 mt-0.5 shrink-0 ${
                              isActive ? "text-accent" : "text-text-muted/40"
                            }`}
                          />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Complexity */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="font-bold font-cairo text-text-primary mb-4">
            {config.type === "website" ? "3." : "2."} مستوى التعقيد
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              ["simple", "medium", "complex"] as const
            ).map((c) => {
              const isActive = config.complexity === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setConfig({ ...config, complexity: c })}
                  className={`p-4 rounded-xl border-2 transition-all text-sm font-bold font-cairo ${
                    isActive
                      ? "border-accent bg-accent/5 text-text-primary"
                      : "border-border text-text-muted hover:border-accent/30"
                  }`}
                >
                  {complexityMultipliers[c].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="font-bold font-cairo text-text-primary mb-4">
            {config.type === "website" ? "4." : "3."} الميزات المطلوبة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {features.map((f) => {
              const isSelected = config.features.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleFeature(f.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-start ${
                    isSelected
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        isSelected ? "text-accent" : "text-text-muted/30"
                      }`}
                    />
                    <span className="text-sm font-cairo text-text-primary">
                      {f.name}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted font-cairo">
                    +{formatPrice(f.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extras */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-3">
          <h3 className="font-bold font-cairo text-text-primary mb-4">
            {config.type === "website" ? "5." : "4."} خيارات إضافية
          </h3>

          {config.type === "website" && (
            <div className="flex items-center justify-between">
              <label className="font-cairo text-text-primary">
                عدد الصفحات
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={config.pages}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    pages: parseInt(e.target.value) || 5,
                  })
                }
                className="w-20 px-3 py-2 rounded-lg border border-border bg-background text-text-primary text-center font-bold"
              />
            </div>
          )}

          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-cairo text-text-primary">
              ثنائي اللغة (عربي/إنجليزي)
            </span>
            <input
              type="checkbox"
              checked={config.bilingual}
              onChange={(e) =>
                setConfig({ ...config, bilingual: e.target.checked })
              }
              className="w-5 h-5 accent-accent"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-cairo text-text-primary">
              استضافة وأمان (شهري)
            </span>
            <input
              type="checkbox"
              checked={config.needsHosting}
              onChange={(e) =>
                setConfig({ ...config, needsHosting: e.target.checked })
              }
              className="w-5 h-5 accent-accent"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-cairo text-text-primary">
              صيانة شهرية + تحديثات
            </span>
            <input
              type="checkbox"
              checked={config.needsMaintenance}
              onChange={(e) =>
                setConfig({ ...config, needsMaintenance: e.target.checked })
              }
              className="w-5 h-5 accent-accent"
            />
          </label>
        </div>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24 self-start">
        <div className="bg-gradient-to-br from-accent/[0.08] to-transparent border-2 border-accent/30 rounded-2xl p-7">
          <div className="flex items-center gap-2 text-accent mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-cairo font-bold uppercase tracking-wider">
              تقدير مبدئي لمشروعك
            </span>
          </div>

          {/* Price - Anchored on starting price */}
          <div>
            <p className="text-xs text-text-muted font-cairo mb-1">
              المشروع يبدأ من
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl md:text-5xl font-black font-cairo text-text-primary">
                {formatPrice(result.priceMin)}
              </span>
              <span className="text-lg text-text-secondary font-cairo">
                جنيه
              </span>
            </div>
            <p className="text-sm text-text-muted font-cairo">
              يصل لـ{" "}
              <span className="text-text-secondary font-bold">
                {formatPrice(result.priceMax)} جنيه
              </span>{" "}
              للنسخة المتقدمة بكل المميزات
            </p>
          </div>

          {/* Visual range bar */}
          <div className="mt-5 mb-6">
            <div className="relative h-2 bg-surface rounded-full overflow-hidden">
              <div className="absolute inset-y-0 bg-gradient-to-r from-accent/40 via-accent to-accent/40 rounded-full w-full" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-text-muted font-cairo">
              <span>أساسي</span>
              <span>متقدم</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-6">
            {config.type === "website" && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                <span className="text-sm text-text-muted font-cairo">
                  منصة التطوير
                </span>
                <span className="text-sm font-bold font-cairo text-text-primary">
                  {config.websitePlatform === "wordpress"
                    ? "WordPress"
                    : "برمجة مخصصة"}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
              <span className="text-sm text-text-muted font-cairo">
                مدة التنفيذ
              </span>
              <span className="text-sm font-bold font-cairo text-text-primary">
                {result.weeksMin}-{result.weeksMax} أسبوع
              </span>
            </div>
            {config.features.length > 0 && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface">
                <span className="text-sm text-text-muted font-cairo">
                  المميزات المختارة
                </span>
                <span className="text-sm font-bold font-cairo text-text-primary">
                  {config.features.length} ميزة
                </span>
              </div>
            )}
          </div>

          {(result.monthlyHosting > 0 ||
            result.monthlyMaintenance > 0) && (
            <div className="mb-6 pt-4 border-t border-border">
              <p className="text-xs text-text-muted font-cairo mb-3">
                تكاليف شهرية اختيارية:
              </p>
              <div className="space-y-2">
                {result.monthlyHosting > 0 && (
                  <div className="flex items-center justify-between text-sm font-cairo">
                    <span className="text-text-secondary">
                      الاستضافة والـ Domain
                    </span>
                    <span className="text-text-primary font-bold">
                      {formatPrice(result.monthlyHosting)} ج/شهر
                    </span>
                  </div>
                )}
                {result.monthlyMaintenance > 0 && (
                  <div className="flex items-center justify-between text-sm font-cairo">
                    <span className="text-text-secondary">
                      الصيانة والتحديثات
                    </span>
                    <span className="text-text-primary font-bold">
                      {formatPrice(result.monthlyMaintenance)} ج/شهر
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What's Included */}
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-xs font-cairo font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              ✓ السعر يشمل
            </p>
            {config.type === "website" && config.websitePlatform === "wordpress" ? (
              <ul className="text-xs text-text-secondary font-cairo space-y-1">
                <li>• تركيب WordPress + تخصيص قالب premium</li>
                <li>• إعداد الـ Plugins المطلوبة</li>
                <li>• تخصيص التصميم بهوية شركتك</li>
                <li>• ضمان 3 شهور بعد التسليم</li>
                <li>• تدريب على إدارة الموقع بنفسك</li>
              </ul>
            ) : (
              <ul className="text-xs text-text-secondary font-cairo space-y-1">
                <li>• تحليل المتطلبات + تصميم UX/UI</li>
                <li>• تطوير كامل + اختبارات شاملة</li>
                <li>• تسليم الكود + التوثيق</li>
                <li>• ضمان 6 شهور بعد التسليم</li>
                <li>• تدريب الفريق على الاستخدام</li>
              </ul>
            )}
          </div>

          <Button
            href="/booking"
            variant="gold"
            size="lg"
            className="w-full"
          >
            احجز استشارة لعرض دقيق
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <p className="text-xs text-text-muted font-cairo mt-4 text-center leading-relaxed">
            الأرقام تقديرية. السعر النهائي يتحدد بعد جلسة تحليل مجانية لمتطلبات
            مشروعك.
          </p>
        </div>
      </div>
    </div>
  );
}
