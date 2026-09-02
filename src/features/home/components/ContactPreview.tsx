"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { CompanyMeta } from "@/types";
import SiteContainer from "@/shared/ui/SiteContainer";
import GoogleMapEmbed from "@/shared/ui/GoogleMapEmbed";

interface ContactPreviewProps {
  company: CompanyMeta;
}

export default function ContactPreview({ company }: ContactPreviewProps) {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full opacity-35 blur-[110px] pointer-events-none liquid-orb-dark-2" />
      <SiteContainer className="relative z-10">
        <div className="rounded-2xl p-8 sm:p-10 lg:p-12 liquid-glass-card glass-panel-dark liquid-shimmer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
            {/* Left: contact info */}
            <div className="flex flex-col text-left">
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="h-[1px] w-8 bg-[#c5a880]" />
                <span className="font-mono text-xs text-[#c5a880] uppercase tracking-widest font-semibold">
                  Get in Touch
                </span>
                <span className="h-[1px] w-8 bg-[#c5a880]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-400 font-light mb-8">
                Reach out to our team for real estate, construction, trade, or consultancy inquiries.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Phone className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Phone</p>
                    <p className="text-sm text-gray-300">{company.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Mail className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-300">{company.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-[#c5a880] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Office</p>
                    <p className="text-sm text-gray-300 leading-snug">{company.contact.address}</p>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2.5 px-8 py-3.5 glass-btn-gold text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold rounded-xl transition-all group mt-auto"
              >
                <span>Send an Inquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: map */}
            <GoogleMapEmbed
              address={company.contact.address}
              map={company.contact.map}
              title="Arshia Global BD Office Location"
              layout="fill"
              showOpenLink
            />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
