"use client";

import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Media that slowly settles as it crosses the viewport — the inner layer is
 * over-sized and eases back to its resting scale while drifting against the
 * scroll, so stills gain the same depth the video panels have.
 */
export default function ScrollZoom({
  children,
  className = "",
  from = 1.22,
  to = 1,
  drift = 26,
}: {
  children: ReactNode;
  className?: string;
  /** Starting scale as the block enters the viewport. */
  from?: number;
  to?: number;
  /** Counter-scroll travel in pixels across the full pass. */
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={reduceMotion ? undefined : { scale, y }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
