export interface TimeSlot {
  id: string;
  time: string;
  label: string;
  period: "morning" | "afternoon";
}

export const timeSlots: TimeSlot[] = [
  { id: "m1", time: "09:00", label: "٩:٠٠ ص", period: "morning" },
  { id: "m2", time: "09:45", label: "٩:٤٥ ص", period: "morning" },
  { id: "m3", time: "10:30", label: "١٠:٣٠ ص", period: "morning" },
  { id: "m4", time: "11:15", label: "١١:١٥ ص", period: "morning" },
  { id: "a1", time: "13:00", label: "١:٠٠ م", period: "afternoon" },
  { id: "a2", time: "13:45", label: "١:٤٥ م", period: "afternoon" },
  { id: "a3", time: "14:30", label: "٢:٣٠ م", period: "afternoon" },
  { id: "a4", time: "15:15", label: "٣:١٥ م", period: "afternoon" },
];

export const consultationServices = [
  { value: "web-and-apps", label: "تطوير مواقع وتطبيقات" },
  { value: "enterprise-systems", label: "أنظمة داخلية للشركات" },
  { value: "infrastructure", label: "بنية تحتية وشبكات" },
  { value: "support", label: "دعم فني وصيانة" },
  { value: "consulting", label: "استشارات وتخطيط" },
  { value: "other", label: "أخرى" },
];

export interface FeatureItem {
  id: string;
  label: string;
}

export interface ServiceFeatureGroup {
  category: string;
  icon: string;
  features: FeatureItem[];
}

export const quoteServiceFeatures: Record<string, ServiceFeatureGroup> = {
  "web-and-apps": {
    category: "تطوير مواقع وتطبيقات",
    icon: "Globe",
    features: [
      { id: "website", label: "موقع إلكتروني" },
      { id: "ecommerce", label: "متجر إلكتروني" },
      { id: "mobile-app", label: "تطبيق موبايل" },
      { id: "web-app", label: "تطبيق ويب تفاعلي" },
      { id: "landing", label: "صفحة هبوط" },
      { id: "cms", label: "نظام إدارة محتوى" },
    ],
  },
  "enterprise-systems": {
    category: "أنظمة داخلية للشركات",
    icon: "Database",
    features: [
      { id: "erp", label: "نظام ERP" },
      { id: "crm", label: "نظام CRM" },
      { id: "hr", label: "نظام موارد بشرية" },
      { id: "inventory", label: "نظام مخزون" },
      { id: "accounting", label: "نظام محاسبة" },
      { id: "custom", label: "نظام مخصص" },
    ],
  },
  infrastructure: {
    category: "بنية تحتية وشبكات",
    icon: "Server",
    features: [
      { id: "network", label: "تصميم شبكات" },
      { id: "servers", label: "إعداد سيرفرات" },
      { id: "cloud", label: "حلول سحابية" },
      { id: "security", label: "أمن سيبراني" },
      { id: "backup", label: "نسخ احتياطي" },
      { id: "monitoring", label: "مراقبة وإدارة" },
    ],
  },
  support: {
    category: "دعم فني وصيانة",
    icon: "Wrench",
    features: [
      { id: "it-support", label: "دعم فني شامل" },
      { id: "maintenance", label: "صيانة دورية" },
      { id: "helpdesk", label: "مكتب مساعدة" },
      { id: "training", label: "تدريب فريق العمل" },
    ],
  },
};

export const budgetRanges = [
  { value: "under-10k", label: "أقل من ١٠,٠٠٠ ج.م" },
  { value: "10k-25k", label: "١٠,٠٠٠ - ٢٥,٠٠٠ ج.م" },
  { value: "25k-50k", label: "٢٥,٠٠٠ - ٥٠,٠٠٠ ج.م" },
  { value: "50k-100k", label: "٥٠,٠٠٠ - ١٠٠,٠٠٠ ج.م" },
  { value: "above-100k", label: "أكثر من ١٠٠,٠٠٠ ج.م" },
  { value: "not-sure", label: "مش متأكد" },
];

export const timelineOptions = [
  { value: "urgent", label: "عاجل (أقل من شهر)" },
  { value: "1-3months", label: "١ - ٣ أشهر" },
  { value: "3-6months", label: "٣ - ٦ أشهر" },
  { value: "flexible", label: "مرن / غير محدد" },
];
