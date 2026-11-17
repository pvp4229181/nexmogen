"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 64 },
  down: { y: -64 },
  left: { x: 64 },
  right: { x: -64 },
  scale: { scale: 0.9 },
  none: {},
};

/**
 * Scroll-triggered entrance. Travels further, scales and de-blurs so the
 * movement actually reads on screen instead of being a token fade.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  duration = 0.85,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];
  const rotateY = direction === "left" ? 7 : direction === "right" ? -7 : 0;

  return (
    <motion.div
      initial={reduceMotion ? false : {
        opacity: 0,
        filter: "blur(10px)",
        scale: offset.scale ?? 0.98,
        x: offset.x ?? 0,
        y: offset.y ?? 0,
        z: -52,
        rotateX: direction === "up" ? 7 : direction === "down" ? -7 : 0,
        rotateY,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
      }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
