"use client";

import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import ScrollCopy from "@/components/scroll/ScrollCopy";
import TextReveal from "@/components/TextReveal";

const NUMBERS = [
  { value: 130, suffix: "+", label: "Projects delivered", note: "Across web, AI, SaaS and mobile" },
  { value: 57, suffix: "+", label: "Businesses partnered", note: "From first launch to scale-up" },
  { value: 6, suffix: "", label: "Practice areas", note: "One team, end-to-end delivery" },
  { value: 24, suffix: "/7", label: "Support coverage", note: "Monitoring that does not clock off" },
];

export default function StatsBand() {
  return (
    <section className="section bg-surface">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="container-px relative mx-auto max-w-7xl">
        <div>
          <Reveal>
            <p className="eyebrow">By the numbers</p>
            <TextReveal
              text="Momentum you can measure"
              highlight="measure"
              className="section-title"
            />
            <ScrollCopy
              className="section-copy max-w-xl"
              text="Every engagement is judged on the same thing: does it move the business forward? Here is what that has added up to so far."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} direction={i % 2 ? "left" : "right"}>
                <div className="h-full bg-ink/80 p-7 transition-colors duration-300 hover:bg-primary/10">
                  <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary-light">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {stat.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
