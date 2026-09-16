"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowDown, FiArrowRight, FiPlay } from "react-icons/fi";
import { HERO_VIDEO_URL } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[700px] w-full overflow-hidden bg-black sm:min-h-screen">
      <video
        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
        src={HERO_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-red-600/45 mix-blend-color" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,14,0.92)_0%,rgba(5,5,14,0.68)_52%,rgba(5,5,14,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(239,68,68,0.24),transparent_36%),linear-gradient(to_top,#070711_0%,transparent_28%)]" />
      <div className="section-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-px relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-center py-28 sm:min-h-screen sm:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="min-w-0 max-w-4xl"
        >
          <motion.p variants={item} className="eyebrow">
            Digital products. Built to perform.
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 max-w-4xl break-words font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white min-[360px]:text-5xl sm:text-6xl lg:text-8xl"
          >
            Craft your dream
            <span className="gradient-text block">business website.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl"
          >
            Build stunning websites with speed and precision. We turn ambitious
            ideas into modern digital experiences that grow your business.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link href="/contact" className="btn-primary group w-full uppercase tracking-wide sm:w-auto">
              Get Started Today
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="btn-ghost group w-full sm:w-auto">
              <FiPlay className="mr-2 text-primary-light" />
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid w-full max-w-2xl grid-cols-3 border-y border-white/10 py-5"
          >
            {[
              ["57", "Clients"],
              ["130", "Projects"],
              ["6", "Core services"],
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 border-r border-white/10 px-2 first:pl-0 last:border-r-0 sm:px-4">
                <p className="font-display text-xl font-bold text-white sm:text-3xl">{value}</p>
                <p className="mt-1 break-words text-[10px] uppercase leading-4 tracking-[0.1em] text-white/40 sm:text-xs sm:tracking-[0.16em]">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 right-8 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/70 backdrop-blur-md transition-colors hover:border-primary-light/50 hover:text-white md:flex"
      >
        <FiArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
