import type { Metadata } from "next";
import { FiArrowUpRight, FiCheck, FiTarget } from "react-icons/fi";
import CaseStudyFocus from "@/components/CaseStudyFocus";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StickyStack from "@/components/scroll/StickyStack";
import ScrollCopy from "@/components/scroll/ScrollCopy";
import SpotlightCard from "@/components/SpotlightCard";
import TabletFrame from "@/components/TabletFrame";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How Nexmogen builds websites, storefronts and platforms for schools, NGOs, D2C brands, travel companies and food businesses across India.",
};

const GRADIENTS = [
  "from-primary/40 via-ink to-accent/20",
  "from-accent/30 via-ink to-primary/30",
  "from-primary-light/30 via-ink to-accent/30",
  "from-accent/20 via-ink to-primary/40",
];

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudyFocus slugs={caseStudies.map((study) => study.slug)} />
      <PageHero
        eyebrow="Work in detail"
        title={
          <>
            Case <span className="gradient-text">Studies</span>
          </>
        }
        description="Every project starts with a different constraint — an admissions deadline, a crowded shelf, a buyer who already knows the spec. Here is what we built, and why we built it that way."
        ctaLabel="Start your project"
        ctaHref="/contact"
      />

      <section className="section-flow bg-ink">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-px relative mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">{caseStudies.length} projects shipped</p>
              <h2 className="section-title">Built For Real Businesses</h2>
            </div>
            <ScrollCopy
              className="section-copy max-w-2xl lg:ml-auto"
              text="Schools, charitable trusts, D2C brands, production houses and industrial suppliers. Different audiences, the same method: understand how the customer actually decides, then build the site around that decision."
            />
          </Reveal>

          <StickyStack className="mt-16 space-y-10 lg:mt-20 lg:space-y-16">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={0.04}>
                <SpotlightCard tilt={false}>
                  <article
                    id={study.slug}
                    data-case-study=""
                    className="group relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-ink bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.012))] shadow-2xl shadow-black/30 transition-colors duration-300 hover:border-primary/45 sm:rounded-[2.5rem]"
                  >
                    <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="grid lg:grid-cols-12">
                      <div
                        className={`relative min-h-[310px] overflow-hidden border-b border-white/10 bg-gradient-to-br p-6 sm:min-h-[390px] sm:p-9 lg:col-span-5 lg:min-h-[460px] lg:border-b-0 lg:border-r ${
                          GRADIENTS[i % GRADIENTS.length]
                        }`}
                      >
                        <div className="section-grid pointer-events-none absolute inset-0 opacity-50" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />

                        <div className="relative flex items-start justify-between gap-4">
                          <span className="font-mono text-xs font-semibold tracking-[0.18em] text-white/60">
                            {String(i + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
                          </span>
                          <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
                            {study.sector}
                          </span>
                        </div>

                        <div className="relative mt-10 transition-transform duration-500 group-hover:-translate-y-1 sm:mt-14">
                          {study.imageUrl ? (
                            <TabletFrame
                              src={study.imageUrl}
                              alt={`${study.name} website shown on a tablet`}
                              priority={i === 0}
                              sizes="(min-width: 1024px) 38vw, 90vw"
                            />
                          ) : (
                            <span className="font-display text-2xl font-semibold text-white/40">
                              {study.name}
                            </span>
                          )}
                        </div>

                        <span className="pointer-events-none absolute -bottom-5 left-5 font-display text-[7rem] font-bold leading-none tracking-[-0.08em] text-white/[0.045] sm:text-[10rem]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="relative flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-12">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-light">
                            {study.category}
                          </span>
                          <span className="h-px w-10 bg-primary/60" />
                          <span className="text-xs uppercase tracking-[0.16em] text-white/35">Selected work</span>
                        </div>

                        <h3 className="mt-6 max-w-xl break-words font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                          {study.name}
                        </h3>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                          {study.summary}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-2">
                          {study.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:border-primary/25 group-hover:text-white/75"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {study.websiteUrl && (
                          <a
                            href={study.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex min-h-12 w-fit items-center gap-3 pt-10 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light"
                          >
                            Visit live site
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                              <FiArrowUpRight aria-hidden="true" />
                            </span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="grid border-t border-white/10 lg:grid-cols-12">
                      <div className="border-b border-white/10 p-7 sm:p-9 lg:col-span-4 lg:border-b-0 lg:border-r">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          <FiTarget className="text-primary-light" aria-hidden="true" />
                          The challenge
                        </p>
                        <p className="mt-4 text-sm leading-7 text-white/65">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="border-b border-white/10 p-7 sm:p-9 lg:col-span-4 lg:border-b-0 lg:border-r">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          Our approach
                        </p>
                        <ol className="mt-4 space-y-4">
                          {study.approach.map((step, stepIndex) => (
                            <li key={step} className="flex gap-3 text-sm leading-7 text-white/65">
                              <span className="font-mono text-[10px] font-semibold text-primary-light">
                                {String(stepIndex + 1).padStart(2, "0")}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="p-7 sm:p-9 lg:col-span-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          What we delivered
                        </p>
                        <ul className="mt-4 space-y-3">
                          {study.delivered.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-7 text-white/65">
                              <FiCheck className="mt-1 shrink-0 text-primary-light" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </StickyStack>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-px relative mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How we work</p>
            <h2 className="section-title">The Same Three Questions, Every Time</h2>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
            {[
              {
                title: "Who is deciding?",
                copy: "A parent comparing schools, a CSR partner checking impact and an industrial buyer with a spec sheet need entirely different first screens.",
              },
              {
                title: "What proves it?",
                copy: "Claims are cheap. We put the evidence — provenance, impact numbers, past work, reviews — next to the claim it supports.",
              },
              {
                title: "What happens next?",
                copy: "Every page has one obvious next action, whether that is an enquiry, a cart, a donation or directions to a stall.",
              },
            ].map((block, i) => (
              <Reveal key={block.title} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full">
                  <div className="card card-interactive h-full p-7">
                    <span className="font-display text-3xl font-bold text-primary/40">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-white">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {block.copy}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
