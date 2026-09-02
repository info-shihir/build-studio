"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeroSlide, CompanyMeta } from "@/types";
import SafeImage from "@/shared/ui/SafeImage";
import SiteContainer from "@/shared/ui/SiteContainer";

interface HeroProps {
  slides: HeroSlide[];
  company: CompanyMeta;
}

export default function Hero({ slides, company }: HeroProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="home" className="relative min-h-[100dvh] md:h-screen w-full overflow-hidden bg-[#121212]">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Overlay to ensure readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
          <SafeImage
            src={slides[current].image}
            alt={slides[current].title}
            fallbackType="hero"
            fallbackText={slides[current].title}
            className="w-full h-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Liquid fluid background ambient orbs */}
      <div className="absolute top-1/3 left-4 sm:left-10 w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] rounded-full opacity-60 blur-[110px] pointer-events-none z-15 liquid-orb-dark-1" />
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] rounded-full opacity-40 blur-[130px] pointer-events-none z-15 liquid-orb-dark-2" />

      {/* Hero content container */}
      <SiteContainer className="relative z-20 min-h-[inherit] flex flex-col justify-center pt-24 pb-36 sm:pt-28 sm:pb-32 md:pt-0 md:pb-0 md:h-full">
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl transition-colors duration-500 w-full max-w-lg lg:max-w-xl glass-panel-dark">
          {/* Subtle glossy glass border highlights */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/20 to-transparent" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 relative z-10"
            >
              <div className="inline-flex items-center space-x-2">
                <span className="h-[1px] w-6 bg-[#c5a880]" />
                <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest font-semibold">
                  {company.shortName}
                </span>
              </div>

              <h1 id="hero-title" className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight transition-colors duration-300 text-white">
                {slides[current].title}
              </h1>

              <p id="hero-subtitle" className="font-sans text-xs sm:text-sm tracking-wide font-light leading-relaxed max-w-md transition-colors duration-300 text-gray-300">
                {slides[current].subtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  id="hero-cta-primary"
                  href={slides[current].link}
                  className="glass-btn-gold inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 sm:py-3 text-[#0a0a0a] font-display text-[10px] tracking-widest uppercase font-bold rounded-md transition-all duration-300 group w-full sm:w-auto"
                >
                  <span>{slides[current].cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
                <Link
                  id="hero-cta-secondary"
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3.5 sm:py-3 font-display text-[10px] tracking-widest uppercase font-bold rounded-md transition-all duration-300 glass-btn-light text-white hover:text-[#c5a880] w-full sm:w-auto"
                >
                  Our Philosophy
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </SiteContainer>

      {/* Slide controls — unified bottom bar on mobile */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-4 sm:px-10 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-10 flex items-center justify-between gap-4">
        <div id="hero-dots" className="flex items-center space-x-2 backdrop-blur-sm p-1.5 rounded-full border bg-black/20 border-white/5">
          {slides.map((_, index) => (
            <button
              id={`hero-dot-${index}`}
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                current === index
                  ? "w-8 bg-[#c5a880]"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            id="hero-prev-btn"
            onClick={prevSlide}
            className="p-3 sm:p-3.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 border-white/10 text-white bg-white/5 hover:border-[#c5a880] hover:text-[#c5a880]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="hero-next-btn"
            onClick={nextSlide}
            className="p-3 sm:p-3.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 border-white/10 text-white bg-white/5 hover:border-[#c5a880] hover:text-[#c5a880]"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center pointer-events-none">
        <span className="font-mono text-[8px] tracking-widest uppercase mb-2 text-gray-400">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border rounded-full p-1 flex justify-center backdrop-blur-xs border-white/20 bg-white/5"
        >
          <div className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
