import Link from "next/link";
import Reveal from "@/components/Reveal";
import { FiArrowRight } from "react-icons/fi";
import { HERO_VIDEO_URL } from "@/lib/constants";

export default function CtaSection({
  title = "Let's Build Something Great Together",
  description = "Get in touch with Nexmogen for premium business services. Whether you need innovative design, custom development, or complete project solutions, we're here to help!",
  href = "/contact",
  label = "Request a Free Quote Now",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="section bg-ink">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-black px-5 py-14 text-center shadow-2xl shadow-primary/10 sm:rounded-[2rem] sm:px-12 sm:py-16 md:py-24">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={HERO_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,14,0.92),rgba(5,5,14,0.7),rgba(5,5,14,0.92))]" />
            <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative z-10">
              <p className="eyebrow justify-center">Start a conversation</p>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">
                {description}
              </p>
              <Link href={href} className="btn-primary group mt-9 w-full sm:w-auto">
                {label}
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
