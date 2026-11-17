import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <>
      <PageHero eyebrow="Blog" title={post.title} />

      <section className="section bg-ink">
        <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-px relative mx-auto max-w-4xl">
          <Reveal className="card p-7 sm:p-10 lg:p-14">
            <p className="border-b border-white/10 pb-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary-light">
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              &middot; {post.author}
            </p>
            <div className="mt-8 space-y-7 text-base leading-8 text-white/65 sm:text-lg">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
