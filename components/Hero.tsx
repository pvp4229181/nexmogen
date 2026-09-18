"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowRight, FiPlay } from "react-icons/fi";
import { HERO_VIDEO_URL } from "@/lib/constants";
import Counter from "@/components/Counter";
import WebAnimation from "@/components/WebAnimationShowcase";
import ScrollAway from "@/components/scroll/ScrollAway";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } } };
const ROTATING = ["business website.", "AI agent workforce.", "SaaS platform.", "mobile app."];
const STATS = [{ value: 57, suffix: "+", label: "Clients served" }, { value: 130, suffix: "+", label: "Projects shipped" }, { value: 6, suffix: "", label: "Core services" }, { value: 98, suffix: "%", label: "Retention" }];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const id = setInterval(() => setIndex(i => (i + 1) % ROTATING.length), 2800); return () => clearInterval(id); }, []);
  return <span className="relative block min-h-[1.1em]"><AnimatePresence mode="wait"><motion.span key={ROTATING[index]} initial={{ opacity: 0, y: ".35em", filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: "-.35em", filter: "blur(6px)" }} transition={{ duration: .45, ease: "easeOut" }} className="gradient-text block">{ROTATING[index]}</motion.span></AnimatePresence></span>;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // The plate drifts down and swells slightly while the copy above it lifts
  // away, so the two layers separate as the page scrolls off the hero.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return <section ref={sectionRef} className="relative min-h-[760px] w-full overflow-hidden bg-black sm:min-h-screen">
    <motion.video style={{ y: plateY, scale: plateScale }} className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale contrast-125" src={HERO_VIDEO_URL} autoPlay loop muted playsInline preload="auto" aria-hidden="true" />
    <div className="pointer-events-none absolute inset-0 bg-red-600/40 mix-blend-color" /><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,0.97)_0%,rgba(5,5,6,0.78)_48%,rgba(5,5,6,0.46)_100%)]" /><div className="section-grid pointer-events-none absolute inset-0 opacity-60" />
    <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,#050506_0%,transparent_26%)]" />
    <ScrollAway trackRef={sectionRef} className="relative z-10"><div className="container-px mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 py-28 sm:min-h-screen sm:py-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10"><motion.div variants={container} initial="hidden" animate="show" className="min-w-0 max-w-4xl">
      <motion.p variants={item} className="eyebrow">Digital products. Built to perform.</motion.p>
      <motion.h1 variants={item} className="mt-7 max-w-4xl break-words font-display text-4xl font-bold leading-[.98] tracking-[-0.045em] text-white min-[360px]:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Craft your dream<RotatingWord /></motion.h1>
      <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-8 text-white/65 sm:text-xl">Websites, AI agents, SaaS platforms and mobile apps — engineered with speed and precision, and built to grow your business.</motion.p>
      <motion.div variants={item} className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"><Link href="/contact" className="btn-primary group w-full uppercase tracking-wide sm:w-auto">Get Started Today<FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link><Link href="/services" className="btn-ghost group w-full sm:w-auto"><FiPlay className="mr-2 text-primary-light" />Explore Services</Link></motion.div>
      <motion.div variants={item} className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-y-6 border-y border-white/10 py-6 sm:grid-cols-4">{STATS.map(stat => <div key={stat.label} className="min-w-0 border-white/10 px-2 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"><p className="font-display text-2xl font-bold text-white sm:text-3xl"><Counter value={stat.value} suffix={stat.suffix} /></p><p className="mt-1 break-words text-[10px] uppercase leading-4 tracking-[0.1em] text-white/40 sm:text-xs sm:tracking-[0.14em]">{stat.label}</p></div>)}</motion.div>
    </motion.div>
      <motion.div variants={item} initial="hidden" animate="show" className="mx-auto w-full max-w-2xl lg:max-w-none">
        <WebAnimation variant="design" />
      </motion.div>
    </div></ScrollAway>
    <a href="#services" aria-label="Scroll to services" className="absolute bottom-8 right-8 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/70 backdrop-blur-md transition-colors hover:border-primary-light/50 hover:text-white md:flex"><FiArrowDown className="animate-bounce" /></a>
  </section>;
}
