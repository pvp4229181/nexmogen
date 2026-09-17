import Link from "next/link";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";
import { FiArrowUpRight } from "react-icons/fi";

/** The existing 3x2 grid, restyled so a gradient sweeps up to fill on hover. */
export default function VariantHoverFill() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <Reveal key={service.title} delay={(i % 3) * 0.1} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-light/40 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Gradient fill rising from the bottom edge. */}
              <span className="pointer-events-none absolute inset-0 translate-y-full bg-[linear-gradient(to_top,#9f0710,#e50914_55%,rgba(255,77,87,0.32))] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-light/20 bg-primary/10 text-2xl text-primary-light transition-colors duration-500 group-hover:border-white/40 group-hover:bg-white/15 group-hover:text-white">
                  <Icon />
                </div>
                <span className="font-display text-3xl font-extrabold text-white/10 transition-colors duration-500 group-hover:text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative mt-8 font-display text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="relative mt-4 line-clamp-3 text-sm leading-7 text-white/55 transition-colors duration-500 group-hover:text-white/85">
                {service.description}
              </p>

              <span className="relative mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-primary-light transition-colors duration-500 group-hover:text-white">
                Explore service
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
