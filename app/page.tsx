import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ServicesSection from "@/components/ServicesSection";
import CapabilityTabs from "@/components/CapabilityTabs";
import StatsBand from "@/components/StatsBand";
import PortfolioSection from "@/components/PortfolioSection";
import IndustriesSection from "@/components/IndustriesSection";
import TechStack from "@/components/TechStack";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import { getProjects, getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesSection />
      <CapabilityTabs />
      <StatsBand />
      <PortfolioSection projects={projects} />
      <IndustriesSection />
      <TechStack />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <CtaSection />
    </>
  );
}
