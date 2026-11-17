"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import ScrollCopy from "@/components/scroll/ScrollCopy";
import TextReveal from "@/components/TextReveal";

const CAPABILITIES = [
  {
    id: "ai",
    label: "AI-native engineering",
    headline: "Agents that do the work, not just answer questions",
    body: "We design AI into the workflow itself — qualifying leads, answering support, booking appointments — instead of bolting a chat box onto the side of your product.",
    points: [
      "Custom agents trained on your own processes",
      "Human handoff built in from day one",
      "Measurable deflection and conversion targets",
    ],
  },
  {
    id: "product",
    label: "Product engineering",
    headline: "From a blank page to a platform in production",
    body: "Discovery, architecture, interface design and delivery handled by one team, so nothing gets lost in the gap between the deck and the deploy.",
    points: [
      "Multi-tenant SaaS architecture",
      "MVPs shipped in weeks, not quarters",
      "Roadmaps tied to revenue, not feature counts",
    ],
  },
  {
    id: "performance",
    label: "Performance at scale",
    headline: "Fast on a flagship phone and a five-year-old one",
    body: "Every build is measured against real-device budgets. Sub-two-second loads are a requirement we design toward, not a nice-to-have we hope for.",
    points: [
      "Core Web Vitals in the green at launch",
      "Edge caching and image pipelines by default",
      "Load-tested before the traffic arrives",
    ],
  },
  {
    id: "design",
    label: "Design systems",
    headline: "A brand that stays consistent as the product grows",
    body: "Tokens, components and interaction rules documented once and reused everywhere, so the tenth screen looks like it belongs with the first.",
    points: [
      "Reusable component libraries",
      "Accessible colour and type scales",
      "Motion that guides rather than decorates",
    ],
  },
  {
    id: "security",
    label: "Security & compliance",
    headline: "Built for the audit before it is scheduled",
    body: "Encryption, access control and data-handling decisions are made during architecture, which is far cheaper than retrofitting them after a client asks.",
    points: [
      "GDPR and HIPAA-aware data models",
      "Role-based access from the first release",
      "Dependency and vulnerability monitoring",
    ],
  },
];

const AUTO_ADVANCE_MS = 6500;

export default function CapabilityTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setActive((i) => (i + 1) % CAPABILITIES.length),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  const current = CAPABILITIES[active];

  return (
    <section className="section bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">How we work</p>
          <TextReveal
            text="Built for outcomes. Not just deliverables."
            highlight="deliverables"
            className="section-title"
          />
          <ScrollCopy
            className="section-copy max-w-2xl"
            text="Five things every Nexmogen engagement is held to, whatever the brief happens to be called."
          />
        </Reveal>

        <div
          className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Capabilities"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CAPABILITIES.map((capability, i) => (
              <button
                key={capability.id}
                role="tab"
                type="button"
                id={`tab-${capability.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${capability.id}`}
                onClick={() => setActive(i)}
                className={`relative shrink-0 rounded-2xl px-5 py-4 text-left text-sm font-semibold transition-colors lg:w-full ${
                  active === i
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="capability-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    className="absolute inset-0 rounded-2xl border border-primary-light/30 bg-primary/12"
                  />
                )}
                <span className="relative flex items-center gap-3 whitespace-nowrap lg:whitespace-normal">
                  <span
                    className={`font-display text-xs tabular-nums ${
                      active === i ? "text-primary-light" : "text-white/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {capability.label}
                </span>
              </button>
            ))}
          </div>

          <div className="card relative overflow-hidden p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                id={`panel-${current.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${current.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative"
              >
                <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {current.headline}
                </h3>
                <p className="mt-5 leading-8 text-white/60">{current.body}</p>
                <ul className="mt-8 space-y-3">
                  {current.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[11px] text-primary-light">
                        <FiCheck />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
