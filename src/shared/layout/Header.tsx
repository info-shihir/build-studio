"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyMeta } from "@/types";
import CompanyLogo from "@/shared/ui/CompanyLogo";
import { mainNavigation, NavItem, consultationCtaHref } from "@/lib/navigation";
import { siteContainerClass } from "@/shared/ui/SiteContainer";

interface HeaderProps {
  company: CompanyMeta;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (isActive(pathname, item.href)) return true;
  return item.children?.some((child) => isActive(pathname, child.href)) ?? false;
}

export default function Header({ company }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setIsScrolled(window.scrollY > 8);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = pathname === "/";

  const headerInnerClass = [
    siteContainerClass,
    "rounded-xl transition-all duration-500",
    isMobileMenuOpen
      ? "bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl py-3"
      : isScrolled
        ? "glass-header-heavy py-3"
        : isHome
          ? "bg-black/30 backdrop-blur-md py-4 sm:py-5 border border-white/5"
          : "glass-header-scrolled py-4 sm:py-5",
  ].join(" ");

  const linkClass = (active: boolean) =>
    `font-display text-[10px] xl:text-xs tracking-widest uppercase transition-all duration-300 relative py-1.5 whitespace-nowrap ${
      active ? "text-[#c5a880]" : "text-gray-300 hover:text-white"
    }`;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-[max(1rem,5vw)]"
      >
        <div className={headerInnerClass}>
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <CompanyLogo company={company} size="sm" />
          </Link>

          {/* Desktop / tablet navigation (1024px+) */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-2.5 xl:gap-5 relative z-[60]">
            {mainNavigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`${linkClass(isNavItemActive(pathname, item))} flex items-center gap-1`}
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    aria-expanded={openDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 min-w-[240px] py-2 rounded-xl glass-dropdown shadow-2xl z-[60]"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-xs font-display tracking-widest uppercase transition-colors relative z-10 ${
                              isActive(pathname, child.href)
                                ? "text-[#c5a880] bg-white/10"
                                : "text-gray-200 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${linkClass(isActive(pathname, item.href))} group`}
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a880] transition-all duration-300 group-hover:w-full" />
                </Link>
              ),
            )}
            <Link
              href={consultationCtaHref}
              className="glass-btn-gold px-3 py-2 xl:px-5 xl:py-2.5 text-[#0a0a0a] font-display text-[10px] xl:text-xs tracking-widest uppercase font-bold rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              <span className="xl:hidden">Consult</span>
              <span className="hidden xl:inline">Get Consultation</span>
            </Link>
          </nav>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border bg-white/5 border-white/10 text-white hover:text-[#c5a880] hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-40 w-full flex flex-col pt-[max(7rem,env(safe-area-inset-top))] px-6 sm:px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] overflow-y-auto bg-[#0a0a0a] lg:hidden"
          >
            <div className="flex flex-col space-y-2 flex-grow">
              {mainNavigation.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className="w-full font-display text-base tracking-widest uppercase border-b pb-3 pt-2 flex items-center justify-between text-gray-300 hover:text-white border-white/5"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 space-y-1 py-2"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block py-2 text-sm font-display tracking-wider uppercase ${
                                isActive(pathname, child.href)
                                  ? "text-[#c5a880]"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`font-display text-base tracking-widest uppercase border-b pb-3 pt-2 transition-colors border-white/5 ${
                      isActive(pathname, item.href)
                        ? "text-[#c5a880]"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
            <div className="space-y-6 mt-8">
              <Link
                href={consultationCtaHref}
                className="block w-full text-center py-3.5 glass-btn-gold text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-lg"
              >
                Get Consultation
              </Link>
              <div className="text-center">
                <p className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest">
                  {company.contact.phone}
                </p>
                <p className="font-mono text-[9px] lowercase mt-1 text-gray-400">
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
