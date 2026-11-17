"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/**
 * Marquee whose speed, direction and skew are driven by scroll velocity: it
 * idles at `speed`, accelerates while you scroll, and reverses when you scroll
 * back up. `children` is rendered twice, so the track must be wider than the
 * viewport for the wrap to stay seamless.
 */
export default function VelocityMarquee({
  children,
  speed = 34,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  /** Idle travel in percent of the track per second. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const directionRef = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Unclamped so a hard flick can push the track well past its idle speed.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-2200, 2200], [3.5, -3.5], {
    clamp: true,
  });

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);
  const base = reverse ? -speed : speed;

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;

    let moveBy = directionRef.current * base * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    // Velocity adds to the idle drift rather than replacing it.
    moveBy += directionRef.current * moveBy * Math.abs(factor);

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        style={reduceMotion ? undefined : { x, skewX: skew }}
        className="flex w-max flex-nowrap"
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
