"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Mounts a WebGL scene only when it is worth paying for it: the section is on
 * screen, the visitor has not asked for reduced motion, and the device is not
 * an obvious low-end target. Everything else gets the CSS fallback.
 */
export default function SceneGate({
  children,
  fallback = null,
  className,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarseAndSmall =
      window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 640;
    const lowCores =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2;

    if (reducedMotion || coarseAndSmall || lowCores) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {enabled ? children : fallback}
    </div>
  );
}
