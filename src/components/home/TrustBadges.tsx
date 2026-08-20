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
    <section className="py-10 bg-white dark:bg-background border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 max-w-6xl mx-auto">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className="group flex flex-col items-center text-center gap-2.5"
              >
                <Icon
                  className="w-6 h-6 text-accent/80 group-hover:text-accent transition-colors duration-300"
                  strokeWidth={1.75}
                />
                <div>
                  <div className="text-sm font-bold font-cairo text-text-primary leading-tight">
                    {t(badge.titleKey)}
                  </div>
                  <div className="text-xs text-text-muted font-cairo mt-1 leading-snug">
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
