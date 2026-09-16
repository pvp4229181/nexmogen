import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { ITestimonial } from "@/models/Testimonial";

function Stars({ rating = 5 }: { rating?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="mt-5 flex items-center gap-1 text-primary-light">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: ITestimonial }) {
  return (
    <div className="w-[calc(100vw-2rem)] max-w-[310px] shrink-0 sm:w-[400px] sm:max-w-none">
      <div className="card relative h-full min-h-[340px] overflow-hidden p-6 sm:min-h-[360px] sm:p-9">
        <span className="pointer-events-none absolute right-7 top-2 font-serif text-8xl leading-none text-primary-light/10">“</span>
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-primary-light/20 bg-primary/15 text-primary-light">
          {t.imageUrl ? (
            <Image
              src={t.imageUrl}
              alt={t.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <FiUser size={22} />
          )}
        </div>
        <p className="mt-5 text-sm font-bold uppercase tracking-wide text-white">
          {t.name}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/50">
          {t.role}
        </p>
        <p className="mt-6 leading-7 text-white/65">{t.quote}</p>
        <Stars rating={t.rating} />
      </div>
    </div>
  );
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  if (!testimonials.length) return null;

  const loop = [...testimonials, ...testimonials];

  return (
    <div className="group mt-14 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] lg:mt-16">
      <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
