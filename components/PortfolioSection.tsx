import Reveal from "@/components/Reveal";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import { IProject } from "@/models/Project";

export default function PortfolioSection({ projects }: { projects: IProject[] }) {
  return (
    <section className="section bg-surface">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Selected projects</p>
          <h2 className="section-title">
            Our Latest Work
          </h2>
          <p className="section-copy max-w-2xl">
            Explore our latest projects and see how{" "}
            <span className="font-semibold text-white">Nexmogen</span>{" "}
            transforms ideas into stunning digital experiences. Let&apos;s
            create something extraordinary together!
          </p>
        </Reveal>

        <PortfolioCarousel projects={projects} />
      </div>
    </section>
  );
}
