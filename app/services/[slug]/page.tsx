import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import { services, getServiceBySlug } from "@/lib/services";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Nexmogen`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.tagline}
        description={service.overview}
        ctaLabel={service.ctaLabel}
        ctaHref="/contact"
        icon={<Icon />}
      />

      {service.stats && (
        <section className="relative overflow-hidden bg-surface py-20">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="container-px relative mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr">
            {service.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <div className="card card-interactive h-full p-8 text-center">
                    <p className="gradient-text font-display text-4xl font-bold">{stat.value}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/45">{stat.label}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className={`section ${service.stats ? "bg-ink" : "bg-surface"}`}>
        <div className="container-px mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              What&apos;s Included
            </p>
            <h2 className="section-title">
              Everything You Need
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06} className="h-full">
                <TiltCard className="h-full">
                  <div className="card card-interactive h-full p-7 sm:p-8">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/55">{feature.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${service.stats ? "bg-surface" : "bg-ink"}`}>
        <div className="container-px mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              How We Work
            </p>
            <h2 className="section-title">
              Our Process
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <div className="card card-interactive h-full p-7">
                    <p className="font-display text-4xl font-bold text-primary-light/40">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-6 font-display text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/55">{step.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {service.techStack && (
        <section
          className={`relative flex min-h-[20rem] items-center overflow-hidden py-20 ${service.stats ? "bg-ink" : "bg-surface"}`}
        >
          <div className="section-grid pointer-events-none absolute inset-0 opacity-20" />
          <div className="container-px relative mx-auto max-w-5xl text-center">
            <Reveal className="flex w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.035] px-5 py-10 shadow-2xl shadow-black/10 backdrop-blur-sm sm:px-10 sm:py-12">
              <p className="eyebrow justify-center after:h-px after:w-8 after:bg-gradient-to-l after:from-primary-light after:to-accent">
                Technology We Use
              </p>
              <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-4">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 backdrop-blur-md transition-colors duration-300 hover:border-primary-light/40 hover:bg-white/10 hover:text-white sm:px-6"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {service.pricing && (
        <section className={`section ${service.stats ? "bg-surface" : "bg-ink"}`}>
          <div className="container-px mx-auto max-w-6xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow justify-center">
                Pricing
              </p>
              <h2 className="section-title">
                Plans for {service.title}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {service.pricing.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.1} className="h-full">
                  <TiltCard className="h-full">
                    <div
                      className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                        plan.popular
                          ? "border-primary-light/50 bg-gradient-to-b from-primary/20 to-white/[0.03] shadow-2xl shadow-primary/10"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                          Most Popular
                        </span>
                      )}
                      <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
                      <p className="mt-4">
                        <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                        {plan.period && <span className="text-sm text-white/50"> {plan.period}</span>}
                      </p>
                      <ul className="mt-6 flex-1 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                            <FiCheck className="mt-0.5 shrink-0 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className={plan.popular ? "btn-primary mt-8 w-full" : "btn-ghost mt-8 w-full"}
                      >
                        Get Started
                      </Link>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
