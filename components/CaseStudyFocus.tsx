"use client";

import { useEffect } from "react";

/**
 * Deep-links from the portfolio carousel (`/case-studies#slug`) to the chosen
 * case study card while leaving the full stack available to scroll through.
 *
 * The native anchor jump is not good enough here for two reasons:
 *
 * 1. The cards sit inside <StickyStack>, so a card that is already pinned
 *    reports its *stuck* position, not the position it occupies in the flow.
 * 2. Cards enter through <Reveal>, which offsets and blurs them until they
 *    scroll into view, so the browser measures a card that has not landed yet.
 *
 * So the position is measured with pinning switched off (see the
 * `data-anchor-measuring` rule in globals.css) on the sticky wrapper — which
 * sits outside the reveal transform — and the scroll is driven from here.
 */

/** Pin distance used where the cards are not sticky (below `lg`). */
const FALLBACK_OFFSET = 96;

export default function CaseStudyFocus({ slugs }: { slugs: string[] }) {
  // The list is static content, so key the effect on its contents rather than
  // on the array identity the server component hands over each render.
  const key = slugs.join(",");

  useEffect(() => {
    const known = new Set(key.split(","));
    let userMoved = false;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    /** Distance from the viewport top the card settles at once pinned. */
    function pinOffset(wrapper: HTMLElement | null) {
      if (!wrapper) return FALLBACK_OFFSET;
      const style = getComputedStyle(wrapper);
      if (style.position !== "sticky") return FALLBACK_OFFSET;
      const top = parseFloat(style.top);
      return Number.isFinite(top) ? top : FALLBACK_OFFSET;
    }

    function scrollToCard(article: HTMLElement, behavior: ScrollBehavior) {
      const wrapper = article.closest<HTMLElement>("[data-sticky-card]");
      const target = wrapper ?? article;
      // Read the pin distance first: `position: static` reports `top: auto`.
      const offset = pinOffset(wrapper);

      const root = document.documentElement;
      root.setAttribute("data-anchor-measuring", "");
      // Reading the rect flushes the style change, so this is the card's
      // natural position in the flow rather than its pinned one.
      const top = target.getBoundingClientRect().top + window.scrollY;
      root.removeAttribute("data-anchor-measuring");

      window.scrollTo({ top: Math.max(top - offset, 0), behavior });
    }

    function mark(slug: string | null) {
      document.querySelectorAll<HTMLElement>("[data-case-study]").forEach((el) => {
        const focused = el.id === slug;
        el.toggleAttribute("data-focused", focused);
      });
    }

    function slugFromHash() {
      const raw = window.location.hash.slice(1);
      if (!raw) return null;
      let slug = raw;
      try {
        slug = decodeURIComponent(raw);
      } catch {
        /* a malformed hash is simply not one of ours */
      }
      return known.has(slug) ? slug : null;
    }

    function focus(behavior: ScrollBehavior) {
      const slug = slugFromHash();
      mark(slug);
      if (!slug) return;

      const article = document.getElementById(slug);
      if (article) scrollToCard(article, behavior);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The browser has already made its own attempt at the anchor by now, so the
    // first correction is instant — a smooth one would read as a double jump.
    const frame = requestAnimationFrame(() => focus("instant"));

    /** Web fonts and late images can still shift the card after the first pass. */
    function recheck() {
      if (cancelled || userMoved) return;
      focus("instant");
    }

    const onMove = () => {
      userMoved = true;
    };

    const onHashChange = () => {
      userMoved = false;
      focus(reduceMotion ? "instant" : "smooth");
    };

    // The router does its own hash scroll on a client-side navigation, and web
    // fonts land later still, so the position is re-asserted a few times until
    // the visitor takes over.
    [80, 220, 520].forEach((delay) => timers.push(setTimeout(recheck, delay)));
    document.fonts?.ready.then(recheck).catch(() => {});
    window.addEventListener("load", recheck);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", onMove, { passive: true });
    window.addEventListener("touchstart", onMove, { passive: true });
    window.addEventListener("keydown", onMove);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      mark(null);
      window.removeEventListener("load", recheck);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", onMove);
      window.removeEventListener("touchstart", onMove);
      window.removeEventListener("keydown", onMove);
    };
  }, [key]);

  return null;
}
