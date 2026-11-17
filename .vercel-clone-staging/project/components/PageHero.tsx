"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { HERO_VIDEO_URL } from "@/lib/constants";
import { useRef, type ReactNode } from "react";
import ScrollAway from "@/components/scroll/ScrollAway";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: .14, delayChildren: .1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: "easeOut" as const } } };

export default function PageHero({ eyebrow, title, description, ctaLabel, ctaHref, icon }: { eyebrow: string; title: ReactNode; description?: string; ctaLabel?: string; ctaHref?: string; icon?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-black pt-20">
      <motion.video style={{ y: plateY, scale: plateScale }} className="absolute inset-0 h-full w-full object-cover opacity-55 grayscale contrast-125" src={HERO_VIDEO_URL} autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />
      <div className="absolute inset-0 bg-red-600/35 mix-blend-color" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,.96),rgba(5,5,6,.8)_55%,rgba(5,5,6,.58))]" />
      <div className="section-grid pointer-events-none absolute inset-0 opacity-55" />
      <ScrollAway trackRef={sectionRef} travel={72} className="relative z-10 w-full"><div className="container-px mx-auto w-full max-w-7xl py-28 sm:py-36">
        <motion.div variants={container} initial="hidden" animate="show" className="flex min-w-0 max-w-4xl flex-col items-start">
          {icon && <motion.div variants={item} className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-3xl text-accent shadow-xl shadow-accent/10 backdrop-blur-md">{icon}</motion.div>}
          <motion.p variants={item} className="eyebrow">{eyebrow}</motion.p>
          <motion.h1 variants={item} className="mt-6 max-w-4xl break-words font-display text-4xl font-bold leading-[1.02] tracking-[-.04em] text-white sm:text-6xl lg:text-7xl">{title}</motion.h1>
          {description && <motion.p variants={item} className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{description}</motion.p>}
          {ctaLabel && ctaHref && <motion.div variants={item} className="mt-10 w-full sm:w-auto"><Link href={ctaHref} className="btn-primary group w-full sm:w-auto">{ctaLabel}<FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /></Link></motion.div>}
        </motion.div>
      </div></ScrollAway>
    </section>
  );
}
