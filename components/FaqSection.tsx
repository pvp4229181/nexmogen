"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

const FAQS = [
  {
    question: "How long does a typical project take?",
    answer:
      "A marketing website usually takes three to five weeks end to end. An MVP SaaS platform or a custom AI agent runs closer to eight to twelve weeks, depending on integrations. We share a dated milestone plan before anything starts so you are never guessing.",
  },
  {
    question: "What does a project cost?",
    answer:
      "Websites start at ₹30,000 for a five-page build and scale with complexity. Platform and AI work is quoted per engagement after a short discovery call, because the honest answer depends on scope rather than a price list.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes. We work remotely with clients across time zones and keep overlapping hours for calls, standups and launches. Delivery, documentation and support all run in English.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every build ships with a support window covering monitoring, fixes and small changes. Most clients continue on a monthly retainer for ongoing optimisation, content updates and new features.",
  },
  {
    question: "Do we own the code and the designs?",
    answer:
      "Completely. On final payment, the repository, the design files and every account we set up on your behalf transfer to you. Nothing is held hostage on our infrastructure.",
  },
  {
    question: "Can you take over a project someone else started?",
    answer:
      "Often, yes. We start with a short audit of the existing codebase and tell you honestly whether continuing it or rebuilding is the better use of your budget.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-surface">
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <TextReveal
              text="Everything you need to know"
              highlight="to know"
              className="section-title"
            />
            <p className="section-copy">
              Still unsure about something? A fifteen-minute call usually
              answers it faster than an email thread.
            </p>
          </Reveal>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-primary-light"
                  >
                    <span className="font-display text-base font-semibold text-white sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm ${
                        isOpen
                          ? "border-primary-light/50 bg-primary/20 text-primary-light"
                          : "border-white/15 text-white/50"
                      }`}
                    >
                      <FiPlus />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-10 leading-8 text-white/55">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
