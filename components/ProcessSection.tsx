"use client";

import { useRef } from "react";
import { MotionValue, motion, useScroll, useSpring, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your business, goals, and challenges to create a clear vision.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "We define the scope, strategy, and requirements, ensuring alignment with your objectives.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our design team crafts intuitive, user-centric interfaces that offer seamless experiences.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "We bring your ideas to life with robust, scalable development built for performance.",
  },
  {
    number: "05",
    title: "Deploy",
    description:
      "We ensure a smooth launch by thoroughly testing and optimizing the project before going live.",
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "We provide ongoing support and optimization so your project continues to thrive.",
  },
];

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each numeral fills in as the connector line sweeps past its column.
  const at = index / total;
  const fill = useTransform(progress, [at, at + 0.9 / total], [0, 1]);
  const node = useTransform(progress, [at, at + 0.9 / total], [0.6, 1]);

  return (
    <div className="relative min-w-0">
      {/* Outlined numeral, with the solid gradient version fading in over it. */}
      <div className="flex h-16 items-end lg:h-20">
        <span className="relative font-display text-5xl font-extrabold leading-none tracking-[-0.03em] sm:text-6xl">
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,77,87,0.45)]">
            {step.number}
          </span>
          <motion.span
            style={{ opacity: fill }}
            aria-hidden="true"
            className="gradient-text absolute inset-0"
          >
            {step.number}
          </motion.span>
        </span>
      </div>

      {/* Node sitting on the rail, plus the tick dropping to the title. */}
      <motion.span
        style={{ scale: node, opacity: fill }}
        className="absolute left-1 top-16 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(229,9,20,0.45)] lg:block lg:top-20"
      />
      <span className="absolute left-[9px] top-20 hidden h-7 w-px bg-gradient-to-b from-primary-light/50 to-transparent lg:block" />

      <h3 className="mt-9 font-display text-xl font-bold text-white lg:mt-12">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/50 lg:pr-4">
        {step.description}
      </p>
    </div>
  );
}

export default function ProcessSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end center"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="section bg-surface">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">From idea to launch</p>
          <TextReveal
            text="Our 6-D Process"
            highlight="Process"
            className="section-title"
          />
          <p className="section-copy">
            A clear, collaborative path that keeps every project focused,
            transparent, and moving toward measurable results.
          </p>
        </Reveal>

        <div ref={rowRef} className="relative mt-16 lg:mt-24">
          {/* The rail: a static track with the brand line drawing across it. */}
          <div className="pointer-events-none absolute inset-x-0 top-20 hidden h-px bg-white/10 lg:block">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full w-full origin-left bg-gradient-to-r from-primary via-primary-light to-accent"
            />
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-0">
            {steps.map((step, i) => (
              <Step
                key={step.title}
                step={step}
                index={i}
                total={steps.length}
                progress={progress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
