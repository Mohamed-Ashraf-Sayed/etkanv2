import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowWeWork from "@/components/home/HowWeWork";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <HowWeWork />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
