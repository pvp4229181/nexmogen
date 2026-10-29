"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const screens = [
  { name: "leads", label: "New lead" },
  { name: "assignment", label: "Assign" },
  { name: "inbox", label: "Follow up" },
  { name: "meeting", label: "Book meeting" },
  { name: "won", label: "Close deal" },
];

export default function CrmPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    if (!visible || reducedMotion !== false || interacting) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setCurrent((value) => (value + 1) % screens.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [visible, reducedMotion, interacting]);

  return (
    <div ref={ref} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className="relative aspect-[5/3] overflow-hidden rounded-xl border border-white/15 bg-surface shadow-2xl shadow-black/40" aria-label="Nexmogen CRM workflow preview">
        {screens.map((screen, index) => (
          <Image key={screen.name} src={`/products/nexmogen-crm-${screen.name}-hd.webp`} alt={`Nexmogen CRM: ${screen.label}, using sample data`} aria-hidden={index !== current} fill sizes="(min-width: 1280px) 568px, (min-width: 1024px) 45vw, 100vw" className={`object-contain transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${index === current ? "translate-x-0 scale-100 opacity-100" : "translate-x-5 scale-105 opacity-0"}`} />
        ))}
      </div>
      <div className="mt-3 flex min-h-11 items-center justify-center">
        <motion.span key={screens[current].name} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="whitespace-nowrap text-center text-xs text-white/65">{screens[current].label}</motion.span>
      </div>
    </div>
  );
}
