import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import { IProject } from "@/models/Project";

export default function PortfolioSection({ projects }: { projects: IProject[] }) {
  return (
    <section className="section bg-surface !pb-0">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Selected projects</p>
          <TextReveal
            text="Our Latest Work"
            highlight="Work"
            className="section-title"
          />
          <p className="section-copy max-w-2xl">
            Explore our latest projects and see how{" "}
            <span className="font-semibold text-white">Nexmogen</span>{" "}
            transforms ideas into stunning digital experiences. Let&apos;s
            create something extraordinary together!
          </p>
        </Reveal>

        <PortfolioCarousel projects={projects} />

        <Reveal className="mt-10 flex justify-center">
          <Link href="/case-studies" className="btn-ghost group">
            Read the case studies
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
