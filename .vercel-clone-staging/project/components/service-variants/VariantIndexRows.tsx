import Link from "next/link";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";
import { FiArrowUpRight } from "react-icons/fi";

/** No cards: an editorial index where each row opens on hover. */
export default function VariantIndexRows() {
  return (
    <div className="border-t border-white/10">
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <Reveal key={service.title} delay={i * 0.05} direction="right">
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex flex-col gap-4 overflow-hidden border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.03] lg:py-10"
            >
              {/* Red wash sweeping in from the left on hover. */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,rgba(229,9,20,0.18),transparent_70%)] transition-transform duration-700 ease-out group-hover:translate-x-0" />

              <div className="relative flex items-center gap-6 lg:gap-10">
                <span className="font-display text-sm font-bold tabular-nums text-primary-light/60">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Icon className="hidden shrink-0 text-2xl text-primary-light transition-transform duration-500 group-hover:scale-110 sm:block" />

                <h3 className="min-w-0 flex-1 font-display text-2xl font-bold text-white transition-transform duration-500 group-hover:translate-x-2 lg:text-4xl">
                  {service.title}
                </h3>

                <FiArrowUpRight className="shrink-0 text-2xl text-white/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-light lg:text-3xl" />
              </div>

              {/* Collapsed by default, springs open on hover. */}
              <div className="relative grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="max-w-3xl pt-2 text-sm leading-7 text-white/55 lg:pl-[4.5rem]">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
