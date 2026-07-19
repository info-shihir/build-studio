import { Compass, Facebook, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { CompanyMeta } from "../types";
import { useTheme } from "../context/ThemeContext";

interface FooterProps {
  company: CompanyMeta;
}

export default function Footer({ company }: FooterProps) {
  const { theme } = useTheme();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="site-footer" className={`pt-20 pb-10 relative overflow-hidden transition-colors duration-500 ${
      theme === "dark" 
        ? "bg-[#0e0d0c] text-white border-t border-white/5" 
        : "bg-[#efede6] text-[#0a0a0a] border-t border-[#c5a880]/25"
    }`}>
      {/* Liquid fluid background ambient orb */}
      <div className={`absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-25 blur-[100px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-1" : "liquid-orb-1"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core footer layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b transition-colors duration-500 ${
          theme === "dark" ? "border-white/5" : "border-black/10"
        }`}>
          
          {/* Group 1: Logo & details */}
          <div className="lg:col-span-4 space-y-6">
            <a id="footer-logo" href="#home" className="flex items-center space-x-2 group w-fit">
              <div className="p-2 bg-[#c5a880] text-[#0a0a0a] rounded-xl group-hover:rotate-45 transition-transform duration-500">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-bold text-lg tracking-wider leading-none transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
                  {company.name.split(" ")[0].toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-[#c5a880] tracking-widest mt-0.5 uppercase leading-none">
                  {company.name.split(" ")[1] || "ARCHITECTS"}
                </span>
              </div>
            </a>
            <p id="footer-desc" className={`font-light text-sm leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {company.description}
            </p>
            <div id="footer-social-links" className="flex items-center space-x-3 pt-2">
              {company.contact.socials.facebook && (
                <a
                  href={company.contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl border hover:scale-105 active:scale-95 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 text-gray-300 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-white/5"
                      : "bg-black/5 text-gray-700 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-black/5"
                  }`}
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
                  className={`p-2.5 rounded-xl border hover:scale-105 active:scale-95 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 text-gray-300 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-white/5"
                      : "bg-black/5 text-gray-700 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-black/5"
                  }`}
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
                  className={`p-2.5 rounded-xl border hover:scale-105 active:scale-95 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 text-gray-300 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-white/5"
                      : "bg-black/5 text-gray-700 hover:bg-[#c5a880] hover:text-[#0a0a0a] border-black/5"
                  }`}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Group 2: Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-display text-xs tracking-widest uppercase font-bold text-[#c5a880]">
              Zoning Links
            </h4>
            <ul className={`space-y-3 font-sans text-sm font-light transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
              <li>
                <a href="#home" className="hover:text-[#c5a880] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#c5a880] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a880] transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#c5a880] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#c5a880] transition-colors">
                  Build Process
                </a>
              </li>
            </ul>
          </div>

          {/* Group 3: Services Grid */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display text-xs tracking-widest uppercase font-bold text-[#c5a880]">
              Expertise
            </h4>
            <ul className={`space-y-3 font-sans text-sm font-light transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
              <li>
                <a href="#services" className="hover:text-[#c5a880] transition-colors">
                  Residential Duplexes
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a880] transition-colors">
                  Biophilic Office Spaces
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a880] transition-colors">
                  Luxury Penthouse Interiors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a880] transition-colors">
                  Courtyard & Roof Gardens
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a880] transition-colors">
                  Weekly Site Audit Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Group 4: Quick Contacts summary */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display text-xs tracking-widest uppercase font-bold text-[#c5a880]">
              HQ Studio
            </h4>
            <ul className={`space-y-3 font-sans text-sm font-light transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{company.contact.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <span>{company.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <span className="truncate">{company.contact.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row details & Back to Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p id="copyright-text" className={`font-mono text-[11px] text-center sm:text-left transition-colors duration-350 ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved &middot; Contextual Architecture, Dhaka.
          </p>
          
          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className={`flex items-center space-x-2 px-4.5 py-2.5 border rounded-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 ${
              theme === "dark"
                ? "bg-white/5 border-white/5 hover:border-[#c5a880]/40 text-gray-400 hover:text-[#c5a880]"
                : "bg-black/5 border-black/5 hover:border-[#c5a880]/40 text-gray-700 hover:text-[#c5a880]"
            }`}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 animate-pulse" />
          </button>
        </div>

      </div>
    </footer>
  );
}
