import { Check, X, Minus } from "lucide-react";
import Container from "@/components/ui/Container";
import { getLocale, getTranslations } from "next-intl/server";

interface Row {
  feature: string;
  etqan: "yes" | "no" | "partial";
  freelancer: "yes" | "no" | "partial";
  bigAgency: "yes" | "no" | "partial";
  diy: "yes" | "no" | "partial";
}

const rowsAr: Row[] = [
  { feature: "عقد رسمي + ضمانات قانونية", etqan: "yes", freelancer: "partial", bigAgency: "yes", diy: "no" },
  { feature: "فريق كامل (مش شخص واحد)", etqan: "yes", freelancer: "no", bigAgency: "yes", diy: "no" },
  { feature: "أسعار شفافة بدون مفاجآت", etqan: "yes", freelancer: "partial", bigAgency: "no", diy: "yes" },
  { feature: "ضمان 6 شهور بعد التسليم", etqan: "yes", freelancer: "no", bigAgency: "partial", diy: "no" },
  { feature: "دعم فني عربي قريب", etqan: "yes", freelancer: "partial", bigAgency: "no", diy: "no" },
  { feature: "Code ownership كامل", etqan: "yes", freelancer: "partial", bigAgency: "partial", diy: "yes" },
  { feature: "ميزانية مناسبة للأعمال المتوسطة", etqan: "yes", freelancer: "yes", bigAgency: "no", diy: "yes" },
  { feature: "خبرة مع السوق العربي", etqan: "yes", freelancer: "partial", bigAgency: "partial", diy: "no" },
  { feature: "قابلية التوسع مستقبلاً", etqan: "yes", freelancer: "no", bigAgency: "yes", diy: "no" },
];

const rowsEn: Row[] = [
  { feature: "Formal contract + legal guarantees", etqan: "yes", freelancer: "partial", bigAgency: "yes", diy: "no" },
  { feature: "Full team (not a single person)", etqan: "yes", freelancer: "no", bigAgency: "yes", diy: "no" },
  { feature: "Transparent pricing, no surprises", etqan: "yes", freelancer: "partial", bigAgency: "no", diy: "yes" },
  { feature: "6-month post-delivery warranty", etqan: "yes", freelancer: "no", bigAgency: "partial", diy: "no" },
  { feature: "Local Arabic-speaking support", etqan: "yes", freelancer: "partial", bigAgency: "no", diy: "no" },
  { feature: "Full code ownership", etqan: "yes", freelancer: "partial", bigAgency: "partial", diy: "yes" },
  { feature: "Affordable for mid-size businesses", etqan: "yes", freelancer: "yes", bigAgency: "no", diy: "yes" },
  { feature: "Experience with MENA market", etqan: "yes", freelancer: "partial", bigAgency: "partial", diy: "no" },
  { feature: "Built to scale with your growth", etqan: "yes", freelancer: "no", bigAgency: "yes", diy: "no" },
];

function Cell({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes")
    return (
      <Check className="w-5 h-5 text-emerald-500 mx-auto" strokeWidth={3} />
    );
  if (value === "no")
    return <X className="w-5 h-5 text-red-400 mx-auto" strokeWidth={3} />;
  return <Minus className="w-5 h-5 text-amber-500 mx-auto" strokeWidth={3} />;
}

export default async function WhyEtqan() {
  const t = await getTranslations("whyEtqan");
  const locale = await getLocale();
  const rows = locale === "en" ? rowsEn : rowsAr;

  return (
    <section className="section-padding section-alt">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold font-cairo text-text-primary mb-3">
              {t("title")}
            </h2>
            <p className="text-text-secondary font-cairo">{t("subtitle")}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-border bg-surface">
                  <th className="text-start p-4 font-bold font-cairo text-text-primary text-sm">
                    {t("featureCol")}
                  </th>
                  <th className="p-4 font-bold font-cairo text-accent text-sm border-x border-accent/20 bg-accent/[0.04]">
                    {t("etqan")}
                  </th>
                  <th className="p-4 font-bold font-cairo text-text-muted text-sm">
                    {t("freelancer")}
                  </th>
                  <th className="p-4 font-bold font-cairo text-text-muted text-sm">
                    {t("bigAgency")}
                  </th>
                  <th className="p-4 font-bold font-cairo text-text-muted text-sm">
                    {t("diy")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-4 text-sm font-cairo text-text-secondary">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center border-x border-accent/10 bg-accent/[0.02]">
                      <Cell value={row.etqan} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.freelancer} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.bigAgency} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.diy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-cairo text-text-muted">
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
              {t("legendYes")}
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-amber-500" strokeWidth={3} />
              {t("legendPartial")}
            </div>
            <div className="inline-flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-red-400" strokeWidth={3} />
              {t("legendNo")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
