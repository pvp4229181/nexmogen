import type { Metadata } from "next";
import CrmWorkflow from "@/components/CrmWorkflow";
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
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 sm:pb-20 sm:pt-36 lg:min-h-[820px] lg:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,rgba(229,9,20,.22),transparent_52%),radial-gradient(ellipse_at_15%_70%,rgba(255,23,68,.09),transparent_48%)]" aria-hidden="true" />
        <div className="section-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="container-px relative mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-14 xl:gap-20">
            <div className="max-w-xl">
              <div className="inline-flex min-h-10 items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 text-xs font-medium text-white/70 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-primary-light shadow-[0_0_12px_rgba(255,77,87,.75)]" aria-hidden="true" />
                Nexmogen CRM · Available today
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">Built for growing sales teams</p>
              <h1 className="mt-5 text-balance font-display text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[.96] tracking-[-.06em] text-white">Every lead.<br /><span className="gradient-text">One clear next step.</span></h1>
              <p className="mt-7 max-w-lg text-base leading-8 text-white/65 sm:text-lg">Bring leads, customer conversations and your sales pipeline into one shared workspace—so your team always knows what to do next.</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={CRM_URL} className="hero-btn-primary group gap-2">Access Nexmogen CRM <FiArrowUpRight aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" /></a>
                <a href={DEMO_URL} className="hero-btn-secondary gap-2">Book a demo <FiArrowUpRight aria-hidden="true" /></a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {["Manage leads", "Track deals", "Stay in sync"].map((item) => <p key={item} className="flex items-center gap-2 text-xs leading-5 text-white/55 sm:text-sm"><FiCheck className="shrink-0 text-primary-light" aria-hidden="true" />{item}</p>)}
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-3 shadow-[0_35px_100px_rgba(0,0,0,.45)] backdrop-blur-sm sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-4 px-1">
                  <span className="text-xs font-semibold tracking-wide text-white/75">NEXMOGEN <span className="text-primary-light">CRM</span></span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">Live workflow</span>
                </div>
                <CrmWorkflow />
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6 lg:mt-16">
            <p className="max-w-xl text-sm leading-6 text-white/50">Built and maintained by Nexmogen. Shaped by the everyday work of growing businesses.</p>
            <a href="#crm-benefits" className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-white/75 transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-light">Explore the features <FiArrowDown aria-hidden="true" /></a>
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
