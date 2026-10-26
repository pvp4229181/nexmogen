"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  { screen: "leads", label: "New lead", copy: "Capture a customer enquiry in your workspace." },
  { screen: "assignment", label: "Assign", copy: "Give the lead to the teammate who owns the next step." },
  { screen: "inbox", label: "Follow up", copy: "Keep the conversation and customer context together." },
  { screen: "meeting", label: "Book meeting", copy: "Schedule the next conversation for your team." },
  { screen: "won", label: "Close deal", copy: "Track the opportunity through to a won deal." },
];

export default function CrmWorkflow() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const step = steps[current];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setCurrent((value) => (value + 1) % steps.length);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <figure id="crm-workflow" className="min-w-0 scroll-mt-24">
      <p className="mb-5 min-h-[3.5rem] text-base leading-7 text-white/65 sm:min-h-7 sm:text-lg">{step.copy}</p>
      <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/15 bg-[#08080a] shadow-2xl shadow-black/30">
        {steps.map((item, index) => (
          <motion.div key={item.screen} aria-hidden={current !== index} className="absolute inset-0 will-change-transform" initial={false} animate={current === index ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: reduceMotion ? 0 : 5, scale: reduceMotion ? 1 : 0.995 }} transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Image src={`/products/nexmogen-crm-${item.screen}-hd.webp`} alt={`Nexmogen CRM ${item.label.toLowerCase()} screen using sample data`} fill sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw" className="object-cover object-top" priority={index === 0} />
          </motion.div>
        ))}
      </div>
    </figure>
  );
}
