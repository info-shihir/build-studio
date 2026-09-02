"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, Check, AlertCircle } from "lucide-react";
import { CompanyMeta } from "@/types";
import SiteContainer from "@/shared/ui/SiteContainer";
import GoogleMapEmbed from "@/shared/ui/GoogleMapEmbed";
import { submitInquiry } from "../api/submitInquiry";
import { PROJECT_TYPES } from "../constants";

interface ContactProps {
  company: CompanyMeta;
  hideHeader?: boolean;
}

export default function Contact({ company, hideHeader = false }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Real Estate",
    area: "",
    message: "",
  });

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validations
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const messageBody = formData.area.trim()
        ? `Target area/quantity: ${formData.area.trim()}\n\n${formData.message.trim()}`
        : formData.message.trim();

      await submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        projectType: formData.projectType,
        message: messageBody,
      });

      setFormState("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "Real Estate",
        area: "",
        message: "",
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden transition-colors duration-500 scroll-mt-24 text-white">
      {/* Liquid fluid background ambient orbs */}
      <div className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full opacity-40 blur-[100px] pointer-events-none transition-all duration-500 liquid-orb-dark-1" />
      <div className="absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full opacity-35 blur-[110px] pointer-events-none transition-all duration-500 liquid-orb-dark-2" />

      <SiteContainer className="relative z-10">
        
        {!hideHeader && (
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#c5a880]" />
            <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
              Get in Touch
            </span>
          </div>
          <h2 id="contact-title" className="font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 text-white">
            Contact Us
          </h2>
          <p id="contact-subtitle" className="font-light text-sm sm:text-base leading-relaxed transition-colors duration-300 text-gray-400">
            Ready to start your next project? Fill out the form below or reach out directly — our team is here to help.
          </p>
        </div>
        )}

        {/* Form and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form Section */}
          <div className="rounded-2xl p-8 sm:p-10 shadow-2xl relative transition-all duration-500 lg:col-span-7 liquid-glass-card glass-panel-dark liquid-shimmer">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#c5a880]" />

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success-prompt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880] flex items-center justify-center text-[#c5a880] animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold transition-colors duration-300 text-white">Inquiry Submitted Successfully</h3>
                    <p className="font-light text-sm max-w-md transition-colors duration-300 text-gray-400">
                      Thank you for reaching out. A member of our team will review your inquiry and respond within 24 working hours.
                    </p>
                  </div>
                  <button
                    id="success-reset-btn"
                    onClick={() => setFormState("idle")}
                    className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#a98d65] text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-xl transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  id="contact-form"
                  key="contact-form-key"
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  {formState === "error" && (
                    <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Tanzim Ahmed"
                        required
                        className="w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all bg-white/5 border border-white/10 focus:bg-white/10 text-white"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="email-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                        Email Address *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. tanzim@example.com"
                        required
                        className="w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all bg-white/5 border border-white/10 focus:bg-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone input */}
                    <div className="space-y-2">
                      <label htmlFor="phone-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                        Phone Number
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +880 1712 000000"
                        className="w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all bg-white/5 border border-white/10 focus:bg-white/10 text-white"
                      />
                    </div>

                    {/* Project Type Select */}
                    <div className="space-y-2">
                      <label htmlFor="type-select" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                        Project Type
                      </label>
                      <select
                        id="type-select"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all appearance-none cursor-pointer bg-white/5 border border-white/10 focus:bg-white/10 text-white"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-[#18181b] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Area input */}
                  <div className="space-y-2">
                    <label htmlFor="area-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                      Target Area / Quantity
                    </label>
                    <input
                      id="area-input"
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. 5,000 sq.ft. or 10 katha"
                      className="w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all bg-white/5 border border-white/10 focus:bg-white/10 text-white"
                    />
                  </div>

                  {/* Message input */}
                  <div className="space-y-2">
                    <label htmlFor="message-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                      Your Message *
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, requirements, or inquiry..."
                      required
                      className="w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all resize-none bg-white/5 border border-white/10 focus:bg-white/10 text-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full flex items-center justify-center space-x-3 py-4 text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group glass-btn-gold"
                  >
                    <span>{formState === "submitting" ? "Sending..." : "Send Inquiry"}</span>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Contact Details & Embedded map */}
          <div className="lg:col-span-5 space-y-10">
            {/* Contact Details cards */}
            <div className="rounded-2xl p-8 space-y-6 transition-all duration-500 liquid-glass-card glass-panel-dark liquid-shimmer">
              <h3 className="font-display text-lg font-bold border-b pb-3 transition-colors duration-300 text-white border-white/5">
                Company Details
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 bg-white/5 border-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 text-gray-400">HQ Address</h4>
                    <p id="contact-address-text" className="text-sm font-light leading-relaxed mt-1 transition-colors duration-300 text-gray-300">
                      {company.contact.address}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 bg-white/5 border-white/5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 text-gray-400">Email Us</h4>
                    <p id="contact-email-text" className="text-sm font-light mt-1 transition-colors duration-300 text-gray-300">
                      <a href={`mailto:${company.contact.email}`} className="hover:text-[#c5a880] transition-colors">
                        {company.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 bg-white/5 border-white/5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 text-gray-400">Call Us</h4>
                    <p id="contact-phone-text" className="text-sm font-light mt-1 transition-colors duration-300 text-gray-300">
                      <a href={`tel:${company.contact.phone}`} className="hover:text-[#c5a880] transition-colors">
                        {company.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 bg-white/5 border-white/5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 text-gray-400">Office Hours</h4>
                    <p id="contact-hours-text" className="text-sm font-light mt-1 transition-colors duration-300 text-gray-300">
                      {company.contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <GoogleMapEmbed
              id="contact-map"
              address={company.contact.address}
              map={company.contact.map}
              title="Arshia Global BD Office Location"
            />
          </div>

        </div>

      </SiteContainer>
    </section>
  );
}
