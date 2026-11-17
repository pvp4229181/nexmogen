"use client";

import { Children, ReactNode, useRef } from "react";
import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function StickyCard({
  children,
  index,
  total,
  top,
  progress,
  reduceMotion,
}: {
  children: ReactNode;
  index: number;
  total: number;
  top: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const behind = total - index - 1;
  // Depth is capped: with a long list, scaling by the full number of cards
  // behind would shrink the first card to half size, and offsetting every card
  // would push the last one far down the viewport.
  const depth = Math.min(behind, 4);
  const start = index / total;
  // Settle over the next few cards rather than over the whole list, so a card
  // is not still shrinking long after it has been covered.
  const end = Math.min(1, (index + 1 + depth) / total);

  // Cards shrink and darken as cards stack on top of them, so the pile reads
  // as depth rather than as a flat overlap.
  //
  // Darkening uses a brightness filter rather than opacity on purpose: these
  // cards sit directly on top of each other, and a translucent card shows the
  // one beneath it straight through, which reads as a rendering fault.
  const scale = useTransform(progress, [start, end], [1, 1 - depth * 0.035]);
  const brightness = useTransform(progress, [start, end], [1, depth > 0 ? 0.55 : 1]);
  const filter = useTransform(brightness, (value) => `brightness(${value})`);

  return (
    <div
      // Tagged so a deep link can measure the card's natural position with the
      // pinning switched off — see components/CaseStudyFocus.tsx.
      data-sticky-card=""
      className="lg:sticky"
      style={{ top: `${top + Math.min(index, 4) * 12}px` }}
    >
      <motion.div
        style={reduceMotion ? undefined : { scale, filter }}
        className="origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Cards that pin one over the next as you scroll, each settling back and
 * dimming under the one that covers it.
 *
 * Sticky needs a scrollable ancestor, so the surrounding section must not use
 * `.section` (which is `overflow: hidden`) — use `.section-flow` instead.
 */
export default function StickyStack({
  children,
  className = "",
  top = 104,
}: {
  children: ReactNode;
  className?: string;
  /** Distance from the viewport top the first card pins at, in pixels. */
  top?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const items = Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {items.map((child, index) => (
        <StickyCard
          key={index}
          index={index}
          total={items.length}
          top={top}
          progress={scrollYProgress}
          reduceMotion={reduceMotion}
        >
          {child}
        </StickyCard>
      ))}
    </div>
  );
}
