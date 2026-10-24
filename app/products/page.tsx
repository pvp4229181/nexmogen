import type { Metadata } from "next";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight, FiBarChart2, FiCheck, FiGitMerge, FiPlus, FiTarget, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Products",
  description: "Meet Nexmogen CRM: a shared workspace for growing sales teams to manage leads, customer conversations and their sales pipeline. Explore the product or book a demo.",
};

const CRM_URL = "https://crm.nexmogen.com";
const DEMO_URL = `${CRM_URL}/f/01a152dd-e500-775c-b18e-063dfbcb0925`;
const benefits = [
  { icon: FiTarget, title: "Give every lead a next step", copy: "Keep enquiries, sources and owners together. Follow-up reminders help your team stay on top of the next conversation." },
  { icon: FiGitMerge, title: "See where every deal stands", copy: "Move opportunities through a visual pipeline, so your team can spot what needs attention without another spreadsheet." },
  { icon: FiUsers, title: "Keep the whole team in context", copy: "Shared customer records, notes and interaction history give owners, managers and sales reps a common view." },
  { icon: FiBarChart2, title: "Make your pipeline easier to read", copy: "Bring pipeline value, conversions and team activity into dashboards that help you understand how sales are moving." },
];
const faqs = [
  { question: "Who is Nexmogen CRM for?", answer: "Growing businesses and sales teams that need one place to organize leads, customer records and follow-ups. It is especially useful when your team is piecing together customer information from separate spreadsheets and conversations." },
  { question: "Can I see the CRM before getting started?", answer: "Yes. Explore the CRM website for more application previews, or book a demo to walk through the workspace with our team and discuss your sales process." },
  { question: "Can different team members have different access?", answer: "Yes. Workspace roles and permissions let admins, managers and sales team members work with the records they need." },
  { question: "Does it work on mobile?", answer: "Nexmogen CRM works in desktop and mobile browsers, so your team can access customer information from either device." },
];

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_35%,rgba(229,9,20,.16),transparent_60%)]" aria-hidden="true" />
        <div className="section-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-px relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <p className="eyebrow">Our products / Built by Nexmogen</p>
            <span className="flex items-center gap-2 text-xs font-medium text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-primary-light" />Available today</span>
          </div>
          <div className="grid items-center gap-12 pt-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-10 lg:pt-14">
            <div>
              <p className="text-sm font-semibold text-primary-light">Meet Nexmogen CRM</p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.06] tracking-[-.045em] text-white sm:text-5xl xl:text-6xl">Less chasing.<br /><span className="gradient-text">More closing.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/70 sm:text-lg">A shared workspace for growing sales teams. Bring your leads, customer conversations and pipeline together, so everyone knows what comes next.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={CRM_URL} className="hero-btn-primary gap-2">Explore Nexmogen CRM <FiArrowUpRight aria-hidden="true" /></a>
                <a href={DEMO_URL} className="hero-btn-secondary gap-2">Book a demo <FiArrowUpRight aria-hidden="true" /></a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-white/60"><FiCheck className="shrink-0 text-primary-light" aria-hidden="true" />Built and maintained by the Nexmogen team</p>
            </div>
            <figure className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#101014] shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                  <span className="text-xs font-semibold tracking-wide text-white/80">NEXMOGEN <span className="text-primary-light">CRM</span></span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">Pipeline workspace</span>
                </div>
                <a href="/products/nexmogen-crm-pipeline.webp" target="_blank" rel="noopener noreferrer" aria-label="View full-size Nexmogen CRM pipeline screenshot (opens in a new tab)" className="block cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary-light">
                  <Image src="/products/nexmogen-crm-pipeline.webp" alt="Actual Nexmogen CRM pipeline showing deals organized by sales stage using sample data" width={1600} height={960} priority sizes="(min-width: 1024px) 55vw, 100vw" className="h-auto w-full" />
                </a>
              </div>
              <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-xs leading-5 text-white/60"><span>Actual CRM screen · Sample data</span><span>Click preview to view full size <FiArrowUpRight className="ml-1 inline" aria-hidden="true" /></span></figcaption>
            </figure>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
            <p className="max-w-xl text-sm leading-6 text-white/60">Software shaped by the everyday problems we solve for businesses.</p>
            <a href="#crm-benefits" className="inline-flex min-h-11 items-center gap-3 text-sm text-white/80 transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-light">See what it can do <FiArrowDown aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section id="crm-benefits" className="section scroll-mt-20 border-t border-white/10 bg-surface">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div><p className="eyebrow">From enquiry to opportunity</p><h2 className="mt-5 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">Your next move.<br />Already in view.</h2></div>
            <p className="max-w-lg text-base leading-8 text-white/65 lg:ml-auto">Less time gathering scattered details. More time following up, building relationships and moving the right deals forward.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-ink/60 p-6 sm:p-8">
                <div className="flex items-center justify-between"><Icon className="text-2xl text-primary-light" aria-hidden="true" /><span className="font-mono text-xs text-white/50">0{index + 1}</span></div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-ink">
        <div className="container-px mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><p className="eyebrow">A little clarity</p><h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">Before you get started.</h2><p className="mt-5 text-base leading-7 text-white/65">A few things to know about your next sales workspace.</p><a href={DEMO_URL} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-light">Talk to our team <FiArrowUpRight aria-hidden="true" /></a></div>
          <div className="border-t border-white/15">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group border-b border-white/15">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium text-white/90 transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-light [&::-webkit-details-marker]:hidden">{question}<FiPlus className="shrink-0 text-primary-light transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" /></summary>
                <p className="pb-6 pr-8 text-sm leading-7 text-white/65">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden border-t border-primary/20 bg-[linear-gradient(120deg,#20080b,#0c0709_60%,#050506)] py-16 sm:py-20">
        <div className="container-px relative mx-auto max-w-7xl text-center">
          <p className="eyebrow !justify-center">Your next step</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">Give your team a clearer<br className="hidden sm:block" /> path to the next deal.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">Explore Nexmogen CRM, or let us show you how it can fit your sales process.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={CRM_URL} className="hero-btn-primary gap-2">Explore Nexmogen CRM <FiArrowUpRight aria-hidden="true" /></a><a href={DEMO_URL} className="hero-btn-secondary gap-2">Book a demo <FiArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </section>
    </>
  );
}
