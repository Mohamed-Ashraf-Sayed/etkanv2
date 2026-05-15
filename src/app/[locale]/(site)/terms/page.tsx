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
  title: "الشروط والأحكام | إتقان للحلول المتكاملة",
  description:
    "الشروط والأحكام الخاصة باستخدام موقع إتقان للحلول المتكاملة والاستفادة من خدماتنا التقنية.",
  alternates: getAlternates("/terms"),
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-05-15";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schema = getBreadcrumbSchema([
    { name: "الرئيسية", url: `${BASE_URL}/` },
    { name: "الشروط والأحكام", url: `${BASE_URL}/terms` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-navy pt-32 pb-16">
        <Container>
          <Breadcrumb items={[{ label: "الشروط والأحكام" }]} />
          <div className="max-w-3xl">
            <Badge variant="gold">المستند القانوني</Badge>
            <h1 className="text-display font-black font-cairo text-white mt-6 mb-3">
              الشروط والأحكام
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-white/60 font-cairo">آخر تحديث: {LAST_UPDATED}</p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white dark:bg-background">
        <Container>
          <article className="max-w-3xl prose prose-lg font-cairo text-text-secondary leading-relaxed">
            <p className="mb-8">
              مرحباً بك في موقع <strong>إتقان للحلول المتكاملة</strong> (Etqanly.com).
              باستخدامك للموقع أو طلب أيٍّ من خدماتنا، فإنك توافق على الشروط والأحكام
              التالية. يرجى قراءتها بعناية قبل الاستمرار.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              1. تعريفات
            </h2>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li><strong>الشركة / نحن:</strong> إتقان للحلول المتكاملة (Etqan IT Solutions).</li>
              <li><strong>الموقع:</strong> etqanly.com وكل النطاقات الفرعية التابعة له.</li>
              <li><strong>الخدمات:</strong> تطوير المواقع والتطبيقات وأنظمة الإدارة والبنية التحتية والدعم الفني.</li>
              <li><strong>العميل / أنت:</strong> الشخص أو الجهة التي تستخدم الموقع أو تتعاقد معنا على خدمة.</li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              2. استخدام الموقع
            </h2>
            <p className="mb-4">باستخدامك للموقع، فإنك تتعهد بالآتي:</p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>عدم استخدام الموقع لأي أغراض غير قانونية أو ضارة.</li>
              <li>عدم محاولة اختراق الموقع أو إساءة استخدام أي ثغرة.</li>
              <li>عدم نسخ المحتوى أو إعادة نشره دون إذن مكتوب.</li>
              <li>تقديم معلومات صحيحة ودقيقة في نماذج التواصل والحجز.</li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              3. عروض الأسعار والتعاقد
            </h2>
            <p className="mb-6">
              عروض الأسعار التي نُقدّمها صالحة لمدة <strong>30 يوماً</strong> من تاريخ
              الإصدار. الأسعار الظاهرة في الحاسبة وصفحة الباقات <strong>تقديرية</strong>،
              والسعر النهائي يُحدَّد بعد جلسة تحليل تفصيلية للمتطلبات. لا يُعتبر أي عرض
              ملزماً إلا بعد توقيع عقد رسمي بين الطرفين.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              4. الدفع
            </h2>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>
                <strong>30% دفعة أولى</strong> عند توقيع العقد لبدء العمل.
              </li>
              <li><strong>30% دفعة ثانية</strong> عند تسليم النسخة التجريبية (المرحلة المتوسطة).</li>
              <li><strong>40% دفعة نهائية</strong> عند التسليم النهائي للمشروع.</li>
              <li>
                الأسعار لا تشمل ضريبة القيمة المضافة (VAT) وتُحسب وفقاً للوائح المحلية.
              </li>
              <li>التأخر في الدفع لأكثر من 14 يوم قد يؤدي لإيقاف العمل مؤقتاً.</li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              5. الجدول الزمني والتسليم
            </h2>
            <p className="mb-6">
              نلتزم بالجدول الزمني المتّفق عليه في العقد. أي تأخير ناتج عن جهتنا دون سبب
              قاهر يتم تعويضه. التأخير الناتج عن العميل (مثل ردود متأخرة، تغيير في
              المتطلبات، عدم تقديم محتوى) يُعاد التفاوض بشأن الجدول الزمني والسعر.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              6. التعديلات والـ Scope
            </h2>
            <p className="mb-6">
              أي تعديلات خارج نطاق العقد المتّفق عليه (Scope Changes) تُسعَّر بشكل منفصل.
              نُوفّر مرونة معقولة في التعديلات البسيطة، لكن التغييرات الجوهرية تتطلب
              ملحقاً موقّعاً للعقد.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              7. الضمان وما بعد التسليم
            </h2>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>
                <strong>ضمان 6 شهور</strong> على مشاريع البرمجة المخصصة من تاريخ التسليم،
                يشمل إصلاح الـ Bugs دون مقابل.
              </li>
              <li>
                <strong>ضمان 3 شهور</strong> على مشاريع WordPress وتركيب القوالب الجاهزة.
              </li>
              <li>
                الضمان لا يشمل: تعديلات يقوم بها العميل بنفسه، تحديث الـ Plugins من قِبَل
                طرف ثالث، الأضرار الناتجة عن استضافة غير موثوقة، أو هجمات سيبرانية خارجة
                عن إرادتنا.
              </li>
              <li>
                نقدّم باقات صيانة شهرية اختيارية للدعم المستمر بعد انتهاء فترة الضمان.
              </li>
            </ul>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              8. الملكية الفكرية
            </h2>
            <p className="mb-6">
              عند سداد كامل المبلغ المتّفق عليه، تنتقل ملكية الكود المصدري وأصول التصميم
              إلى العميل. نحتفظ بحقّ استخدام المشروع كـ portfolio (دون كشف بيانات حسّاسة)
              إلا إذا اتفقنا على خلاف ذلك. كل المكتبات والأدوات مفتوحة المصدر المستخدَمة
              تظل وفق رخصها الأصلية.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              9. السرّية
            </h2>
            <p className="mb-6">
              نلتزم بحفظ سرّية كل المعلومات التي يشاركها العميل معنا. يوقّع الفريق على
              اتفاقيات عدم الإفصاح (NDA) قبل بدء أي مشروع حسّاس عند الطلب.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              10. حدود المسؤولية
            </h2>
            <p className="mb-6">
              مسؤوليتنا تجاه العميل محدودة بقيمة العقد المُبرَم. لا نتحمّل مسؤولية الأضرار
              غير المباشرة (مثل خسارة الأرباح، فقدان البيانات الناتج عن إهمال العميل في
              النسخ الاحتياطي، أو توقّف الخادم من جهة استضافة خارجية).
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              11. إنهاء العقد
            </h2>
            <p className="mb-6">
              يحق لأي من الطرفين إنهاء العقد بإشعار مكتوب قبل 14 يوم. في حالة الإنهاء من
              قِبَل العميل، تُحتسب تكلفة العمل المنجَز فعلياً ولا تُسترد المدفوعات السابقة
              عن المراحل المسلَّمة. في حالة الإنهاء من قِبَلنا دون سبب وجيه، تُسترَد
              المدفوعات عن العمل غير المنجَز.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              12. القانون المعمول به
            </h2>
            <p className="mb-6">
              تخضع هذه الشروط للقوانين المعمول بها في جمهورية مصر العربية. أي نزاع يتم
              حلّه ودياً أولاً، وعند تعذّر ذلك يُحال للقضاء المختص في القاهرة.
            </p>

            <h2 className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4">
              13. التواصل
            </h2>
            <p className="mb-6">
              لأي استفسار قانوني أو تعاقدي:
            </p>
            <ul className="space-y-2 ms-6 list-disc mb-6">
              <li>
                البريد:{" "}
                <a
                  href="mailto:info@etqanly.com"
                  className="text-accent hover:underline"
                >
                  info@etqanly.com
                </a>
              </li>
              <li>
                الهاتف:{" "}
                <a
                  href="tel:+201094807674"
                  className="text-accent hover:underline"
                  dir="ltr"
                >
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
