import type { Metadata } from "next";
import {
  FiAward,
  FiClock,
  FiHeadphones,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import ProcessSection from "@/components/ProcessSection";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "About | Nexmogen",
  description:
    "Nexmogen is a team of passionate creators and tech enthusiasts dedicated to delivering innovative digital solutions that drive business success.",
};

const capabilities = [
  "Backend Development",
  "Front-end Development",
  "Mobile App Development",
  "Website Development",
  "Website Maintenance",
  "WordPress Development",
];

const reasons = [
  {
    icon: FiAward,
    title: "Best Quality Designs",
    description:
      "At Nexmogen, we create stunning designs that blend creativity with functionality. Our focus is on delivering high-quality, user-centric designs that make a lasting impact",
  },
  {
    icon: FiClock,
    title: "24x7 Live Support",
    description:
      "We are here for you around the clock! Our dedicated team provides continuous live support to assist you anytime, ensuring smooth and seamless experiences.",
  },
  {
    icon: FiTarget,
    title: "Result Oriented Projects",
    description:
      "At Nexmogen, we focus on delivering projects that drive measurable results. Our approach is tailored to meet your goals and ensure success at every step.",
  },
  {
    icon: FiHeadphones,
    title: "Award Winning Support Team",
    description:
      "Our support team is recognized for excellence, providing exceptional service that ensures your needs are met promptly and efficiently, every time.",
  },
  {
    icon: FiTrendingUp,
    title: "Best ROI Techniques",
    description:
      "At Nexmogen, we focus on strategies that maximize your return on investment. Our tailored approaches are designed to deliver measurable results and long-term success.",
  },
  {
    icon: FiUsers,
    title: "Experienced Professionals",
    description:
      "Our team of skilled experts brings years of industry experience to deliver top-quality solutions. We are dedicated to driving your success with innovative, reliable, and efficient services.",
  },
];

const stats = [
  { value: "57", label: "Satisfied Clients" },
  { value: "130", label: "Projects Completed" },
  { value: "18", label: "Accolades Earned" },
  { value: "36K+", label: "Lines\u00a0of\nCode" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Welcome to Nexmogen – Your Digital Innovation Partner"
        title="About Us"
        description="We craft innovative digital solutions through creative design and expert development, turning ideas into success."
      />

      <section className="relative overflow-hidden bg-ink py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_85%_100%,rgba(0,224,198,0.08),transparent_34%)]" />
        <div className="container-px relative mx-auto grid max-w-6xl gap-7 md:grid-cols-3">
          <Reveal className="h-full">
            <article className="h-full min-h-[280px] border border-white/10 bg-surface px-6 pb-9 pt-0 sm:px-9 sm:pb-10">
              <span className="block h-1 w-12 bg-gradient-to-r from-primary-light to-accent" />
              <h2 className="mt-6 font-display text-2xl font-bold text-white">
                Who Are We
              </h2>
              <p className="mt-5 text-[15px] font-medium leading-6 text-white/90">
                At Nexmogen, we are a team of passionate creators and tech
                enthusiasts dedicated to delivering innovative digital solutions
                that drive business success.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <article className="h-full min-h-[280px] border border-white/10 bg-surface px-6 pb-9 pt-0 sm:px-9 sm:pb-10">
              <span className="block h-1 w-12 bg-gradient-to-r from-primary-light to-accent" />
              <h2 className="mt-6 font-display text-2xl font-bold text-white">
                Our Mission
              </h2>
              <p className="mt-5 text-[15px] font-medium leading-6 text-white/90">
                At Nexmogen, our mission is to deliver innovative, high-quality
                digital solutions that empower businesses to thrive. We are
                committed to excellence, creativity, and driving measurable
                success for our clients.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.16} className="h-full">
            <article className="h-full min-h-[280px] border border-white/10 bg-surface px-6 pb-9 pt-0 sm:px-9 sm:pb-10">
              <span className="block h-1 w-12 bg-gradient-to-r from-primary-light to-accent" />
              <h2 className="mt-6 font-display text-2xl font-bold text-white">
                What We Do
              </h2>
              <ul className="mt-5 space-y-1.5">
                {capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 text-[15px] font-medium leading-5 text-white/90"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-0 w-0 shrink-0 border-y-[4px] border-l-[5px] border-y-transparent border-l-accent"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <ProcessSection />

      <section className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="container-px relative mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-light">
              Why Choose Us?
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Built around the results that matter.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              At Nexmogen, we deliver innovative solutions that drive results.
              Our expert team combines creativity and technology to help your
              business thrive.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Reveal key={reason.title} delay={index * 0.06} className="h-full">
                  <TiltCard className="h-full">
                    <article className="card group h-full p-7 transition-colors hover:border-primary/40 hover:bg-white/[0.07]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon />
                      </div>
                      <h3 className="mt-6 font-display text-xl font-semibold text-white">
                        {reason.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/60">
                        {reason.description}
                      </p>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-surface py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(59,130,246,0.1),transparent_42%)]" />
        <div className="container-px relative mx-auto max-w-6xl">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,minmax(0,1fr))] lg:items-center">
            <Reveal className="sm:col-span-2 lg:col-span-1">
              <h2 className="font-display text-xl font-bold text-white">
                Some Numbers
              </h2>
              <p className="mt-5 max-w-xs text-[15px] font-medium leading-6 text-white/85">
                We’re proud of the impact we’ve made! Here’s a glimpse of our
                achievements:
              </p>
            </Reveal>

            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <p className="gradient-text shrink-0 font-display text-4xl font-bold sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="whitespace-pre-line text-sm font-semibold leading-4 text-white">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Would you like to start a project with us?"
        description="Let Nexmogen bring your ideas to life with top-notch design and development. Let’s create something amazing together—reach out today!"
        href="tel:+918650457900"
        label="+91-8650457900"
      />
    </>
  );
}
