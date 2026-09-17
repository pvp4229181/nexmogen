const CLIENTS = [
  "Mahi Chemicals",
  "Painite Travels",
  "Skillship",
  "Trueway Network",
  "Shrimani Bhadravir",
  "Aarya Construction",
  "Royal Grip",
];

/** Continuous trust strip of the brands we build for. */
export default function LogoMarquee() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative w-full overflow-hidden border-y border-white/[0.07] bg-ink/60 py-7">
      <p className="container-px mx-auto max-w-7xl text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
        Trusted by teams shipping real products
      </p>

      <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] sm:gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-lg font-semibold tracking-[-0.02em] text-white/30 transition-colors duration-300 hover:text-primary-light sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
