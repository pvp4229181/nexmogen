"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Scroll-linked vertical drift. `speed` is how far the element travels across
 * the viewport pass, in pixels — negative moves it against the scroll.
 */
export default function Parallax({
  children,
  speed = 80,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 60, damping: 22, restDelta: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
