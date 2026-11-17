"use client";

import { ReactNode, RefObject, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Hero content that recedes as its section scrolls past — drifts up, scales
 * down, dims and de-focuses, so the section below arrives over it rather than
 * simply after it.
 *
 * Pass `trackRef` pointing at the surrounding section; without it the effect is
 * measured against this wrapper, which is usually shorter than the hero.
 */
export default function ScrollAway({
  children,
  className = "",
  trackRef,
  travel = 96,
}: {
  children: ReactNode;
  className?: string;
  trackRef?: RefObject<HTMLElement | null>;
  travel?: number;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef ?? localRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(7px)"]);

  return (
    <motion.div
      ref={localRef}
      style={reduceMotion ? undefined : { y, scale, opacity, filter }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
