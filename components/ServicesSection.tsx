import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import VariantBento from "@/components/service-variants/VariantBento";

export default function ServicesSection() {
  return (
    <section id="services" className="section bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute right-[-12rem] top-16 h-[34rem] w-[34rem] rounded-full border border-accent/10 shadow-[0_0_120px_rgba(229,9,20,.13)]" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="eyebrow">What we build</p><TextReveal text="Digital systems that move businesses" highlight="move" className="section-title" /></div>
          <div className="lg:ml-auto lg:max-w-xl"><p className="section-copy">From the first interface to the intelligence behind it, Nexmogen brings design, engineering, automation, and growth into one focused delivery team.</p><div className="mt-6 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/45"><span className="rounded-full border border-white/10 px-3 py-2">Strategy</span><span className="rounded-full border border-white/10 px-3 py-2">Design</span><span className="rounded-full border border-white/10 px-3 py-2">Engineering</span><span className="rounded-full border border-white/10 px-3 py-2">Growth</span></div></div>
        </Reveal>
        <div className="mt-14 lg:mt-20"><VariantBento /></div>
      </div>
    </section>
  );
}
