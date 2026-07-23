import React from "react";
import { ContactSection } from "../components/ContactSection";

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white">
      {/* Page Header */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-[#161616] to-[#0B0B0B] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
            Official Location & Directions
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white">
            Find & Contact Us
          </h1>

          <p className="font-cormorant italic text-2xl text-gray-300 max-w-2xl mx-auto">
            Located at BN Reddy Nagar, Hyderabad. Tap below to navigate directly on Google Maps, call us, or message on WhatsApp.
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};
