import Link from "next/link";
import Reveal from "@/components/Reveal";
import { FiArrowRight } from "react-icons/fi";

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
    <section className="section bg-ink !py-12 sm:!py-16 lg:!py-20">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,#120506_0%,#090607_52%,#050506_100%)] px-6 py-9 shadow-2xl shadow-primary/10 sm:rounded-[2rem] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/70 to-transparent" aria-hidden="true" />
            <div className="section-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
              <div>
                <p className="eyebrow">Start a conversation</p>
                <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
                  {description}
                </p>
              </div>

              <Link href={href} className="btn-primary group w-full whitespace-normal lg:w-auto lg:max-w-[280px]">
                <span>{label}</span>
                <FiArrowRight aria-hidden="true" className="ml-2 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
