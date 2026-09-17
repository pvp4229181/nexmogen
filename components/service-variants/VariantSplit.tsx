import Link from "next/link";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";
import { FiArrowRight } from "react-icons/fi";

/** Full-width bands, visual alternating side to side down the page. */
export default function VariantSplit() {
  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      {services.map((service, i) => {
        const Icon = service.icon;
        const flip = i % 2 === 1;

        return (
          <Reveal
            key={service.title}
            direction={flip ? "left" : "right"}
            className="w-full"
          >
            <div className="group grid items-center gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-500 hover:border-primary-light/30 lg:grid-cols-2 lg:gap-12 lg:p-6">
              {/* Decorative panel standing in for artwork. */}
              <div
                className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(229,9,20,0.3),transparent_60%),linear-gradient(140deg,#1a090b,#050506)] lg:aspect-[4/3] ${
                  flip ? "lg:order-2" : ""
                }`}
              >
                <div className="section-grid absolute inset-0 opacity-50" />
                <div className="absolute h-40 w-40 rounded-full bg-primary/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                <Icon className="relative text-6xl text-primary-light transition-transform duration-700 group-hover:scale-110 lg:text-7xl" />
                <span className="absolute left-5 top-4 font-display text-5xl font-extrabold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`min-w-0 px-2 pb-4 lg:px-6 lg:pb-0 ${flip ? "lg:order-1" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-light">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold text-white lg:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 lg:text-base lg:leading-8">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="btn-ghost mt-8 !min-h-11 !px-6 text-xs"
                >
                  Explore service
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
