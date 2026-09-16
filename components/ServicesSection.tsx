import Link from "next/link";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { services } from "@/lib/services";

export default function ServicesSection() {
  return (
    <section id="services" className="section bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">What we build</p>
            <h2 className="section-title">
              How Can We Elevate Your Business?
            </h2>
          </div>
          <p className="section-copy max-w-2xl lg:ml-auto">
            At <span className="font-semibold text-white">Nexmogen</span>, we
            transform ideas into reality with expert design and development.
            Let&apos;s create something exceptional together!
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="card card-interactive group flex h-full min-h-72 flex-col p-7 sm:p-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-light/15 bg-primary/10 text-2xl text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon />
                    </div>
                    <h3 className="mt-8 font-display text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/55">
                      {service.description}
                    </p>
                    <span className="mt-auto pt-7 text-sm font-semibold text-primary-light">
                      Explore service →
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
