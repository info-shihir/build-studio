import { useState, useEffect } from "react";
import { Menu, X, Compass, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyMeta } from "../types";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  company: CompanyMeta;
}

export default function Header({ company }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        id="site-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl transition-all duration-500 rounded-xl ${
          isScrolled
            ? theme === "dark"
              ? "glass-panel-dark py-3 px-6 shadow-2xl"
              : "glass-panel-light py-3 px-6 shadow-xl"
            : theme === "dark"
              ? "bg-black/25 backdrop-blur-md py-5 px-6 border border-white/5"
              : "bg-white/30 backdrop-blur-md py-5 px-6 border border-black/5"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a id="nav-logo" href="#home" className="flex items-center space-x-2.5 group">
            <div className="relative p-2 bg-[#c5a880] text-[#0a0a0a] rounded-lg transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-base tracking-wider leading-none transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
                {company.name.split(" ")[0].toUpperCase()}
              </span>
              <span className="font-mono text-[8px] text-[#c5a880] tracking-widest mt-0.5 uppercase leading-none">
                {company.name.split(" ")[1] || "ARCHITECTS"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                id={`nav-link-${link.label.toLowerCase()}`}
                key={link.label}
                href={link.href}
                className={`font-display text-xs tracking-widest uppercase transition-all duration-300 relative group py-1.5 ${
                  theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a880] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Desktop Theme Toggle */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 text-[#c5a880] hover:bg-white/10"
                  : "bg-black/5 border-black/10 text-[#a98d65] hover:bg-black/10"
              }`}
              aria-label="Toggle visual theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              id="nav-cta-desktop"
              href="#contact"
              className="glass-btn-gold px-5 py-2.5 text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-lg transition-all duration-300"
            >
              Get Consultation
            </a>
          </nav>

          {/* Mobile Actions (Theme Toggle & Menu) */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 text-[#c5a880] hover:bg-white/10"
                  : "bg-black/5 border-black/10 text-[#a98d65] hover:bg-black/10"
              }`}
              aria-label="Toggle visual theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 text-white hover:text-[#c5a880] hover:bg-white/10"
                  : "bg-black/5 border-black/10 text-black hover:text-[#a98d65] hover:bg-black/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm shadow-2xl flex flex-col pt-28 px-8 pb-10 transition-colors duration-500 ${
              theme === "dark"
                ? "glass-panel-dark"
                : "glass-panel-light"
            }`}
          >
            <div className="flex flex-col space-y-6 flex-grow">
              {navLinks.map((link) => (
                <a
                  id={`nav-mobile-${link.label.toLowerCase()}`}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display text-base tracking-widest uppercase border-b pb-2 transition-colors flex items-center justify-between group ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white border-white/5"
                      : "text-gray-700 hover:text-black border-black/5"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            <div className="space-y-6">
              <a
                id="nav-cta-mobile"
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-3.5 glass-btn-gold text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-lg transition-all duration-300"
              >
                Get Consultation
              </a>
              <div className="text-center">
                <p className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest">
                  {company.contact.phone}
                </p>
                <p className={`font-mono text-[9px] lowercase mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {company.contact.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

