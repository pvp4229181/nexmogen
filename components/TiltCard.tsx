"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 22,
  });
  const translateZ = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    translateZ.set(8);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    translateZ.set(0);
  }

  return (
    <div className={`min-w-0 max-w-full [perspective:1000px] ${className ?? ""}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full will-change-transform"
      >
        <motion.div style={{ translateZ, transformStyle: "preserve-3d" }} className="h-full">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
