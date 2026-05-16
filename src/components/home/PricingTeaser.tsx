import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

const tiers = [
  {
    nameKey: "tier1Name",
    descKey: "tier1Desc",
    from: 5000,
    durationKey: "tier1Duration",
    badge: false,
  },
  {
    nameKey: "tier2Name",
    descKey: "tier2Desc",
    from: 80000,
    durationKey: "tier2Duration",
    badge: true,
  },
  {
    nameKey: "tier3Name",
    descKey: "tier3Desc",
    from: 150000,
    durationKey: "tier3Duration",
    badge: false,
  },
];

export default async function PricingTeaser() {
  const t = await getTranslations("pricingTeaser");

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar-EG").format(n);

  return (
    <section className="section-padding bg-white dark:bg-background">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="gold">{t("badge")}</Badge>
          <h2 className="text-h2 font-bold font-cairo text-text-primary mt-5 mb-3">
            {t("title")}
          </h2>
          <p className="text-text-secondary font-cairo">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${
                tier.badge
                  ? "border-accent bg-accent/[0.04]"
                  : "border-border bg-surface"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-navy text-xs font-bold font-cairo">
                    <Sparkles className="w-3 h-3" />
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              <h3 className="font-bold font-cairo text-text-primary text-lg mb-2">
                {t(tier.nameKey)}
              </h3>
              <p className="text-sm text-text-muted font-cairo leading-relaxed mb-5 min-h-[40px]">
                {t(tier.descKey)}
              </p>

              <div className="mb-5">
                <span className="text-xs text-text-muted font-cairo block mb-1">
                  {t("startingFrom")}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black font-cairo text-text-primary">
                    {formatPrice(tier.from)}
                  </span>
                  <span className="text-sm text-text-secondary font-cairo">
                    {t("currency")}
                  </span>
                </div>
                <div className="text-xs text-text-muted font-cairo mt-2">
                  {t(tier.durationKey)}
                </div>
              </div>

              <Button
                href="/pricing"
                variant={tier.badge ? "gold" : "ghost"}
                size="md"
                className="w-full"
              >
                {t("viewDetails")}
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tools/cost-calculator"
            className="inline-flex items-center gap-2 text-sm font-cairo text-accent hover:underline font-bold"
          >
            {t("useCalculator")}
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
