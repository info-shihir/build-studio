import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, Check, AlertCircle } from "lucide-react";
import { CompanyMeta } from "../types";
import { useTheme } from "../context/ThemeContext";

interface ContactProps {
  company: CompanyMeta;
}

export default function Contact({ company }: ContactProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential Architecture",
    area: "",
    message: "",
  });

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    "Residential Architecture",
    "Commercial Architecture",
    "Interior Renovation",
    "Landscape Design",
    "Comprehensive Consultancy",
  ];

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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "Residential Architecture",
        area: "",
        message: "",
      });
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  };

  return (
    <section id="contact" className={`py-24 bg-transparent relative overflow-hidden transition-colors duration-500 scroll-mt-24 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
      {/* Liquid fluid background ambient orbs */}
      <div className={`absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full opacity-40 blur-[100px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-1" : "liquid-orb-1"}`} />
      <div className={`absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full opacity-35 blur-[110px] pointer-events-none transition-all duration-500 ${theme === "dark" ? "liquid-orb-dark-2" : "liquid-orb-2"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#c5a880]" />
            <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
              Get in Touch
            </span>
          </div>
          <h2 id="contact-title" className={`font-display text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>
            Start Your Build
          </h2>
          <p id="contact-subtitle" className={`font-light text-sm sm:text-base leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Ready to frame your spatial dreams? Fill out our design brief, or visit our Banani studio for a cup of coffee.
          </p>
        </div>

        {/* Form and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form Section */}
          <div className={`rounded-2xl p-8 sm:p-10 shadow-2xl relative transition-all duration-500 lg:col-span-7 liquid-glass-card ${
            theme === "dark" 
              ? "glass-panel-dark liquid-shimmer" 
              : "glass-panel-light liquid-shimmer liquid-shimmer-light"
          }`}>
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
                    <h3 className={`font-display text-2xl font-bold transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"}`}>Brief Submitted Successfully</h3>
                    <p className={`font-light text-sm max-w-md transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Thank you for sharing your project parameters. A Senior Project Architect will review your requirements and reach out within 24 working hours.
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
                        className={`w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all ${
                          theme === "dark" 
                            ? "bg-white/5 border border-white/10 focus:bg-white/10 text-white" 
                            : "bg-black/5 border border-black/10 focus:bg-black/10 text-[#0a0a0a]"
                        }`}
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
                        className={`w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all ${
                          theme === "dark" 
                            ? "bg-white/5 border border-white/10 focus:bg-white/10 text-white" 
                            : "bg-black/5 border border-black/10 focus:bg-black/10 text-[#0a0a0a]"
                        }`}
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
                        className={`w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all ${
                          theme === "dark" 
                            ? "bg-white/5 border border-white/10 focus:bg-white/10 text-white" 
                            : "bg-black/5 border border-black/10 focus:bg-black/10 text-[#0a0a0a]"
                        }`}
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
                        className={`w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all appearance-none cursor-pointer ${
                          theme === "dark" 
                            ? "bg-white/5 border border-white/10 focus:bg-white/10 text-white" 
                            : "bg-black/5 border border-black/10 focus:bg-black/10 text-[#0a0a0a]"
                        }`}
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className={theme === "dark" ? "bg-[#18181b] text-white" : "bg-[#f8f6f0] text-black"}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Area input */}
                  <div className="space-y-2">
                    <label htmlFor="area-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                      Target Spatial Area (sq. ft. / katha)
                    </label>
                    <input
                      id="area-input"
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. 5,000 sq.ft. duplex"
                      className={`w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all ${
                        theme === "dark" 
                          ? "bg-white/5 border border-white/10 focus:bg-white/10 text-white" 
                          : "bg-black/5 border border-black/10 focus:bg-black/10 text-[#0a0a0a]"
                      }`}
                    />
                  </div>

                  {/* Message input */}
                  <div className="space-y-2">
                    <label htmlFor="message-input" className="font-mono text-[10px] uppercase text-[#c5a880] tracking-widest font-semibold block">
                      Describe Your Vision *
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your plot, spatial dreams, required rooms, or inspiration themes..."
                      required
                      className={`w-full rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-[#c5a880] transition-all resize-none ${
                        theme === "dark" 
                          ? "bg-white/5 border border-white/10 focus:bg-white/10 text-white" 
                          : "bg-black/5 border border-black/10 focus:bg-black/10 text-[#0a0a0a]"
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full flex items-center justify-center space-x-3 py-4 text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group glass-btn-gold"
                  >
                    <span>{formState === "submitting" ? "Compiling Blueprints..." : "Send Spatial Brief"}</span>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Contact Details & Embedded map */}
          <div className="lg:col-span-5 space-y-10">
            {/* Contact Details cards */}
            <div className={`rounded-2xl p-8 space-y-6 transition-all duration-500 liquid-glass-card ${
            theme === "dark" 
              ? "glass-panel-dark liquid-shimmer" 
              : "glass-panel-light liquid-shimmer liquid-shimmer-light"
            }`}>
              <h3 className={`font-display text-lg font-bold border-b pb-3 transition-colors duration-300 ${
                theme === "dark" ? "text-white border-white/5" : "text-[#0a0a0a] border-black/10"
              }`}>
                Studio Credentials
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 ${
                    theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>HQ Address</h4>
                    <p id="contact-address-text" className={`text-sm font-light leading-relaxed mt-1 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-850"}`}>
                      {company.contact.address}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 ${
                    theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Email Us</h4>
                    <p id="contact-email-text" className={`text-sm font-light mt-1 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-850"}`}>
                      <a href={`mailto:${company.contact.email}`} className="hover:text-[#c5a880] transition-colors">
                        {company.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 ${
                    theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Call Studio</h4>
                    <p id="contact-phone-text" className={`text-sm font-light mt-1 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-850"}`}>
                      <a href={`tel:${company.contact.phone}`} className="hover:text-[#c5a880] transition-colors">
                        {company.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-lg text-[#c5a880] mt-1 border transition-all duration-300 ${
                    theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Studio Hours</h4>
                    <p id="contact-hours-text" className={`text-sm font-light mt-1 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-850"}`}>
                      {company.contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded maps iframe styled beautifully for high contrast */}
            <div id="contact-map" className={`aspect-video w-full rounded-2xl overflow-hidden border shadow-2xl relative transition-all duration-500 bg-[#0a0a0a] ${
              theme === "dark" ? "border-white/10 grayscale opacity-80 hover:opacity-100" : "border-black/10 grayscale-xs opacity-95"
            }`}>
              <iframe
                title="Build Studio Banani Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0118831969446!2d90.40562721146313!3d23.782655787353107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70b72ab8393%3A0x7d6f5f9037e2fb25!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
