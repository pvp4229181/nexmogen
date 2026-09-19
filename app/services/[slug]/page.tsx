import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import ServiceProcessRail from "@/components/ServiceProcessRail";
import { services, getServiceBySlug } from "@/lib/services";

const featureLayout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-8", "lg:col-span-5", "lg:col-span-7"];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const Icon = service.icon;

  return <>
    <PageHero eyebrow={service.title} title={service.tagline} description={service.overview} ctaLabel={service.ctaLabel} ctaHref="/contact" icon={<Icon />} />

    {service.stats && <section className="relative overflow-hidden border-y border-white/10 bg-surface py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(229,9,20,.14),transparent_36%)]" />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr">
          {service.stats.map((stat, index) => <Reveal key={stat.label} delay={index * .08}>
            <div className="relative min-h-40 overflow-hidden px-6 py-8 sm:px-8">
              <span className="absolute right-5 top-3 font-display text-6xl font-bold text-white/[.025]">{String(index + 1).padStart(2, "0")}</span>
              <p className="gradient-text font-display text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[.16em] text-white/55">{stat.label}</p>
            </div>
          </Reveal>)}
        </div>
      </div>
    </section>}

    <section className="section bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="eyebrow">What&apos;s included</p><h2 className="section-title">Everything You Need</h2></div>
          <p className="section-copy max-w-2xl lg:ml-auto">A complete delivery scope designed around performance, usability, and the long-term growth of your product.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {service.features.map((feature, index) => {
            const number = String(index + 1).padStart(2, "0");
            const featured = index === 0 || index === 3;
            return <Reveal key={feature.title} delay={index * .06} className={`h-full ${featureLayout[index] ?? "lg:col-span-6"}`}>
              <SpotlightCard className="h-full">
                <article className={`group relative flex h-full min-h-[270px] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.015))] p-7 transition-all duration-300 hover:border-primary/50 hover:bg-[linear-gradient(145deg,rgba(229,9,20,.13),rgba(255,255,255,.018))] sm:p-9 ${featured ? "lg:min-h-[320px]" : ""}`}>
                  <span className="pointer-events-none absolute -right-7 -top-12 font-display text-[9rem] font-bold leading-none text-white/[.025] transition-colors group-hover:text-primary/[.08]">{number}</span>
                  <div className="relative flex w-full flex-col"><span className="font-mono text-xs tracking-[.2em] text-white/35">{number} / {String(service.features.length).padStart(2, "0")}</span><div className="mt-auto pt-14"><div className="mb-5 h-px w-12 bg-primary transition-all group-hover:w-20" /><h3 className={`font-display font-semibold text-white ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{feature.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{feature.description}</p></div></div>
                </article>
              </SpotlightCard>
            </Reveal>;
          })}
        </div>
      </div>
    </section>

    <section className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="max-w-3xl"><p className="eyebrow">How we work</p><h2 className="section-title">Our Process</h2><p className="section-copy">A clear path from the first conversation to a dependable launch.</p></Reveal>
        <ServiceProcessRail steps={service.process} />
      </div>
    </section>

    {service.techStack && <section className="relative overflow-hidden border-y border-white/10 bg-ink py-20 sm:py-24">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="container-px relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
        <Reveal><p className="eyebrow">Technology we use</p><h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">The right tools for the job.</h2></Reveal>
        <Reveal delay={.1} className="flex flex-wrap gap-3 lg:justify-end">{service.techStack.map((tech, index) => <span key={tech} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[.04] px-5 text-sm font-medium text-white/70 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-white"><small className="font-mono text-[10px] text-primary-light">{String(index + 1).padStart(2, "0")}</small>{tech}</span>)}</Reveal>
      </div>
    </section>}

    <CtaSection />
  </>;
}
