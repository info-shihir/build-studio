"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { ReactNode } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { getListedServices } from "./lib/services";

import siteContent from "./data/content.json";
import { SiteContent } from "./types";

const content = siteContent as SiteContent;

interface AnimatedSectionProps {
  children?: ReactNode;
  id?: string;
}

function AnimatedSection({ children, id }: AnimatedSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      id="applet-viewport" 
      className="min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#c5a880]/30 relative bg-[#151413] text-[#f4f4f5] selection:text-white"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a98d65] via-[#c5a880] to-[#e6d5bc] origin-left z-[100] shadow-[0_1px_12px_rgba(197,168,128,0.5)]"
        style={{ scaleX }}
      />

      {/* Background Floral Pattern Overlay */}
      <div className="absolute inset-0 floral-bg pointer-events-none opacity-[0.035] mix-blend-overlay" />

      {/* Elegant initial page load entrance animation */}
      <motion.div
        id="page-entrance-wrapper"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col min-h-screen"
      >
        {/* Header */}
        <Header company={content.company} />

        {/* Main Content Sections */}
        <main id="main-content">
          {/* Home / Hero Section */}
          <Hero slides={content.hero.slides} company={content.company} />

          {/* About Section */}
          <AnimatedSection id="animated-about">
            <About about={content.about} stats={content.company.stats} company={content.company} />
          </AnimatedSection>

          {/* Services / Expertise */}
          <AnimatedSection id="animated-services">
            <Services services={getListedServices()} />
          </AnimatedSection>

          {/* Selected Projects */}
          <AnimatedSection id="animated-projects">
            <Projects projects={content.projects} />
          </AnimatedSection>

          {/* How We Build / Workflow */}
          <AnimatedSection id="animated-process">
            <Process steps={content.process} />
          </AnimatedSection>

          {/* Professional Core Team */}
          <AnimatedSection id="animated-team">
            <Team departments={content.teamDepartments} />
          </AnimatedSection>

          {/* Client Testimonials */}
          <AnimatedSection id="animated-testimonials">
            <Testimonials testimonials={content.testimonials} />
          </AnimatedSection>

          {/* Contact Form Section */}
          <AnimatedSection id="animated-contact">
            <Contact company={content.company} />
          </AnimatedSection>
        </main>

        {/* Footer */}
        <Footer company={content.company} />
      </motion.div>
    </div>
  );
}
