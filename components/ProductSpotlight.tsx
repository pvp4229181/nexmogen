import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ProductSpotlight() {
  return (
    <section aria-labelledby="home-product-title" className="section bg-ink">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,#18080b,#0c0c0f_65%)] p-6 sm:p-10 lg:p-12">
          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="eyebrow">Our products</p>
              <h2 id="home-product-title" className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet <span className="gradient-text">Nexmogen CRM.</span></h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/70">One workspace for your leads, customers and sales pipeline. Give your team a clearer view of every deal and the next follow-up.</p>
              <p className="mt-4 text-sm leading-6 text-white/60">Built and maintained by Nexmogen.</p>
              <Link href="/products" className="hero-btn-primary mt-7 w-full gap-2 sm:w-auto">Explore our product <FiArrowRight aria-hidden="true" /></Link>
            </div>
            <figure className="min-w-0">
              <Link href="/products" className="block overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/40 transition-colors hover:border-primary-light/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light">
                <Image src="/products/nexmogen-crm-pipeline.webp" alt="Explore Nexmogen CRM: sales pipeline organized by deal stage" width={1600} height={960} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
              </Link>
              <figcaption className="mt-3 text-xs leading-5 text-white/60">Actual CRM screen · Sample data</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
