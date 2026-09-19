"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import Counter from "@/components/Counter";
import HeroNodeField from "@/components/hero/HeroNodeField";
import ScrollAway from "@/components/scroll/ScrollAway";

const SLIDE_MS = 6500;

const SLIDES = [
  { eyebrow: "Digital products. Built to perform.", lead: "Craft your dream", accent: "digital product.", copy: "Websites, AI agents, SaaS platforms and mobile apps — engineered with speed and precision, and built to grow your business.", href: "/services", cta: "Explore Services" },
  { eyebrow: "Website Development", lead: "High-performance websites", accent: "built to convert.", copy: "Fast, secure, SEO-optimized business sites, landing pages and storefronts — tuned for search visibility and consistent lead generation.", href: "/services/website-development", cta: "See Web Services" },
  { eyebrow: "AI Agents for Business", lead: "Intelligent automation", accent: "tailored to your business.", copy: "Custom agents for sales, support, HR and lead qualification that take the repetitive work off your team — so you scale without scaling headcount.", href: "/services/ai-agents-for-business", cta: "Meet the Agents" },
  { eyebrow: "SaaS Software Development", lead: "SaaS platforms, from MVP", accent: "to enterprise scale.", copy: "Subscription products with multi-tenant architecture, integrations and analytics built in — shipped lean first, then scaled without a rewrite.", href: "/services/saas-software-development", cta: "Build Your SaaS" },
  { eyebrow: "Mobile App Development", lead: "Native and cross-platform", accent: "apps that perform.", copy: "Android, iOS and cross-platform apps built for performance, secure architecture and a smooth experience — with support that outlasts launch.", href: "/services/mobile-app-development", cta: "Start an App" },
];

const STATS = [
  { value: 57, suffix: "+", label: "Clients served" },
  { value: 130, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "", label: "Core services" },
  { value: 98, suffix: "%", label: "Retention" },
];

const CAPABILITIES = ["Websites", "AI Agents", "SaaS Platforms", "Mobile Apps"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={sectionRef} className="relative min-h-[780px] w-full overflow-hidden bg-[#080304] sm:min-h-[820px] lg:min-h-[860px]">
      <div className="hero-sdlc-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-sdlc-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <motion.div data-scene={index} style={{ y: fieldY, scale: fieldScale }} className="hero-ai-field pointer-events-none absolute inset-y-20 right-0 w-full opacity-25 sm:opacity-35 md:w-[72%] md:opacity-70 lg:inset-y-16 lg:w-[68%] lg:opacity-75" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`ai-scene-${index}`} initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} className="absolute inset-0">
            <HeroNodeField variant={index} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <ScrollAway trackRef={sectionRef} className="relative z-10">
        <div className="container-px mx-auto flex min-h-[780px] max-w-[1500px] flex-col pt-24 sm:min-h-[820px] sm:pt-24 lg:min-h-[860px] lg:pt-28">
          <div className="flex flex-1 items-center py-14 sm:py-16 lg:py-12">
            <div className="w-full max-w-[1100px]">
              <AnimatePresence mode="wait">
                <motion.div key={index} initial={false} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(6px)" }} transition={{ duration: 0.5, ease: "easeOut" }}>
                  <p className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.035] px-4 text-xs font-medium tracking-wide text-white/75 backdrop-blur-md sm:text-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary-light shadow-[0_0_14px_#ff4d57]" aria-hidden="true" />
                    {slide.eyebrow}
                  </p>

                  <h1 className="mt-7 max-w-[1100px] text-balance font-display text-[clamp(2.65rem,7vw,7.15rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:leading-[0.92] sm:tracking-[-0.065em]">
                    <span className="hero-spectrum-text">{slide.lead}</span>
                    <br />
                    <span>{slide.accent}</span>
                  </h1>

                  <p className="mt-7 max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8 lg:text-xl">{slide.copy}</p>

                  <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Link href={slide.href} className="hero-btn-primary group w-full sm:w-auto">
                      {slide.cta}
                      <FiArrowRight aria-hidden="true" className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <Link href="/contact" className="hero-btn-secondary w-full sm:w-auto">Get Started Today</Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 grid max-w-4xl grid-cols-2 gap-y-6 border-y border-white/10 py-5 sm:grid-cols-4 lg:mt-12">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-0 border-white/10 px-3 first:pl-0 sm:border-r sm:px-6 sm:last:border-r-0">
                    <p className="font-display text-2xl font-semibold tabular-nums text-white sm:text-3xl"><Counter value={stat.value} suffix={stat.suffix} /></p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40 sm:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden flex-wrap gap-2 border-t border-white/10 py-7 sm:flex">
            {CAPABILITIES.map((capability) => <span key={capability} className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs text-white/55 backdrop-blur-sm">{capability}</span>)}
          </div>
        </div>
      </ScrollAway>

      <a href="#services" aria-label="Scroll to services" className="absolute bottom-8 right-8 z-20 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 backdrop-blur-md transition-colors duration-200 hover:border-primary-light/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light md:flex">
        <FiArrowDown aria-hidden="true" className="animate-bounce" />
      </a>
    </section>
  );
}
