import Reveal from "@/components/Reveal";
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
    <section className="section bg-surface">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

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
          <p className="section-copy max-w-2xl lg:ml-auto">
            We have shipped in enough sectors to know the difference between a
            generic build and one that understands how your customers actually
            buy, book, or learn.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <Reveal
                key={industry.name}
                delay={(i % 4) * 0.09}
                direction="scale"
                className="h-full"
              >
                <SpotlightCard className="card card-interactive h-full p-6">
                  <Icon className="text-2xl text-primary-light" />
                  <h3 className="mt-6 font-display text-lg font-semibold text-white">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    {industry.note}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
