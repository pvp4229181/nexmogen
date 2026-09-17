"use client";

import { useEffect } from "react";

const SECTION_SELECTOR = "main section:not([data-no-scroll-depth])";

/**
 * Drives decorative section depth from one passive scroll listener. Content
 * remains stationary; CSS consumes these values only on background planes.
 */
export default function ScrollDepth() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sections: HTMLElement[] = [];
    let frame = 0;

    const collectSections = () => {
      sections.forEach((section) => section.classList.remove("scroll-depth-section"));
      sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      sections.forEach((section) => section.classList.add("scroll-depth-section"));
    };

    const render = () => {
      frame = 0;

      if (motionQuery.matches) {
        sections.forEach((section) => {
          section.style.removeProperty("--depth-y");
          section.style.removeProperty("--depth-rz");
          section.style.removeProperty("--depth-opacity");
        });
        return;
      }

      const viewportHeight = window.innerHeight;
      const mobileStrength = window.innerWidth < 768 ? 0.38 : 1;
      const values = sections.map((section) => {
        const rect = section.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportHeight / 2;
        const progress = Math.max(
          -1,
          Math.min(1, distance / ((viewportHeight + rect.height) / 2))
        );

        return {
          section,
          y: progress * -52 * mobileStrength,
          rotation: progress * 2.4 * mobileStrength,
          opacity: 0.32 + (1 - Math.abs(progress)) * 0.28,
        };
      });

      values.forEach(({ section, y, rotation, opacity }) => {
        section.style.setProperty("--depth-y", `${y.toFixed(2)}px`);
        section.style.setProperty("--depth-rz", `${rotation.toFixed(2)}deg`);
        section.style.setProperty("--depth-opacity", opacity.toFixed(2));
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    collectSections();
    schedule();

    const observer = new MutationObserver(() => {
      collectSections();
      schedule();
    });

    const main = document.querySelector("main");
    if (main) observer.observe(main, { childList: true, subtree: true });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motionQuery.addEventListener("change", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      sections.forEach((section) => section.classList.remove("scroll-depth-section"));
    };
  }, []);

  return null;
}
