import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Website development, AI agents, SaaS software, CRM solutions, digital marketing, and mobile app development from Nexmogen.",
};

const serviceLayout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"];

export default function ServicesPage() {
  return <>
    <PageHero eyebrow="Expert Solutions Tailored for You" title="Services" description="At Nexmogen, we offer a wide range of services designed to bring your vision to life. From creative design to robust development, we deliver solutions that drive success." />

    <section className="section bg-ink">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="eyebrow">Digital capabilities</p><h2 className="section-title">How Can We Elevate Your Business?</h2></div>
          <p className="section-copy max-w-2xl lg:ml-auto">At Nexmogen, we transform ideas into reality with expert design and development. Let&apos;s create something exceptional together!</p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const number = String(index + 1).padStart(2, "0");
            const featured = index === 0 || index === 3;
            return <Reveal key={service.slug} delay={index * .07} className={`h-full ${serviceLayout[index]}`}>
              <SpotlightCard className="h-full">
                <Link href={`/services/${service.slug}`} className={`group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-7 transition-all duration-300 hover:border-primary/50 hover:bg-[linear-gradient(145deg,rgba(229,9,20,.14),rgba(255,255,255,.02))] sm:p-9 ${featured ? "lg:min-h-[390px]" : ""}`}>
                  <div className="pointer-events-none absolute -right-8 -top-14 font-display text-[11rem] font-bold leading-none tracking-[-.08em] text-white/[.025] transition-colors group-hover:text-primary/[.08]">{number}</div>
                  <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between gap-6">
                    <span className="font-mono text-xs font-semibold tracking-[.2em] text-white/35">{number} / {String(services.length).padStart(2, "0")}</span>
                    <div className={`flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary-light shadow-[0_0_40px_rgba(229,9,20,.12)] transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white ${featured ? "h-16 w-16 text-2xl" : "h-14 w-14 text-xl"}`}><Icon aria-hidden="true" /></div>
                  </div>
                  <div className="relative mt-auto pt-12">
                    <div className="mb-5 h-px w-12 bg-primary transition-all group-hover:w-20" />
                    <h2 className={`max-w-xl font-display font-semibold leading-tight text-white ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{service.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{service.description}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">Learn more <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>;
          })}
        </div>
      </div>
    </section>

    <CtaSection title="Would you like to start a project with us?" description="Let Nexmogen bring your ideas to life with top-notch design and development. Let's create something amazing together—reach out today!" href="tel:+918650457900" label="+91-8650457900" />
  </>;
}
