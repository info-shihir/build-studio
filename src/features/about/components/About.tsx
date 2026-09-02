"use client";

import { motion } from "motion/react";
import { Award, Layers, MapPin, Sparkles } from "lucide-react";
import { AboutSection, StatItem, CompanyMeta } from "@/types";
import SiteContainer from "@/shared/ui/SiteContainer";

interface AboutProps {
  about: AboutSection;
  stats: StatItem[];
  company: CompanyMeta;
  overview?: boolean;
  hideHeader?: boolean;
}

export default function About({ about, stats, company, overview = false, hideHeader = false }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  // Assign icons matching the stats dynamically
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-5 h-5 text-[#c5a880]" />;
      case 1:
        return <Award className="w-5 h-5 text-[#c5a880]" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-[#c5a880]" />;
      case 3:
        return <MapPin className="w-5 h-5 text-[#c5a880]" />;
      default:
        return <Layers className="w-5 h-5 text-[#c5a880]" />;
    }
  };

  return (
    <section id="about" className="relative py-24 bg-transparent overflow-hidden scroll-mt-24">
      {/* Liquid fluid background ambient orbs */}
      <div className="absolute top-1/4 left-5 w-[350px] h-[350px] rounded-full opacity-45 blur-[100px] pointer-events-none transition-all duration-500 liquid-orb-dark-1" />
      <div className="absolute bottom-1/4 right-5 w-[400px] h-[400px] rounded-full opacity-35 blur-[110px] pointer-events-none transition-all duration-500 liquid-orb-dark-2" />

      <SiteContainer className="relative z-10">
        
        {/* About Intro Grid */}
        <div className={`grid grid-cols-1 ${hideHeader ? "" : "lg:grid-cols-12"} gap-12 lg:gap-20 items-start`}>
          {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-[#c5a880]" />
              <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                Who We Are
              </span>
            </div>
            <h2 id="about-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 text-white">
              {about.title}
            </h2>
            <p id="about-subtitle" className="font-display text-lg sm:text-xl text-[#c5a880] font-medium leading-relaxed italic">
              {about.subtitle}
            </p>
            <div className="hidden lg:block h-[120px] w-[1px] bg-gradient-to-b from-[#c5a880] to-transparent ml-4 mt-8" />
          </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: hideHeader ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${hideHeader ? "max-w-4xl" : "lg:col-span-7"} space-y-6 font-light text-base sm:text-lg leading-relaxed transition-colors duration-300 text-gray-300`}
          >
            {(overview ? about.paragraphs.slice(0, 1) : about.paragraphs).map((p, idx) => (
              <p id={`about-paragraph-${idx}`} key={idx}>
                {p}
              </p>
            ))}
            {!overview && company.regulatoryNote && (
              <p id="about-regulatory-note" className="text-sm italic border-l-2 border-[#c5a880]/40 pl-4 text-gray-400">
                {company.regulatoryNote}
              </p>
            )}
          </motion.div>
        </div>

        {/* Pillars section */}
        {!overview && (
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 id="about-pillars-heading" className="font-display text-xs tracking-widest uppercase font-bold transition-colors duration-300 text-gray-400">
              Business Objects
            </h3>
            <div className="h-[2px] w-12 bg-[#c5a880] mx-auto mt-2" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          >
            {about.pillars.map((pillar, idx) => (
              <motion.div
                id={`about-pillar-card-${idx}`}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" as const } }}
                key={idx}
                className="p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden liquid-glass-card glass-panel-dark liquid-shimmer"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a880] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <span className="font-mono text-3xl font-extralight text-[#c5a880]/40 block mb-4">
                  0{idx + 1}
                </span>
                <h4 id={`about-pillar-title-${idx}`} className="font-display text-lg font-bold mb-3 transition-colors duration-300 text-white">
                  {pillar.title}
                </h4>
                <p id={`about-pillar-desc-${idx}`} className="font-sans text-sm leading-relaxed font-light transition-colors duration-300 text-gray-400">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        )}

        {/* Dynamic numerical counter stat cards */}
        <div id="about-stats-container" className="mt-24 pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                id={`about-stat-item-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={stat.id}
                className="p-6 rounded-2xl text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 transition-all duration-500 hover:scale-[1.03] liquid-glass-card glass-panel-dark liquid-shimmer"
              >
                <div className="p-3 backdrop-blur-md rounded-xl self-center sm:self-start border shadow-sm transition-colors duration-300 bg-white/5 border-white/10">
                  {getStatIcon(idx)}
                </div>
                <div className="space-y-1">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight block transition-colors duration-300 text-white">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs uppercase font-semibold text-[#c5a880] tracking-widest block">
                    {stat.label}
                  </span>
                  <span className="font-sans text-[11px] font-light block leading-normal transition-colors duration-300 text-gray-400">
                    {stat.sub}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </SiteContainer>
    </section>
  );
}
