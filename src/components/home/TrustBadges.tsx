import {
  ShieldCheck,
  Award,
  Lock,
  FileCheck2,
  Headphones,
  Banknote,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";

interface Badge {
  icon: typeof ShieldCheck;
  titleKey: string;
  subKey: string;
}

const badges: Badge[] = [
  { icon: ShieldCheck, titleKey: "trustBadgeLicensedTitle", subKey: "trustBadgeLicensedSub" },
  { icon: Award, titleKey: "trustBadgeWarrantyTitle", subKey: "trustBadgeWarrantySub" },
  { icon: Lock, titleKey: "trustBadgeNdaTitle", subKey: "trustBadgeNdaSub" },
  { icon: FileCheck2, titleKey: "trustBadgeContractTitle", subKey: "trustBadgeContractSub" },
  { icon: Headphones, titleKey: "trustBadgeSupportTitle", subKey: "trustBadgeSupportSub" },
  { icon: Banknote, titleKey: "trustBadgeRefundTitle", subKey: "trustBadgeRefundSub" },
];

export default function TrustBadges() {
  const t = useTranslations("common");

  return (
    <section className="py-12 bg-white dark:bg-background border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-surface/50 border border-border/50 hover:border-accent/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold font-cairo text-text-primary leading-tight">
                    {t(badge.titleKey)}
                  </div>
                  <div className="text-xs text-text-muted font-cairo mt-0.5 leading-snug">
                    {t(badge.subKey)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
