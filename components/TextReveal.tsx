"use client";

import { motion } from "framer-motion";

/**
 * Headline that assembles word by word as it scrolls into view. Each word
 * rises out of its own clipping mask, so the line builds rather than fades.
 */
export default function TextReveal({
  text,
  className = "",
  highlight,
  delay = 0,
}: {
  text: string;
  className?: string;
  /** Words matched here render in the brand gradient. */
  highlight?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const highlightWords = new Set(
    (highlight ?? "").split(" ").filter(Boolean).map((w) => w.toLowerCase())
  );

  return (
    <motion.h2
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      className={className}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            variants={{
              hidden: { y: "108%", opacity: 0, rotate: 4 },
              show: {
                y: "0%",
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={`inline-block ${
              highlightWords.has(word.toLowerCase().replace(/[^a-z]/g, ""))
                ? "gradient-text"
                : ""
            }`}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.h2>
  );
}
