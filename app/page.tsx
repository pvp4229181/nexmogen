import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
      <ServicesSection />
      <PortfolioSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  );
}
