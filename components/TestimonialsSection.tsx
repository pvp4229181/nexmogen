import Reveal from "@/components/Reveal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { ITestimonial } from "@/models/Testimonial";

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  return (
    <section className="section bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Client stories</p>
          <h2 className="section-title">
            Our Customer Reviews
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            We take pride in delivering exceptional services that exceed
            expectations. Here&apos;s what our satisfied customers have to
            say about their experience with{" "}
            <span className="font-semibold text-white">Nexmogen</span>!
          </p>
        </Reveal>

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
