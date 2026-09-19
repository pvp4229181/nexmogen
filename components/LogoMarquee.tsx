import VelocityMarquee from "@/components/scroll/VelocityMarquee";

const CLIENTS = [
  "Mahi Chemicals",
  "Painite Travels",
  "Skillship",
  "Trueway Network",
  "Shrimani Bhadravir",
  "Aarya Construction",
  "Royal Grip",
];

/** Continuous trust strip of the brands we build for, paced by scroll speed. */
export default function LogoMarquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-white/[0.07] bg-ink/60 py-7">
      <p className="container-px mx-auto max-w-7xl text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
        Trusted by teams shipping real products
      </p>

      <VelocityMarquee
        speed={3}
        className="mt-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {CLIENTS.map((name) => (
          <span
            key={name}
            className="whitespace-nowrap pr-12 font-display text-lg font-semibold tracking-[-0.02em] text-white/30 transition-colors duration-300 hover:text-primary-light sm:pr-16 sm:text-2xl"
          >
            {name}
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
