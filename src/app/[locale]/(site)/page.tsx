import { getLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowWeWork from "@/components/home/HowWeWork";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTABanner from "@/components/home/CTABanner";
import { getDbProjects } from "@/lib/db-projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();
  const dbProjects = await getDbProjects(locale);
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <HowWeWork />
      <FeaturedProjects dbProjects={dbProjects} />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
