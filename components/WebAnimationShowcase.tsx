"use client";

import { useEffect, useRef, useState } from "react";
import { Lottie } from "lottie-react";
import { useReducedMotion } from "framer-motion";

const ANIMATIONS = {
  development: {
    src: "/animations/web-development.json",
    label: "Animated web development illustration",
  },
  design: {
    src: "/animations/web-development-design.json",
    label: "Animated web development and design illustration",
  },
} as const;

export type WebAnimationVariant = keyof typeof ANIMATIONS;

/**
 * The source Lottie files ship recoloured onto the brand palette (see the
 * recolour pass in the animation assets), so they already read as dark artwork
 * and need no card behind them and no hue filter over them — only the ambient
 * glow the rest of the site's motion pieces sit on.
 */
export default function WebAnimation({
  variant,
  className = "",
}: {
  variant: WebAnimationVariant;
  className?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const animation = ANIMATIONS[variant];

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={containerRef}
      role="img"
      aria-label={animation.label}
      className={`relative ${className}`}
    >
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(229,9,20,.22),transparent_66%)] blur-3xl" />
      <div className="relative aspect-square">
        {isVisible ? (
          <Lottie
            src={animation.src}
            autoplay={!prefersReducedMotion}
            loop
            className="relative h-full w-full"
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-[18%] animate-pulse rounded-full bg-primary/10" aria-hidden="true" />
        )}
      </div>
    </figure>
  );
}
