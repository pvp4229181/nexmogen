"use client";

import { ElementType, createElement, useRef } from "react";
import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Body copy that lights up word by word as the block travels through the
 * viewport. Unlike TextReveal this is scroll-*linked*, not a one-shot
 * entrance — scrolling back up dims the words again.
 */
export default function ScrollCopy({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  const words = text.split(" ");

  if (reduceMotion) return createElement(Tag, { className }, text);

  // createElement rather than <Tag>: rendering a polymorphic ElementType as a
  // JSX tag collapses its children prop to `never`.
  return createElement(
    Tag,
    { ref, className },
    words.map((word, i) => (
      <Word
        key={`${word}-${i}`}
        progress={scrollYProgress}
        range={[i / words.length, (i + 1) / words.length]}
      >
        {word}
      </Word>
    ))
  );
}
