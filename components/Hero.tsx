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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [showDesktopScene, setShowDesktopScene] = useState(false);
  const slide = SLIDES[index];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const sync = () => {
      setShowDesktopScene(media.matches);
      if (!media.matches) setIndex(0);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || !showDesktopScene) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduceMotion, showDesktopScene]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#080304] sm:min-h-[820px] lg:min-h-[860px]">
      <div className="hero-sdlc-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-sdlc-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {showDesktopScene && (
        <motion.div data-scene={index} style={{ y: fieldY, scale: fieldScale }} className="hero-ai-field pointer-events-none absolute inset-y-20 right-0 hidden w-full opacity-35 sm:block md:w-[72%] md:opacity-70 lg:inset-y-16 lg:w-[68%] lg:opacity-75" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`ai-scene-${index}`} initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} className="absolute inset-0">
              <HeroNodeField variant={index} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      <ScrollAway trackRef={sectionRef} className="relative z-10">
        <div className="container-px mx-auto flex max-w-[1500px] flex-col pb-9 pt-28 sm:min-h-[820px] sm:pb-0 sm:pt-24 lg:min-h-[860px] lg:pt-28">
          <div className="flex flex-1 items-start sm:items-center sm:py-16 lg:py-12">
            <div className="w-full max-w-[1100px]">
              <AnimatePresence mode="wait">
                <motion.div key={index} initial={false} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(6px)" }} transition={{ duration: 0.5, ease: "easeOut" }}>
                  <p className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.035] px-3.5 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-md sm:min-h-11 sm:px-4 sm:text-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary-light shadow-[0_0_14px_#ff4d57]" aria-hidden="true" />
                    {slide.eyebrow}
                  </p>

                  <h1 className="hero-headline mt-7 max-w-full font-display text-[clamp(2.65rem,7vw,7.15rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:leading-[0.92] sm:tracking-[-0.065em]">
                    <span className="hero-headline-line hero-spectrum-text">{slide.lead}</span>
                    <span className="hero-headline-line">{slide.accent}</span>
                  </h1>

                  <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 sm:mt-7 sm:text-lg sm:leading-8 sm:text-white/60 lg:text-xl">{slide.copy}</p>

                  <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row">
                    <Link href={slide.href} className="hero-btn-primary group w-full sm:w-auto">
                      {slide.cta}
                      <FiArrowRight aria-hidden="true" className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <Link href="/contact" className="hero-btn-secondary w-full sm:w-auto">Get Started Today</Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="hidden max-w-4xl border-y border-white/10 py-5 sm:mt-10 sm:grid sm:grid-cols-4 lg:mt-12">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-0 border-white/10 px-6 first:pl-0 last:border-r-0 sm:border-r">
                    <p className="font-display text-2xl font-semibold tabular-nums text-white sm:text-3xl"><Counter value={stat.value} suffix={stat.suffix} /></p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollAway>

      <a href="#services" aria-label="Scroll to services" className="absolute bottom-8 right-8 z-20 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 backdrop-blur-md transition-colors duration-200 hover:border-primary-light/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light md:flex">
        <FiArrowDown aria-hidden="true" className="animate-bounce" />
      </a>
    </section>
  );
}
