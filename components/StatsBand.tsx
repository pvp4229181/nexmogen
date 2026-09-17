"use client";

import dynamic from "next/dynamic";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import Parallax from "@/components/Parallax";
import SceneGate from "@/components/three/SceneGate";

const MomentumCanvas = dynamic(() => import("@/components/three/MomentumCanvas"), {
  ssr: false,
});

const NUMBERS = [
  { value: 130, suffix: "+", label: "Projects delivered", note: "Across web, AI, SaaS and mobile" },
  { value: 57, suffix: "+", label: "Businesses partnered", note: "From first launch to scale-up" },
  { value: 6, suffix: "", label: "Practice areas", note: "One team, end-to-end delivery" },
  { value: 24, suffix: "/7", label: "Support coverage", note: "Monitoring that does not clock off" },
];

const FALLBACK_BARS = [28, 38, 52, 45, 68, 82, 100];

export default function StatsBand() {
  return (
    <section className="section bg-surface">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="container-px relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">By the numbers</p>
            <TextReveal
              text="Momentum you can measure"
              highlight="measure"
              className="section-title"
            />
            <p className="section-copy max-w-xl">
              Every engagement is judged on the same thing: does it move the
              business forward? Here is what that has added up to so far.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] sm:grid-cols-2">
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

        <Parallax speed={60} className="mx-auto w-full max-w-md">
        <SceneGate
          className="relative mx-auto aspect-[5/4] w-full max-w-md sm:aspect-square"
          fallback={
            <div className="absolute inset-0 flex items-end gap-2 px-8 pb-10" aria-hidden="true">
              <div className="absolute inset-x-7 bottom-9 h-px bg-primary/35" />
              <div className="absolute bottom-9 left-7 h-[72%] w-px bg-primary/35" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(229,9,20,0.2),transparent_50%)]" />
              {FALLBACK_BARS.map((height, index) => (
                <div
                  key={height}
                  className="relative z-10 flex-1 rounded-t-sm border border-primary-light/20 bg-gradient-to-t from-primary-dark to-primary shadow-[0_0_18px_rgba(229,9,20,0.18)]"
                  style={{ height: `${height * 0.58}%`, opacity: 0.58 + index * 0.06 }}
                />
              ))}
            </div>
          }
        >
          <MomentumCanvas />
        </SceneGate>
        </Parallax>
      </div>
    </section>
  );
}
