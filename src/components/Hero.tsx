import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeroSlide } from "../types";
import SafeImage from "./SafeImage";
import { useTheme } from "../context/ThemeContext";

interface HeroProps {
  slides: HeroSlide[];
}

export default function Hero({ slides }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();

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
    <section id="home" className="relative h-screen w-full overflow-hidden bg-[#121212]">
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
      <div className={`absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full opacity-60 blur-[110px] pointer-events-none z-15 ${theme === "dark" ? "liquid-orb-dark-1" : "liquid-orb-1"}`} />
      <div className={`absolute bottom-1/4 right-10 w-[400px] h-[400px] rounded-full opacity-40 blur-[130px] pointer-events-none z-15 ${theme === "dark" ? "liquid-orb-dark-2" : "liquid-orb-2"}`} />

      {/* Hero content container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className={`p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl transition-colors duration-500 max-w-lg lg:max-w-xl ${
          theme === "dark" 
            ? "glass-panel-dark" 
            : "glass-panel-light"
        }`}>
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
                  Build Studio
                </span>
              </div>

              <h1 id="hero-title" className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
                {slides[current].title}
              </h1>

              <p id="hero-subtitle" className={`font-sans text-xs sm:text-sm tracking-wide font-light leading-relaxed max-w-md transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {slides[current].subtitle}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  id="hero-cta-primary"
                  href={slides[current].link}
                  className="glass-btn-gold inline-flex items-center space-x-2.5 px-6 py-3 text-[#0a0a0a] font-display text-[10px] tracking-widest uppercase font-bold rounded-md transition-all duration-300 group"
                >
                  <span>{slides[current].cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
                <a
                  id="hero-cta-secondary"
                  href="#about"
                  className={`inline-flex items-center px-6 py-3 font-display text-[10px] tracking-widest uppercase font-bold rounded-md transition-all duration-300 ${
                    theme === "dark"
                      ? "glass-btn-light text-white hover:text-[#c5a880]"
                      : "glass-btn-dark text-[#0a0a0a] hover:text-[#a98d65]"
                  }`}
                >
                  Our Philosophy
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute bottom-10 right-4 sm:right-10 z-30 flex items-center space-x-3">
        <button
          id="hero-prev-btn"
          onClick={prevSlide}
          className={`p-3.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
            theme === "dark"
              ? "border-white/10 text-white bg-white/5 hover:border-[#c5a880] hover:text-[#c5a880]"
              : "border-black/10 text-black bg-black/5 hover:border-[#c5a880] hover:text-[#c5a880]"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          id="hero-next-btn"
          onClick={nextSlide}
          className={`p-3.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
            theme === "dark"
              ? "border-white/10 text-white bg-white/5 hover:border-[#c5a880] hover:text-[#c5a880]"
              : "border-black/10 text-black bg-black/5 hover:border-[#c5a880] hover:text-[#c5a880]"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Indicator Dots */}
      <div className={`absolute bottom-12 left-4 sm:left-10 z-30 flex items-center space-x-2 backdrop-blur-sm p-1.5 rounded-full border ${
        theme === "dark" ? "bg-black/20 border-white/5" : "bg-white/35 border-black/5"
      }`}>
        {slides.map((_, index) => (
          <button
            id={`hero-dot-${index}`}
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              current === index 
                ? "w-8 bg-[#c5a880]" 
                : theme === "dark"
                  ? "w-1.5 bg-white/30 hover:bg-white/50"
                  : "w-1.5 bg-black/25 hover:bg-black/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center">
        <span className={`font-mono text-[8px] tracking-widest uppercase mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className={`w-5 h-8 border rounded-full p-1 flex justify-center backdrop-blur-xs ${
            theme === "dark" ? "border-white/20 bg-white/5" : "border-black/20 bg-black/5"
          }`}
        >
          <div className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

