"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Pinned section whose vertical scroll drives a horizontal track. The outer
 * element is made tall by exactly the overflow distance, so the rail finishes
 * travelling at the moment the section releases — no dead scroll at either end.
 *
 * Sticky needs a scrollable ancestor, so the surrounding section must not use
 * `.section` (which is `overflow: hidden`) — use `.section-flow` instead.
 */
export default function HorizontalRail({
  children,
  className = "",
  ariaLabel,
  minWidth = 1024,
  header,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Rendered above the track, and pinned along with it. */
  header?: ReactNode;
  /** Viewport width, in pixels, below which the rail stays a swipeable row. */
  minWidth?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => {
      // A zero width means the node is detached or display:none, not that the
      // rail suddenly fits — taking it at face value would unpin the rail and
      // leave it latched there.
      if (!content.offsetWidth) return;

      // How far the content must travel for its right edge to reach the viewport.
      setDistance(Math.max(0, content.offsetWidth - window.innerWidth + 96));
      // Pinning a full viewport height fights mobile browser chrome, so narrow
      // screens keep the swipeable row instead.
      setWide(window.innerWidth >= minWidth);
    };

    measure();

    // Observe the content itself, not its scroll container: the container's box
    // is the viewport width and never changes, so watching it would latch
    // whatever width happened to exist on the first frame.
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    window.addEventListener("resize", measure);
    // Web fonts land after first paint and reflow the cards.
    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [minWidth]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const x = useTransform(eased, [0, 1], [0, -distance]);

  // Pin only once the content is known to overflow. Until then — and whenever
  // motion is reduced or the screen is narrow — the same content renders as a
  // plain swipeable row, which keeps it measurable and reachable either way.
  const pinned = !reduceMotion && wide && distance > 0;

  // The element chain is identical in both modes on purpose: switching shape
  // here would remount the content, and the ref would measure a detached node.
  return (
    <div
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : ""
        }
      >
        {/* Pinned along with the track, so the held frame is not just a
            floating strip of cards on an empty screen. */}
        {header}

        <div className={pinned ? "" : "snap-x snap-mandatory overflow-x-auto pb-4"}>
          <motion.div
            ref={contentRef}
            style={pinned ? { x } : undefined}
            className={`flex w-max gap-5 ${className}`}
            aria-label={ariaLabel}
          >
            {children}
          </motion.div>
        </div>

        {pinned && (
          <div className="container-px mx-auto mt-10 w-full max-w-7xl" aria-hidden="true">
            <div className="h-px w-full bg-white/10">
              <motion.div
                style={{ scaleX: eased }}
                className="h-full w-full origin-left bg-gradient-to-r from-primary via-primary-light to-accent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
