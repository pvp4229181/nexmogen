import Link from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#06060e]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-light/60 to-transparent" />
      <div className="container-px mx-auto grid max-w-7xl gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-bold tracking-[-0.04em] text-white">
            Nexmo<span className="text-primary-light">gen</span><span className="text-accent">.</span>
          </p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
            Empowering innovation through tailored software solutions. Partner
            with us for your digital success.
          </p>
          <div className="mt-7 flex gap-3 text-lg text-white/60">
            <a
              href="https://www.facebook.com/nexmogen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-primary-light/40 hover:text-white"
            >
              <FiFacebook />
            </a>
            <a
              href="https://www.instagram.com/nexmogen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-primary-light/40 hover:text-white"
            >
              <FiInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/nexmogen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-primary-light/40 hover:text-white"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">Company</p>
          <ul className="space-y-3.5 text-sm text-white/50">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">Services</p>
          <ul className="space-y-3.5 text-sm text-white/50">
            <li><Link href="/services/website-development" className="hover:text-white">Website Development</Link></li>
            <li><Link href="/services/ai-agents-for-business" className="hover:text-white">AI Agents for Business</Link></li>
            <li><Link href="/services/saas-software-development" className="hover:text-white">SaaS Software Development</Link></li>
            <li><Link href="/services/crm-software-development" className="hover:text-white">CRM Software Solutions</Link></li>
            <li><Link href="/services/digital-marketing-services" className="hover:text-white">Digital Marketing</Link></li>
            <li><Link href="/services/mobile-app-development" className="hover:text-white">Mobile App Development</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">Get in Touch</p>
          <ul className="space-y-4 text-sm leading-6 text-white/50">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-1 shrink-0 text-primary-light" />
              Ashok Nagar, Noida, Uttar Pradesh, India
            </li>
            <li>
              <a href="mailto:contact@nexmogen.com" className="flex min-w-0 items-center gap-2 break-all hover:text-white">
              <FiMail className="shrink-0 text-primary-light" />
              contact@nexmogen.com
              </a>
            </li>
            <li>
              <a href="tel:+918650457900" className="flex items-center gap-2 hover:text-white">
              <FiPhone className="shrink-0 text-primary-light" />
              +91-8650457900
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/35 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Nexmogen. All rights reserved.</span>
          <span>Designed for clarity. Built for growth.</span>
        </div>
      </div>
    </footer>
  );
}
