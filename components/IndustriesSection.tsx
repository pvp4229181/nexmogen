import Reveal from "@/components/Reveal";
import ScrollCopy from "@/components/scroll/ScrollCopy";
import HorizontalRail from "@/components/scroll/HorizontalRail";
import TextReveal from "@/components/TextReveal";
import SpotlightCard from "@/components/SpotlightCard";
import {
  FiShoppingBag,
  FiTruck,
  FiHeart,
  FiHome,
  FiBookOpen,
  FiDollarSign,
  FiTool,
  FiMapPin,
} from "react-icons/fi";

const INDUSTRIES = [
  { icon: FiShoppingBag, name: "E-commerce", note: "Storefronts, catalogues, checkout" },
  { icon: FiBookOpen, name: "Education", note: "LMS platforms and student portals" },
  { icon: FiTool, name: "Manufacturing", note: "B2B catalogues and dealer portals" },
  { icon: FiHeart, name: "Healthcare", note: "Booking, records, patient apps" },
  { icon: FiDollarSign, name: "Fintech", note: "Dashboards and secure workflows" },
  { icon: FiHome, name: "Real estate", note: "Listings, CRM, lead capture" },
  { icon: FiMapPin, name: "Travel", note: "Itineraries, enquiries, bookings" },
  { icon: FiTruck, name: "Logistics", note: "Tracking and operations tooling" },
];

export default function IndustriesSection() {
  return (
    <section className="section-flow bg-surface">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="pt-4">
      <HorizontalRail
        className="mt-12 px-5 sm:px-10 lg:px-16 xl:px-20"
        ariaLabel="Industries we work in"
        header={
          <div className="container-px relative mx-auto max-w-7xl">
            <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow">Industries</p>
                <TextReveal
                  text="Where our work already lives"
                  highlight="lives"
                  className="section-title"
                />
              </div>
              <ScrollCopy
                className="section-copy max-w-2xl lg:ml-auto"
                text="We have shipped in enough sectors to know the difference between a generic build and one that understands how your customers actually buy, book, or learn."
              />
            </Reveal>
          </div>
        }
      >
        {INDUSTRIES.map((industry) => {
          const Icon = industry.icon;
          return (
            <SpotlightCard
              key={industry.name}
              className="w-[248px] shrink-0 snap-start sm:w-[300px]"
            >
              <article className="card card-interactive flex h-full min-h-[210px] flex-col p-6">
                <Icon className="text-2xl text-primary-light" />
                <h3 className="mt-6 font-display text-lg font-semibold text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  {industry.note}
                </p>
              </article>
            </SpotlightCard>
          );
        })}
      </HorizontalRail>
      </div>
    </section>
  );
}
