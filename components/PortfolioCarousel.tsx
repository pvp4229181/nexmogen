"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SpotlightCard from "@/components/SpotlightCard";
import { IProject } from "@/models/Project";
import { getCaseStudySlugByName } from "@/lib/case-studies";

const GRADIENTS = [
  "from-primary/40 via-ink to-accent/20",
  "from-accent/30 via-ink to-primary/30",
  "from-primary-light/30 via-ink to-accent/30",
  "from-accent/20 via-ink to-primary/40",
];

const AUTO_SCROLL_MS = 4200;

export default function PortfolioCarousel({ projects }: { projects: IProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    const firstCard = cardRefs.current[0];
    if (!track || !firstCard) return;

    const start = firstCard.offsetLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const target = Math.min(card.offsetLeft - start, maxScroll);
      const distance = Math.abs(track.scrollLeft - target);
      if (distance <= closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActive(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveFromScroll);
    };

    syncActiveFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [projects.length, syncActiveFromScroll]);

  /** Only auto-scroll while the rail is actually on screen. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    // Scroll the rail itself so the page never jumps vertically.
    const delta =
      card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  }, []);

  /** Step by +/-1 with wrap-around, same as the auto-scroll does. */
  const step = useCallback(
    (direction: 1 | -1) => {
      setActive((i) => {
        const next = (i + direction + projects.length) % projects.length;
        scrollToIndex(next);
        return next;
      });
    },
    [projects.length, scrollToIndex]
  );

  useEffect(() => {
    if (projects.length < 2) return;
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % projects.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_SCROLL_MS);

    return () => clearInterval(id);
  }, [paused, inView, projects.length, scrollToIndex]);

  return (
    <div className="mt-12 min-w-0 max-w-full lg:mt-16">
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
        onPointerUp={(event) => event.pointerType !== "mouse" && setPaused(false)}
        onPointerCancel={() => setPaused(false)}
        className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => {
          const caseStudySlug = getCaseStudySlugByName(project.name);
          // A card leads to its case study; the live site is the fallback.
          const cardClass =
            "card card-interactive group block h-full overflow-hidden p-0";
          const cardBody = (
            <>
              {project.imageUrl ? (
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 47vw, 86vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  className={`h-56 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                />
              )}
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold text-white">
                  {project.name}
                </h3>
                <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                  {project.category}
                </span>
              </div>
            </>
          );

          return (
            <div
              key={project.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="min-w-0 w-[88%] shrink-0 snap-start sm:w-[47%] lg:w-[31.5%]"
            >
              <SpotlightCard>
                {caseStudySlug ? (
                  <Link
                    href={`/case-studies#${caseStudySlug}`}
                    aria-label={`Read the ${project.name} case study`}
                    className={cardClass}
                  >
                    {cardBody}
                  </Link>
                ) : project.websiteUrl ? (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {cardBody}
                  </a>
                ) : (
                  <div className={cardClass}>{cardBody}</div>
                )}
              </SpotlightCard>
            </div>
          );
        })}
      </div>

      {projects.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => step(-1)}
            className="arrow-control !h-11 !w-11"
          >
            <FiArrowLeft />
          </button>

          <div className="flex items-center gap-0.5">
            {projects.map((project, i) => (
              <button
                key={project.name}
                type="button"
                aria-label={`Go to project ${i + 1}`}
                aria-current={active === i ? "true" : undefined}
                onClick={() => {
                  setActive(i);
                  scrollToIndex(i);
                }}
                className={`group flex h-11 items-center justify-center transition-all ${active === i ? "w-8" : "w-4"}`}
              >
                <span className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-primary" : "w-1.5 bg-white/20 group-hover:bg-white/45"}`} />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => step(1)}
            className="arrow-control !h-11 !w-11"
          >
            <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
