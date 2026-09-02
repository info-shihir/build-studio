"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/types";
import SafeImage from "@/shared/ui/SafeImage";

interface TestimonialsProps {
  testimonials: Testimonial[];
  hideHeader?: boolean;
}

export default function Testimonials({ testimonials, hideHeader = false }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent overflow-hidden relative scroll-mt-24">
      {/* Liquid fluid background ambient orbs */}
      <div className="absolute top-1/4 left-0 w-[350px] h-[350px] rounded-full opacity-50 blur-[100px] pointer-events-none transition-all duration-500 liquid-orb-dark-1" />
      <div className="absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full opacity-40 blur-[110px] pointer-events-none transition-all duration-500 liquid-orb-dark-2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {!hideHeader && (
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#c5a880]" />
            <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
              Client Feedback
            </span>
            <span className="h-[1px] w-8 bg-[#c5a880]" />
          </div>
          <h2 id="testimonials-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 text-white">
            What Our Clients Say
          </h2>
        </div>
        )}

        {/* Testimonial Active Slide Container */}
        <div className="relative rounded-3xl p-8 sm:p-16 shadow-2xl overflow-hidden transition-all duration-500 liquid-glass-card glass-panel-dark liquid-shimmer">
          {/* Quote icon watermark */}
          <Quote className="absolute right-10 top-10 w-28 h-28 pointer-events-none transform translate-x-4 -translate-y-4 animate-pulse transition-colors duration-300 text-white/5" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 relative z-10"
            >
              {/* Star Ratings */}
              <div id="stars-row" className="flex items-center space-x-1">
                {Array.from({ length: testimonials[current].rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-[#c5a880] text-[#c5a880]" />
                ))}
              </div>

              {/* Quote text */}
              <p id="testimonial-quote-text" className="font-sans text-lg sm:text-xl font-light leading-relaxed italic transition-colors duration-300 text-gray-200">
                "{testimonials[current].quote}"
              </p>

              {/* Client Info footer */}
              <div className="flex items-center space-x-4 pt-6 border-t transition-colors duration-300 border-white/10">
                <SafeImage
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fallbackType="profile"
                  fallbackText={testimonials[current].name}
                  className="w-14 h-14 rounded-full border transition-colors duration-300 border-white/10"
                />
                <div>
                  <h4 id="testimonial-client-name" className="font-display font-bold text-base transition-colors duration-300 text-white">
                    {testimonials[current].name}
                  </h4>
                  <p id="testimonial-client-company" className="font-sans text-xs transition-colors duration-300 text-gray-400">
                    {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation sliders */}
          <div className="absolute bottom-10 right-8 sm:right-16 z-20 flex items-center space-x-3">
            <button
              id="testimonial-prev-btn"
              onClick={prevTestimonial}
              className="p-3 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 border-white/10 text-white hover:border-[#c5a880] hover:text-[#0a0a0a] hover:bg-[#c5a880] bg-white/5"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={nextTestimonial}
              className="p-3 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 border-white/10 text-white hover:border-[#c5a880] hover:text-[#0a0a0a] hover:bg-[#c5a880] bg-white/5"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div id="testimonials-pagination" className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              id={`testimonial-dot-${index}`}
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === index 
                  ? "w-8 bg-[#c5a880]" 
                  : "w-2 bg-white/10 hover:bg-white/25"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
