"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import type { CompanyMeta } from "@/types";

interface SiteShellProps {
  children: ReactNode;
  company: CompanyMeta;
}

export default function SiteShell({ children, company }: SiteShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#c5a880]/30 relative text-[#f4f4f5] selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a98d65] via-[#c5a880] to-[#e6d5bc] origin-left z-[100] shadow-[0_1px_12px_rgba(197,168,128,0.5)]"
        style={{ scaleX }}
      />
      <div className="absolute inset-0 floral-bg pointer-events-none opacity-[0.035] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-[min(22vw,560px)] bg-gradient-to-r from-[#c5a880]/[0.07] via-[#1a1816]/30 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[min(22vw,560px)] bg-gradient-to-l from-[#c5a880]/[0.07] via-[#1a1816]/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.35)_100%)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col min-h-screen"
      >
        <Header company={company} />
        {!isHome && <div className="h-[5rem] sm:h-[5.75rem] shrink-0" aria-hidden="true" />}
        <main id="main-content" className="flex-grow relative z-0">
          {children}
        </main>
        <Footer company={company} />
      </motion.div>
    </div>
  );
}
