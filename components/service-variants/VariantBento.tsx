import Link from "next/link";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { services } from "@/lib/services";
import { FiArrowUpRight } from "react-icons/fi";

// Feature tile, then two pairs, then a full-width closer.
const SPANS = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-6",
];

export default function VariantBento() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {services.map((service, i) => {
        const Icon = service.icon;
        const large = i === 0 || i === 5;

        return (
          <Reveal
            key={service.title}
            delay={i * 0.07}
            direction={i % 2 === 0 ? "up" : "scale"}
            className={`${SPANS[i]} h-full`}
          >
            <SpotlightCard className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className={`card card-interactive group flex h-full flex-col overflow-hidden p-7 sm:p-8 ${
                  large ? "lg:p-10" : ""
                } ${i === 0 ? "lg:min-h-[22rem]" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex items-center justify-center rounded-2xl border border-primary-light/15 bg-primary/10 text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white ${
                      large ? "h-16 w-16 text-3xl" : "h-12 w-12 text-2xl"
                    }`}
                  >
                    <Icon />
                  </div>
                  <FiArrowUpRight className="text-xl text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-light" />
                </div>

                <h3
                  className={`mt-8 font-display font-semibold text-white ${
                    large ? "text-2xl lg:text-3xl" : "text-xl"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 text-white/55 ${
                    large ? "max-w-2xl line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {service.description}
                </p>

                <span className="mt-auto pt-7 text-sm font-semibold text-primary-light">
                  Explore service
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  );
}
