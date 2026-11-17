"use client";

import { MouseEvent, ReactNode, useRef } from "react";

/**
 * Card shell that tracks the pointer and drives a CSS radial highlight plus a
 * subtle 3D tilt. Pure CSS variables — no re-renders while the pointer moves.
 */
export default function SpotlightCard({
  children,
  className = "",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    node.style.setProperty("--spot-x", `${x}px`);
    node.style.setProperty("--spot-y", `${y}px`);
    node.style.setProperty("--spot-opacity", "1");

    if (tilt) {
      const rx = (y / rect.height - 0.5) * -8;
      const ry = (x / rect.width - 0.5) * 8;
      node.style.setProperty("--tilt-x", `${rx}deg`);
      node.style.setProperty("--tilt-y", `${ry}deg`);
    }
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--spot-opacity", "0");
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`spotlight ${tilt ? "spotlight-tilt" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
