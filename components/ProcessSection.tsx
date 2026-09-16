import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01.",
    title: "Discover",
    description:
      "We start by understanding your business, goals, and challenges to create a clear vision for your project.",
  },
  {
    number: "02.",
    title: "Define",
    description:
      "We define the scope, strategy, and requirements, ensuring alignment with your vision and objectives.",
  },
  {
    number: "03.",
    title: "Design",
    description:
      "Our design team crafts intuitive, user-centric interfaces that offer seamless experiences for your audience.",
  },
  {
    number: "04.",
    title: "Develop",
    description:
      "We bring your ideas to life with robust, scalable development that focuses on performance and functionality.",
  },
  {
    number: "05.",
    title: "Deploy",
    description:
      "We ensure a smooth launch by thoroughly testing and optimizing the project before going live.",
  },
  {
    number: "06.",
    title: "Deliver",
    description:
      "We provide ongoing support and optimization to ensure your project continues to thrive and exceed expectations.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">From idea to launch</p>
          <h2 className="section-title">
            Our 6-D Process
          </h2>
          <p className="section-copy">
            A clear, collaborative path that keeps every project focused,
            transparent, and moving toward measurable results.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="h-full">
              <article className="card card-interactive relative h-full overflow-hidden p-7 sm:p-8">
              <span className="block font-display text-5xl font-extrabold leading-none text-primary-light/20">
                {step.number}
              </span>
              <h3 className="mt-7 font-display text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">
                {step.description}
              </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
