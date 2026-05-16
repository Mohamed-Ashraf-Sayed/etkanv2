import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowWeWork from "@/components/home/HowWeWork";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyEtqan from "@/components/home/WhyEtqan";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <TrustSection />
      <ServicesSection />
      <HowWeWork />
      <FeaturedProjects />
      <WhyEtqan />
      <TestimonialsSection />
      <HomeFAQ />
      <CTABanner />
    </>
  );
}
