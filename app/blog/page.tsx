import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import PageHero from "@/components/PageHero";
import { getBlogPosts } from "@/lib/data";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog | Nexmogen",
  description: "Insights on web development, AI, SaaS, and digital growth from the Nexmogen team.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights & Ideas"
        description="Thoughts on web development, AI, SaaS, and digital growth from the Nexmogen team."
      />

      <section className="section min-h-[40vh] bg-ink">
        <div className="section-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-px relative mx-auto max-w-7xl">
          {posts.length === 0 && (
            <Reveal>
              <div className="card p-10 text-center text-white/60">
                No posts yet — check back soon.
              </div>
            </Reveal>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card card-interactive group flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-surface">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <p className="text-xs font-medium uppercase tracking-wide text-primary-light">
                        {new Date(post.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-white">
                        {post.title}
                      </h2>
                      <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                        <span className="text-white/50">{post.author}</span>
                        <span className="flex items-center gap-1 font-semibold text-primary-light transition-colors group-hover:text-white">
                          Read more
                          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
