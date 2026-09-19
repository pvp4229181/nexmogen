"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SoftwareWorkflowDemo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      setReducedMotion(media.matches);
      if (media.matches) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    updatePlayback();
    media.addEventListener("change", updatePlayback);
    return () => media.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none relative w-full ${className}`}>
      <div className="absolute inset-[-10%] bg-[radial-gradient(circle,rgba(229,9,20,.2),transparent_64%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#08111b]/90 p-2 shadow-[0_42px_100px_rgba(0,0,0,.55),0_0_50px_rgba(229,9,20,.1)]">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] px-3">
          <span className="h-2 w-2 rounded-full bg-primary-light/90" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="ml-3 h-1.5 w-24 rounded-full bg-white/[0.07]" />
          <span className="ml-auto flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-300/65">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />
            Live workspace
          </span>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem]">
          <video ref={videoRef} className="h-full w-full object-cover" poster="/generated/nexmogen-software-dashboard.png" autoPlay loop muted playsInline preload="metadata">
            <source src="/generated/nexmogen-software-dashboard.mp4" type="video/mp4" />
          </video>
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.055] to-transparent blur-xl"
            animate={reducedMotion ? { x: "-140%" } : { x: ["-140%", "420%"] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 5.5, ease: "linear", repeat: Infinity, repeatDelay: 2.5 }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}
