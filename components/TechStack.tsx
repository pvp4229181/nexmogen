import Reveal from "@/components/Reveal";
import ScrollCopy from "@/components/scroll/ScrollCopy";
import VelocityMarquee from "@/components/scroll/VelocityMarquee";
import TextReveal from "@/components/TextReveal";

const ROWS = [
  [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ],
  [
    "OpenAI",
    "Anthropic",
    "LangChain",
    "Pinecone",
    "AWS",
    "Vercel",
    "Docker",
    "Kubernetes",
  ],
  [
    "React Native",
    "Flutter",
    "Tailwind CSS",
    "Figma",
    "Stripe",
    "Razorpay",
    "Supabase",
    "GraphQL",
  ],
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <VelocityMarquee speed={reverse ? 2.4 : 3.2} reverse={reverse}>
      {items.map((item) => (
        <span
          key={item}
          className="mr-4 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-primary-light/40 hover:text-white"
        >
          {item}
        </span>
      ))}
    </VelocityMarquee>
  );
}

export default function TechStack() {
  return (
    <section className="section bg-ink">
      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">The stack</p>
          <TextReveal
            text="Modern tools, chosen on merit"
            highlight="merit"
            className="section-title"
          />
          <ScrollCopy
            className="section-copy"
            text="We pick the technology that fits the problem — then keep it boring, documented, and easy for your team to inherit."
          />
        </Reveal>
      </div>

      <div className="relative mt-14 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] lg:mt-16">
        {ROWS.map((row, i) => (
          <Row key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
