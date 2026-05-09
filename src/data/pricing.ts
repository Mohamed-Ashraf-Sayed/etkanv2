export interface PricingPackage {
  slug: string;
  name: string;
  category: string;
  description: string;
  priceRange: { min: number; max: number; currency: string };
  duration: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
}

export const pricingPackages: PricingPackage[] = [
  // Web Development
  {
    slug: "landing-page",
    name: "صفحة هبوط احترافية",
    category: "تطوير المواقع",
    description: "صفحة هبوط واحدة محسنة للتحويل والإعلانات",
    priceRange: { min: 5000, max: 15000, currency: "EGP" },
    duration: "1-2 أسبوع",
    features: [
      "تصميم مخصص متجاوب",
      "محسن للإعلانات والتحويل",
      "نموذج اتصال متكامل",
      "تحسين SEO أساسي",
      "Google Analytics + Pixel",
      "ضمان شهر بعد التسليم",
    ],
    notIncluded: ["Backend متقدم", "حسابات مستخدمين"],
  },
  {
    slug: "corporate-website",
    name: "موقع شركة احترافي",
    category: "تطوير المواقع",
    description: "موقع كامل لشركتك مع جميع الصفحات الأساسية",
    priceRange: { min: 25000, max: 80000, currency: "EGP" },
    duration: "4-8 أسابيع",
    popular: true,
    features: [
      "تصميم UI/UX مخصص",
      "5-10 صفحات (رئيسية، خدمات، أعمال، تواصل، إلخ)",
      "ثنائي اللغة (عربي/إنجليزي)",
      "نظام إدارة محتوى (CMS)",
      "تحسين SEO شامل",
      "تكامل مع وسائل التواصل",
      "نماذج اتصال + WhatsApp",
      "ضمان 3 شهور",
      "تدريب على إدارة الموقع",
    ],
  },
  {
    slug: "ecommerce-website",
    name: "متجر إلكتروني",
    category: "تطوير المواقع",
    description: "متجر إلكتروني متكامل مع نظام دفع وشحن",
    priceRange: { min: 50000, max: 200000, currency: "EGP" },
    duration: "6-12 أسبوع",
    features: [
      "تصميم متجر احترافي",
      "إدارة منتجات لا محدودة",
      "نظام دفع متعدد (فيزا، فودافون كاش، إلخ)",
      "تكامل شركات الشحن",
      "حسابات عملاء + قوائم رغبات",
      "نظام كوبونات وعروض",
      "تقارير مبيعات تفصيلية",
      "تطبيق موبايل (اختياري +)",
      "تحسين SEO للمتاجر",
    ],
  },
  // Mobile Development
  {
    slug: "mobile-app-mvp",
    name: "تطبيق موبايل MVP",
    category: "تطوير التطبيقات",
    description: "أول إصدار من تطبيقك يحتوي الميزات الأساسية لاختبار السوق",
    priceRange: { min: 80000, max: 200000, currency: "EGP" },
    duration: "8-12 أسبوع",
    features: [
      "تطبيق Hybrid (Android + iOS)",
      "تصميم UI/UX احترافي",
      "5-8 شاشات أساسية",
      "نظام تسجيل دخول",
      "Push Notifications",
      "تكامل مع API",
      "نشر على Google Play + App Store",
      "Analytics + Crash Reporting",
      "ضمان 3 شهور",
    ],
  },
  {
    slug: "mobile-app-full",
    name: "تطبيق موبايل متكامل",
    category: "تطوير التطبيقات",
    description: "تطبيق احترافي كامل بكل الميزات المتقدمة",
    priceRange: { min: 200000, max: 500000, currency: "EGP" },
    duration: "12-24 أسبوع",
    popular: true,
    features: [
      "Native iOS + Android (أو Flutter)",
      "10-20 شاشة + 3-5 user flows",
      "Backend متكامل + APIs",
      "نظام دفع آمن",
      "خرائط GPS / تتبع",
      "Chat / تنبيهات فورية",
      "تكامل مع social media",
      "Admin panel كامل",
      "Analytics متقدمة",
      "ضمان 6 شهور + دعم فني",
    ],
  },
  // ERP/CRM
  {
    slug: "crm-system",
    name: "نظام إدارة عملاء (CRM)",
    category: "أنظمة الإدارة",
    description: "نظام كامل لإدارة العملاء والمبيعات وفرق المبيعات",
    priceRange: { min: 60000, max: 150000, currency: "EGP" },
    duration: "8-12 أسبوع",
    features: [
      "إدارة Leads + Contacts",
      "Pipeline مبيعات قابل للتخصيص",
      "Email integration",
      "تقارير مفصلة + Dashboard",
      "صلاحيات متعددة المستخدمين",
      "تكامل مع WhatsApp Business",
      "Mobile app للموظفين",
      "تدريب الفريق",
    ],
  },
  {
    slug: "erp-system",
    name: "نظام ERP متكامل",
    category: "أنظمة الإدارة",
    description: "نظام موحد لإدارة كل أقسام شركتك (محاسبة، مخازن، HR، مبيعات)",
    priceRange: { min: 150000, max: 500000, currency: "EGP" },
    duration: "12-24 أسبوع",
    features: [
      "محاسبة كاملة + قوائم مالية",
      "إدارة مخازن متعددة",
      "نقاط بيع POS",
      "إدارة موارد بشرية HR",
      "إدارة مشتريات وموردين",
      "تقارير ذكاء أعمال (BI)",
      "تكامل مع أنظمة الفواتير الإلكترونية",
      "Multi-branch support",
      "Mobile apps للموظفين",
      "تدريب شامل + دعم سنة",
    ],
  },
  // Infrastructure
  {
    slug: "infrastructure-setup",
    name: "تجهيز بنية تحتية شركة",
    category: "البنية التحتية",
    description: "تأسيس بنية تحتية شبكية كاملة لمكتب شركتك",
    priceRange: { min: 30000, max: 200000, currency: "EGP" },
    duration: "1-4 أسابيع",
    features: [
      "تصميم الشبكة الداخلية",
      "تجهيز Servers + Storage",
      "Firewall + Security",
      "Wi-Fi enterprise",
      "نظام كاميرات مراقبة (اختياري)",
      "VPN للموظفين عن بعد",
      "Backup + Disaster Recovery",
      "تدريب IT staff",
      "صيانة دورية",
    ],
  },
  // Support
  {
    slug: "monthly-support",
    name: "دعم فني شهري",
    category: "الدعم الفني",
    description: "خطة دعم فني وصيانة مستمرة لموقعك أو نظامك",
    priceRange: { min: 2500, max: 15000, currency: "EGP" },
    duration: "شهري",
    features: [
      "صيانة دورية أسبوعية",
      "Backups يومية",
      "تحديثات الأمان",
      "إصلاح الأخطاء (bugs)",
      "دعم فني عبر WhatsApp",
      "تقارير شهرية",
      "Priority response (4-24 ساعة)",
    ],
  },
];

export function getPackagesByCategory(category: string) {
  return pricingPackages.filter((p) => p.category === category);
}

export function getCategories(): string[] {
  return [...new Set(pricingPackages.map((p) => p.category))];
}
