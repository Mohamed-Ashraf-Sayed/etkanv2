# ديفيكس تك | DevixTech - IT Solutions Website

موقع شركة حلول تقنية متكاملة - مبني بـ Next.js + TypeScript + Tailwind CSS

## المتطلبات

- Node.js 18+
- npm

## التشغيل

```bash
# تثبيت الحزم
npm install

# تشغيل بيئة التطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل نسخة الإنتاج
npm start
```

افتح [http://localhost:3000](http://localhost:3000)

## هيكل المشروع

```
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # الرئيسية
│   │   ├── services/
│   │   │   ├── page.tsx          # صفحة الخدمات
│   │   │   └── [slug]/page.tsx   # تفاصيل الخدمة
│   │   ├── portfolio/
│   │   │   ├── page.tsx          # صفحة الأعمال
│   │   │   └── [slug]/page.tsx   # تفاصيل المشروع
│   │   ├── about/page.tsx        # من نحن
│   │   ├── contact/page.tsx      # تواصل معنا
│   │   ├── blog/
│   │   │   ├── page.tsx          # المدونة
│   │   │   └── [slug]/page.tsx   # تفاصيل المقال
│   │   └── layout.tsx            # Layout مشترك (Navbar + Footer)
│   ├── layout.tsx                # Root Layout
│   └── globals.css               # الأنماط العامة
├── components/
│   ├── ui/                       # مكونات UI الأساسية
│   ├── layout/                   # Navbar + Footer
│   ├── home/                     # أقسام الصفحة الرئيسية
│   ├── shared/                   # مكونات مشتركة
│   └── ...
├── data/                         # بيانات الموقع
│   ├── services.ts
│   ├── projects.ts
│   ├── blog.ts
│   └── team.ts
└── lib/
    └── utils.ts
```

## التقنيات

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **React Hook Form + Zod** (form validation)
- **Lucide React** (icons)

## الصفحات

| الصفحة | المسار | الوصف |
|--------|--------|-------|
| الرئيسية | `/` | Hero + خدمات + طريقة العمل + مشاريع + ثقة + CTA |
| خدماتنا | `/services` | كل الخدمات مع sidebar تنقل |
| تفاصيل خدمة | `/services/[slug]` | 6 صفحات خدمات تفصيلية |
| أعمالنا | `/portfolio` | معرض المشاريع مع فلاتر |
| تفاصيل مشروع | `/portfolio/[slug]` | 6 دراسات حالة تفصيلية |
| من نحن | `/about` | القصة + الفريق + القيم + Timeline |
| تواصل معنا | `/contact` | نموذج تواصل + معلومات + خريطة |
| المدونة | `/blog` | 6 مقالات تقنية |
| مقال | `/blog/[slug]` | صفحة مقال كاملة مع TOC |
# etkan
# etkanv2
