"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { services } from "@/lib/services";

const links = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }];
const trailingLinks = [{ href: "/case-studies", label: "Case Studies" }, { href: "/contact", label: "Contact" }, { href: "/blog", label: "Blog" }];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return <header className={`fixed inset-x-0 top-0 z-50 w-full max-w-full border-b transition-all duration-300 ${scrolled || open ? "border-white/[0.08] bg-ink/85 shadow-lg shadow-black/30 backdrop-blur-xl" : "border-transparent bg-transparent backdrop-blur-none"}`}>
    <nav className={`container-px mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"}`}>
      <Link href="/" className="min-w-0 shrink font-display text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">Nexmo<span className="text-primary-light">gen</span><span className="text-accent">.</span></Link>
      <ul className="hidden items-center gap-7 lg:flex">
        {links.map(link => <li key={link.href}><Link href={link.href} className={`text-sm font-medium transition-colors hover:text-white ${isActive(link.href) ? "text-primary-light" : "text-white/80"}`}>{link.label}</Link></li>)}
        <li className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}><Link href="/services" className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-white ${isActive("/services") ? "text-primary-light" : "text-white/80"}`}>Services<FiChevronDown className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} /></Link><AnimatePresence>{servicesOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .18, ease: "easeOut" }} className="absolute left-1/2 top-full z-[60] w-72 -translate-x-1/2 pt-4"><div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} className={`block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white/5 hover:text-white ${isActive(`/services/${service.slug}`) ? "text-primary-light" : "text-white/80"}`}>{service.title}</Link>)}</div></motion.div>}</AnimatePresence></li>
        {trailingLinks.map(link => <li key={link.href}><Link href={link.href} className={`text-sm font-medium transition-colors hover:text-white ${isActive(link.href) ? "text-primary-light" : "text-white/80"}`}>{link.label}</Link></li>)}
      </ul>
      <div className="hidden items-center lg:flex"><a href="tel:+918650457900" className="btn-primary !min-h-10 !px-5 !py-2 text-xs">Call : 8650457900</a></div>
      <button className={`shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-xl lg:hidden ${open ? "text-primary-light" : "text-white"}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <FiX /> : <FiMenu />}</button>
    </nav>
    {open && <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto overflow-x-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden"><ul className="container-px mx-auto flex min-w-0 max-w-7xl flex-col gap-1 py-5">
      {links.map(link => <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-3 hover:bg-white/5 hover:text-white ${isActive(link.href) ? "text-primary-light" : "text-white/80"}`}>{link.label}</Link></li>)}
      <li><button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-white/5 hover:text-white ${isActive("/services") ? "text-primary-light" : "text-white/80"}`}>Services<FiChevronDown className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} /></button>{mobileServicesOpen && <ul className="ml-3 border-l border-white/10 pl-3">{services.map(service => <li key={service.slug}><Link href={`/services/${service.slug}`} onClick={() => { setOpen(false); setMobileServicesOpen(false); }} className={`block break-words rounded-lg px-3 py-2.5 text-sm hover:bg-white/5 hover:text-white ${isActive(`/services/${service.slug}`) ? "text-primary-light" : "text-white/70"}`}>{service.title}</Link></li>)}</ul>}</li>
      {trailingLinks.map(link => <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-3 hover:bg-white/5 hover:text-white ${isActive(link.href) ? "text-primary-light" : "text-white/80"}`}>{link.label}</Link></li>)}
      <li className="pt-2"><a href="tel:+918650457900" onClick={() => setOpen(false)} className="block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark">Call : 8650457900</a></li>
    </ul></div>}
  </header>;
}
