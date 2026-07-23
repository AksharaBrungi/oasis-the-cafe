import React from "react";
import { GallerySection } from "../components/GallerySection";

export const GalleryPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white">
      <div className="relative py-16 px-4 bg-gradient-to-b from-[#161616] to-[#0B0B0B] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
            High-Resolution Visual Showcase
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white">
            Photo & Atmosphere Gallery
          </h1>

          <p className="font-cormorant italic text-2xl text-gray-300 max-w-2xl mx-auto">
            Take a visual tour of Oasis The Cafe — from sunset rooftop vistas to signature artisanal dishes.
          </p>
        </div>
      </div>

      <GallerySection />
    </div>
  );
};
