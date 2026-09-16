import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexmogen",
  description: "How Nexmogen collects, uses, and protects your information.",
};

const sections = [
  {
    title: "Scope",
    body: "This policy covers how Nexmogen (nexmogen.com) handles information collected through our website and in the course of providing software development, AI agent, SaaS, CRM, and digital marketing services. It has been in effect since January 1, 2024.",
  },
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — name, email, phone number, and company — along with technical data such as IP address, browser and device type, and page-level analytics gathered through cookies.",
  },
  {
    title: "How We Use It",
    body: "Your information helps us deliver our services, respond to enquiries, improve our platform, build the software we're engaged to build, and, where you haven't opted out, send occasional marketing communications. You can opt out of marketing messages at any time.",
  },
  {
    title: "AI & Automation",
    body: "We do not use client data to train AI models unless you've given us explicit written authorization to do so.",
  },
  {
    title: "How We Share Information",
    body: "We do not sell personal information. We share data only with vetted service providers who help us operate, when required by law, or to protect our rights and safety — and any partner we work with is bound to keep that data confidential.",
  },
  {
    title: "Security & Retention",
    body: "We apply standard security measures to protect your data, though no method of transmission over the internet is completely secure. We retain information only as long as necessary to fulfil the purposes described here or as required by law.",
  },
  {
    title: "Your Rights",
    body: "Depending on where you're located, you may have the right to access, correct, delete, or restrict how we process your data. Reach out using the contact details below to exercise any of these rights.",
  },
  {
    title: "Other Provisions",
    body: "Links to third-party websites on our site aren't an endorsement of their content or practices. Our services aren't directed at children under 13. If this policy changes, we'll post the update here with a revised effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Effective January 1, 2024"
      />

      <section className="section min-h-[40vh] bg-ink">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-px relative mx-auto max-w-4xl">
        <div className="card space-y-0 overflow-hidden p-7 sm:p-10 lg:p-14">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.04} className="border-b border-white/10 py-8 first:pt-0">
              <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
                {section.title}
              </h2>
              <p className="mt-4 leading-8 text-white/60">{section.body}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3} className="pt-8">
            <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">Contact Us</h2>
            <p className="mt-4 leading-8 text-white/60">
              For questions about this policy or to exercise your data rights, email{" "}
              <a href="mailto:contact@nexmogen.com" className="text-primary-light hover:text-white">
                contact@nexmogen.com
              </a>{" "}
              or call{" "}
              <a href="tel:+918650457900" className="text-primary-light hover:text-white">
                +91-8650457900
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
      </section>
    </>
  );
}
