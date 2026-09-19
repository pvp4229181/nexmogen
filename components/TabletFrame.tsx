import Image from "next/image";

/**
 * Landscape tablet mockup for site screenshots. The screenshots are captured at
 * 1120x700, so the screen is held at 16:10 and the image is pinned to the top —
 * a long page crops from the bottom rather than squashing the hero.
 */
export default function TabletFrame({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 90vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative w-full max-w-full">
      {/* Glow pooling under the device */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-primary/10 opacity-70 blur-3xl" />

      <div className="relative rounded-[1.75rem] border border-white/15 bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-white/[0.02] p-2.5 shadow-2xl shadow-black/60 sm:rounded-[2rem] sm:p-3.5">
        {/* Inner bezel */}
        <div className="relative rounded-[1.25rem] border border-white/10 bg-black p-2 sm:rounded-[1.5rem] sm:p-2.5">
          {/* Front camera */}
          <span className="absolute left-1/2 top-[7px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/25 ring-1 ring-white/10 sm:top-[9px]" />

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.75rem] bg-surface sm:rounded-[1rem]">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover object-top"
            />
            {/* Screen sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.10]" />
          </div>
        </div>
      </div>
    </div>
  );
}
