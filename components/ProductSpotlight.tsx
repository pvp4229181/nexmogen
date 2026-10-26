import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import CrmPreview from "@/components/CrmPreview";

export default function ProductSpotlight() {
  return (
    <section aria-labelledby="home-product-title" className="section bg-ink">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,#18080b,#0c0c0f_65%)] p-6 sm:p-10 lg:p-12">
          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 lg:py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">Built by us. Built for you.</p>
              <div className="mt-6 flex items-center gap-3">
                <Image src="/nexmogen-logo.png" alt="Nexmogen" width={2089} height={753} className="h-auto w-[160px] sm:w-[180px]" />
                <span className="border-l border-white/20 pl-3 font-display text-lg font-semibold tracking-tight text-white/65">CRM</span>
              </div>
              <h2 id="home-product-title" className="mt-6 font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
                Your sales.<br /><span className="gradient-text">One clear view.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/65">Keep your customers close and your next move clear. One shared workspace for your sales pipeline and every follow-up.</p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-y border-white/10 py-4 text-xs font-medium text-white/75 sm:text-sm">
                {["Manage leads", "Track deals", "Stay in sync"].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2"><FiCheck aria-hidden="true" className="shrink-0 text-primary-light" />{benefit}</li>
                ))}
              </ul>
              <Link href="/products" className="group mt-7 inline-flex min-h-14 w-full items-center justify-between gap-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light sm:w-auto">
                Explore Nexmogen CRM
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.06]"><FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" /></span>
              </Link>
              <p className="mt-4 text-xs leading-5 text-white/50">Built and maintained by the Nexmogen team.</p>
            </div>
            <figure className="min-w-0">
              <CrmPreview />
              <figcaption className="mt-3 text-xs leading-5 text-white/60">Actual CRM screen · Sample data</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
