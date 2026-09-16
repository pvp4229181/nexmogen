import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Nexmogen",
  description:
    "Website development, AI agents, SaaS software, CRM solutions, digital marketing, and mobile app development from Nexmogen.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Expert Solutions Tailored for You"
        title="Services"
        description="At Nexmogen, we offer a wide range of services designed to bring your vision to life. From creative design to robust development, we deliver solutions that drive success."
      />

      <section className="section bg-surface">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-px relative mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              Digital capabilities
            </p>
            <h2 className="section-title">
              How Can We Elevate Your Business?
            </h2>
            <p className="section-copy mx-auto max-w-2xl">
              At Nexmogen, we transform ideas into reality with expert design
              and development. Let’s create something exceptional together!
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              const number = String(index + 1).padStart(2, "0");

              return (
                <Reveal key={service.slug} delay={index * 0.07} className="h-full">
                  <TiltCard className="h-full">
                    <Link
                      href={`/services/${service.slug}`}
                      className="card card-interactive group relative flex h-full min-h-80 flex-col overflow-hidden p-7 sm:p-9"
                    >
                      <div className="absolute -right-10 -top-12 font-display text-[9rem] font-bold leading-none text-white/[0.025] transition-colors group-hover:text-primary/[0.06]">
                        {number}
                      </div>

                      <div className="relative flex items-start justify-between gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary-light transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                          <Icon />
                        </div>
                        <span className="font-display text-sm font-semibold tracking-[0.18em] text-white/25">
                          {number}
                        </span>
                      </div>

                      <div className="relative mt-auto pt-12">
                        <h2 className="max-w-md font-display text-2xl font-semibold text-white">
                          {service.title}
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                          {service.description}
                        </p>
                        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
                          Learn more
                          <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        title="Would you like to start a project with us?"
        description="Let Nexmogen bring your ideas to life with top-notch design and development. Let’s create something amazing together—reach out today!"
        href="tel:+918650457900"
        label="+91-8650457900"
      />
    </>
  );
}
