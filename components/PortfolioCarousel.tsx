"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TiltCard from "@/components/TiltCard";
import { IProject } from "@/models/Project";

const GRADIENTS = [
  "from-primary/40 via-ink to-accent/20",
  "from-accent/30 via-ink to-primary/30",
  "from-primary-light/30 via-ink to-accent/30",
  "from-accent/20 via-ink to-primary/40",
];

export default function PortfolioCarousel({ projects }: { projects: IProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  function scrollToIndex(index: number) {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  return (
    <div className="mt-12 min-w-0 max-w-full lg:mt-16">
      <div
        ref={trackRef}
        className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => {
          const CardTag = project.websiteUrl ? "a" : "div";
          return (
            <div
              key={project.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="min-w-0 w-[88%] shrink-0 snap-start sm:w-[47%] lg:w-[31.5%]"
            >
              <TiltCard>
                <CardTag
                  {...(project.websiteUrl
                    ? { href: project.websiteUrl, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="card card-interactive group block h-full overflow-hidden p-0"
                >
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
                </CardTag>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {projects.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.name}
              type="button"
              aria-label={`Go to project ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-6 bg-primary" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
