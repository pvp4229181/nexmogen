"use client";

import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Carousel rail for the hero: step buttons, a play/pause toggle, one dot per
 * slide and an "01 / 05" counter.
 *
 * The active dot stretches into a bar and fills left-to-right over `duration`,
 * which doubles as the autoplay progress indicator — the fill is keyed on the
 * slide index so it restarts from zero on every advance, and it is paused (not
 * hidden) while autoplay is stopped so the rail still reads as a position.
 */
export default function HeroControls({
  count,
  index,
  paused,
  duration,
  showProgress,
  onSelect,
  onPrev,
  onNext,
  onTogglePause,
}: {
  count: number;
  index: number;
  paused: boolean;
  duration: number;
  showProgress: boolean;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
}) {
  return (
    <div className="flex w-full items-center gap-3 sm:gap-4">
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={onPrev} aria-label="Previous slide" className="arrow-control !h-11 !w-11">
          <FiChevronLeft />
        </button>
        <button
          type="button"
          onClick={onTogglePause}
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
          aria-pressed={paused}
          className="arrow-control !h-11 !w-11"
        >
          {paused ? <FiPlay className="translate-x-px text-xs" /> : <FiPause className="text-xs" />}
        </button>
        <button type="button" onClick={onNext} aria-label="Next slide" className="arrow-control !h-11 !w-11">
          <FiChevronRight />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Go to slide ${pad(i)}`}
              aria-current={active ? "true" : undefined}
              className="group relative h-11 min-w-0 flex-1 cursor-pointer"
            >
              <span
                className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full transition-colors duration-200 ${
                  active ? "bg-white/15" : "bg-white/10 group-hover:bg-white/25"
                }`}
              >
                {active && (
                  <span
                    key={showProgress ? index : "static"}
                    className="hero-dot-fill block h-full w-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                    style={{
                      animationDuration: `${duration}ms`,
                      animationPlayState: paused ? "paused" : "running",
                      ...(showProgress ? null : { animation: "none", transform: "none" }),
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="hidden shrink-0 font-display text-xs tracking-[0.18em] text-white/40 sm:block">
        <span className="text-white/80">{pad(index)}</span>
        <span className="px-1.5 text-white/25">/</span>
        <span>{pad(count - 1)}</span>
      </p>
    </div>
  );
}
