import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getAlternates, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 86400;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://etqanly.com";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | إتقان للحلول المتكاملة",
  description:
    "سياسة الخصوصية الخاصة بشركة إتقان للحلول المتكاملة. كيف نجمع ونستخدم ونحمي بياناتك الشخصية على موقع etqanly.com.",
  alternates: getAlternates("/privacy"),
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-05-15";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schema = getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "سياسة الخصوصية", url: `${BASE_URL}/privacy` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb items={[{ label: "سياسة الخصوصية" }]} />
          <div className="max-w-3xl">
            <Badge variant="gold">المستند القانوني</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-3">
              سياسة الخصوصية
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-white/60 font-cairo">
              آخر تحديث: {LAST_UPDATED}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <article className="max-w-3xl prose prose-lg font-cairo text-text-secondary leading-relaxed">
            <p className="mb-8">
              نحن في <strong>إتقان للحلول المتكاملة</strong> (Etqanly.com) نلتزم بحماية
              خصوصية زوّار موقعنا وعملائنا. توضّح هذه السياسة كيف نجمع البيانات
              ونستخدمها، وما هي حقوقك بخصوص بياناتك الشخصية.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              1. البيانات التي نجمعها
            </h2>
            <p className="mb-4">عندما تتفاعل مع موقعنا، قد نجمع الأنواع التالية من البيانات:</p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>
                <strong>بيانات التواصل:</strong> الاسم، البريد الإلكتروني، رقم الهاتف،
                اسم الشركة — التي تقدّمها طوعياً في نماذج الحجز والتواصل.
              </li>
              <li>
                <strong>بيانات تقنية:</strong> عنوان IP، نوع المتصفح، الجهاز المستخدم،
                الصفحات التي تزورها، والوقت الذي تقضيه على الموقع.
              </li>
              <li>
                <strong>الكوكيز (Cookies):</strong> نستخدم ملفات تعريف الارتباط لتحسين
                تجربة التصفّح وحفظ تفضيلات اللغة.
              </li>
              <li>
                <strong>بيانات الاشتراك في النشرة:</strong> البريد الإلكتروني المسجَّل عند
                الاشتراك في نشرتنا البريدية.
              </li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              2. كيف نستخدم بياناتك
            </h2>
            <p className="mb-4">نستخدم بياناتك للأغراض التالية فقط:</p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>الرد على استفساراتك وطلبات الاستشارة وعروض الأسعار.</li>
              <li>إرسال محتوى تسويقي ذي صلة بخدماتنا (للمشتركين في النشرة فقط).</li>
              <li>تحسين أداء الموقع وتطوير خدماتنا.</li>
              <li>الالتزام بالمتطلبات القانونية والتنظيمية.</li>
            </ul>
            <p className="mb-6">
              <strong>لا نبيع بياناتك لأي طرف ثالث.</strong> قد نشاركها فقط مع مزوّدي خدمات
              تقنيين موثوقين (مثل خدمات البريد الإلكتروني والتحليلات) تحت اتفاقيات سرّية.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              3. أدوات الطرف الثالث
            </h2>
            <p className="mb-4">يستخدم موقعنا الخدمات التالية:</p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>
                <strong>Google Analytics 4:</strong> لقياس حركة الزيارات وتحليل سلوك
                المستخدمين بشكل مجهول الهوية (مع تفعيل anonymize IP).
              </li>
              <li>
                <strong>Microsoft Clarity:</strong> لفهم تجربة المستخدم من خلال heatmaps
                وتسجيلات الجلسات.
              </li>
              <li>
                <strong>WhatsApp Business:</strong> للتواصل عند الضغط على زر الواتساب.
              </li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              4. حماية البيانات
            </h2>
            <p className="mb-6">
              نطبّق أفضل الممارسات الأمنية لحماية بياناتك: تشفير الاتصال عبر HTTPS، تأمين
              قواعد البيانات، نسخ احتياطية منتظمة، والحدّ من الوصول للبيانات داخل الفريق
              على أساس الحاجة الفعلية فقط. مع ذلك، لا يوجد نظام آمن 100%، وننصحك
              بعدم إرسال بيانات حسّاسة عبر النماذج العامة.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              5. مدة الاحتفاظ بالبيانات
            </h2>
            <p className="mb-6">
              نحتفظ ببياناتك للمدة اللازمة لتقديم خدماتنا، أو وفقاً للمتطلبات القانونية. يمكنك
              في أي وقت طلب حذف بياناتك بمراسلتنا على{" "}
              <a
                href="mailto:info@etqanly.com"
                className="text-accent hover:underline"
              >
                info@etqanly.com
              </a>
              .
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              6. حقوقك
            </h2>
            <p className="mb-4">لك الحق في:</p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>الاطلاع على بياناتك المخزّنة لدينا.</li>
              <li>طلب تصحيح أي معلومة غير دقيقة.</li>
              <li>طلب حذف بياناتك بشكل كامل (الحق في النسيان).</li>
              <li>إلغاء الاشتراك في النشرة في أي وقت من خلال الرابط في كل رسالة.</li>
              <li>تقديم شكوى للسلطة المختصة في حالة وجود انتهاك.</li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              7. ملفات الكوكيز
            </h2>
            <p className="mb-6">
              نستخدم نوعين من الكوكيز: <strong>ضرورية</strong> (مثل تذكّر اللغة المختارة)
              و<strong>تحليلية</strong> (لتحسين الموقع). يمكنك تعطيل الكوكيز من إعدادات
              متصفّحك، لكن ذلك قد يؤثر على بعض وظائف الموقع.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              8. تعديلات على السياسة
            </h2>
            <p className="mb-6">
              قد نحدّث هذه السياسة من وقت لآخر. التحديثات الجوهرية سنُعلم بها عبر البريد
              الإلكتروني أو إشعار واضح على الموقع. تاريخ آخر تحديث يظهر أعلى الصفحة.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              9. التواصل معنا
            </h2>
            <p className="mb-6">
              لأي استفسار يتعلق بسياسة الخصوصية أو بياناتك، تواصل معنا:
            </p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>
                البريد الإلكتروني:{" "}
                <a
                  href="mailto:info@etqanly.com"
                  className="text-accent hover:underline"
                >
                  info@etqanly.com
                </a>
              </li>
              <li>
                الهاتف:{" "}
                <a href="tel:+201094807674" className="text-accent hover:underline" dir="ltr">
                  +20 109 480 7674
                </a>
              </li>
              <li>المقر: القاهرة، مصر</li>
            </ul>
          </article>
        </Container>
      </section>
    </>
  );
}
