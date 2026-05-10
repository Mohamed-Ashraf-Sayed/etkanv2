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
} from "lucide-react";
import Button from "@/components/ui/Button";

type ProjectType = "website" | "mobile" | "system";

interface ProjectConfig {
  type: ProjectType;
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

        {/* Complexity */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="font-bold font-cairo text-text-primary mb-4">
            2. مستوى التعقيد
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
            3. الميزات المطلوبة
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
            4. خيارات إضافية
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
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-2xl p-8 text-center">
          <Calculator className="w-10 h-10 text-accent mx-auto mb-4" />
          <p className="text-sm text-text-muted font-cairo mb-3">
            التكلفة التقديرية
          </p>
          <div className="text-3xl md:text-4xl font-black font-cairo text-accent mb-1">
            {formatPrice(result.priceMin)}
          </div>
          <div className="text-text-muted font-cairo">
            - {formatPrice(result.priceMax)} جنيه
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-surface rounded-xl p-3">
              <div className="text-xs text-text-muted font-cairo mb-1">
                المدة
              </div>
              <div className="font-bold font-cairo text-text-primary">
                {result.weeksMin}-{result.weeksMax} أسبوع
              </div>
            </div>
            <div className="bg-surface rounded-xl p-3">
              <div className="text-xs text-text-muted font-cairo mb-1">
                ميزات
              </div>
              <div className="font-bold font-cairo text-text-primary">
                {config.features.length}
              </div>
            </div>
          </div>

          {(result.monthlyHosting > 0 ||
            result.monthlyMaintenance > 0) && (
            <div className="mt-4 pt-4 border-t border-border text-start">
              <p className="text-xs text-text-muted font-cairo mb-2">
                + التكلفة الشهرية:
              </p>
              {result.monthlyHosting > 0 && (
                <div className="flex justify-between text-sm font-cairo mb-1">
                  <span className="text-text-muted">استضافة:</span>
                  <span className="text-text-primary font-bold">
                    {formatPrice(result.monthlyHosting)} ج/شهر
                  </span>
                </div>
              )}
              {result.monthlyMaintenance > 0 && (
                <div className="flex justify-between text-sm font-cairo">
                  <span className="text-text-muted">صيانة:</span>
                  <span className="text-text-primary font-bold">
                    {formatPrice(result.monthlyMaintenance)} ج/شهر
                  </span>
                </div>
              )}
            </div>
          )}

          <Button
            href="/booking"
            variant="gold"
            size="lg"
            className="w-full mt-6"
          >
            احصل على عرض دقيق مجاناً
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <p className="text-xs text-text-muted font-cairo mt-4">
            * الأسعار تقديرية وتعتمد على المتطلبات النهائية. للحصول على عرض
            دقيق، احجز استشارة مجانية مع فريقنا.
          </p>
        </div>
      </div>
    </div>
  );
}
