"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { CompanyMeta } from "../types";
import CompanyLogo from "./CompanyLogo";
import { mainNavigation } from "../lib/navigation";
import SiteContainer from "./SiteContainer";

interface FooterProps {
  company: CompanyMeta;
}

export default function Footer({ company }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const servicesNav = mainNavigation.find((n) => n.label === "Services");
  const companyNav = mainNavigation.find((n) => n.label === "Company");
  const quickLinks = mainNavigation.filter(
    (n) => !n.children && n.label !== "Home" && n.label !== "Contact",
  );

  return (
    <footer className="pt-20 pb-10 relative overflow-hidden bg-[#0e0d0c] text-white border-t border-white/5">
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-25 blur-[100px] pointer-events-none liquid-orb-dark-1" />

      <SiteContainer className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="group w-fit">
              <CompanyLogo company={company} size="md" />
            </Link>
            <p className="font-light text-sm leading-relaxed text-gray-400">
              {company.description}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {company.contact.socials.facebook && (
                <a
                  href={company.contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border bg-white/5 text-gray-300 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-white/5 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {company.contact.socials.instagram && (
                <a
                  href={company.contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border bg-white/5 text-gray-300 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-white/5 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {company.contact.socials.linkedin && (
                <a
                  href={company.contact.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border bg-white/5 text-gray-300 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-white/5 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-display text-xs tracking-widest uppercase font-bold text-[#c5a880]">
              Quick Links
            </h4>
            <ul className="space-y-3 font-sans text-sm font-light text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#c5a880] transition-colors">
                  Home
                </Link>
              </li>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#c5a880] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {companyNav?.children?.map((child) => (
                <li key={child.href}>
                  <Link href={child.href} className="hover:text-[#c5a880] transition-colors">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display text-xs tracking-widest uppercase font-bold text-[#c5a880]">
              Divisions
            </h4>
            <ul className="space-y-3 font-sans text-sm font-light text-gray-400">
              {servicesNav?.children
                ?.filter((c) => c.href !== "/services")
                .map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="hover:text-[#c5a880] transition-colors">
                      {child.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display text-xs tracking-widest uppercase font-bold text-[#c5a880]">
              Head Office
            </h4>
            <ul className="space-y-3 font-sans text-sm font-light text-gray-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{company.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <a href={`tel:${company.contact.phone}`} className="hover:text-[#c5a880]">
                  {company.contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <a href={`mailto:${company.contact.email}`} className="hover:text-[#c5a880] truncate">
                  {company.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-center sm:text-left text-gray-500">
            &copy; {new Date().getFullYear()}             {company.name}. All rights reserved &middot; Private Limited Company &middot; Est. {company.foundedYear}
          </p>
          <button
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 px-4.5 py-2.5 border rounded-xl backdrop-blur-md bg-white/5 border-white/5 hover:border-[#c5a880]/40 text-gray-400 hover:text-[#c5a880] transition-all"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </SiteContainer>
    </footer>
  );
}
