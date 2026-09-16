import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact | Nexmogen",
  description:
    "Get in touch with Nexmogen for premium business services — innovative design, custom development, and complete project solutions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Build Something Great Together"
        description="Get in touch with Nexmogen for premium business services. Whether you need innovative design, custom development, or complete project solutions, we're here to help!"
      />

      <section className="section bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
          <Reveal className="lg:col-span-3" delay={0.1}>
            <ContactForm />
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.2}>
            <TiltCard className="h-full">
              <div className="card h-full space-y-9 p-7 sm:p-9">
                <div>
                  <p className="eyebrow">Direct contact</p>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                    Get In Touch
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Would you like to start a project with us? Let Nexmogen
                    bring your ideas to life with top-notch design and
                    development.
                  </p>
                </div>

                <div className="space-y-3 text-sm text-white/65">
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                    <FiMapPin className="mt-0.5 shrink-0 text-xl text-primary-light" />
                    Ashok Nagar, Noida, Uttar Pradesh, India
                  </div>
                  <a href="mailto:contact@nexmogen.com" className="flex min-w-0 items-center gap-3 break-all rounded-2xl border border-white/10 bg-black/15 p-4 hover:border-primary-light/30 hover:text-white sm:gap-4">
                    <FiMail className="shrink-0 text-xl text-primary-light" />
                    contact@nexmogen.com
                  </a>
                  <a href="tel:+918650457900" className="flex min-w-0 items-center gap-3 break-words rounded-2xl border border-white/10 bg-black/15 p-4 hover:border-primary-light/30 hover:text-white sm:gap-4">
                    <FiPhone className="shrink-0 text-xl text-primary-light" />
                    +91-8650457900
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
      </section>
    </>
  );
}
