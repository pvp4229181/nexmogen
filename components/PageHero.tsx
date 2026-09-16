"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { HERO_VIDEO_URL } from "@/lib/constants";
import type { ReactNode } from "react";

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

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  icon,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[62vh] w-full items-center overflow-hidden bg-black pt-20 sm:min-h-[68vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
        src={HERO_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-red-600/45 mix-blend-color" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,14,0.58),rgba(5,5,14,0.82))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(239,68,68,0.24),transparent_42%),linear-gradient(to_top,#070711_0%,transparent_30%)]" />
      <div className="section-grid pointer-events-none absolute inset-0 opacity-35" />

      <div className="container-px relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center py-24 text-center sm:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex min-w-0 max-w-full flex-col items-center"
        >
          {icon && (
            <motion.div
              variants={item}
              className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-light/20 bg-primary/10 text-3xl text-primary-light shadow-xl shadow-primary/15 backdrop-blur-md"
            >
              {icon}
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="eyebrow justify-center text-center"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 max-w-4xl break-words font-display text-3xl font-bold leading-[1.06] tracking-[-0.03em] text-white min-[360px]:text-4xl sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p variants={item} className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              {description}
            </motion.p>
          )}

          {ctaLabel && ctaHref && (
            <motion.div variants={item} className="mt-10 w-full sm:w-auto">
              <Link href={ctaHref} className="btn-primary group w-full sm:w-auto">
                {ctaLabel}
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
