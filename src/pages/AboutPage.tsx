import React from "react";
import { Link } from "react-router-dom";
import { About } from "../components/About";
import { MapPin, Sparkles, Clock, ShieldCheck, HeartHandshake, Award, ArrowRight, Utensils } from "lucide-react";
import { useApp } from "../context/AppContext";

export const AboutPage: React.FC = () => {
  const { setIsBookTableOpen } = useApp();

  const brandPillars = [
    {
      icon: Sparkles,
      title: "Rooftop Ambiance",
      desc: "Open-air luxury under open Hyderabad skies with romantic fairy lights, warm bonfire glow, and panoramic city night views.",
    },
    {
      icon: Utensils,
      title: "Artisanal Culinary Mastery",
      desc: "Every dish crafted from scratch using high-grade mozzarella, fresh spices, organic veggies, and signature house-made sauces.",
    },
    {
      icon: ShieldCheck,
      title: "5-Star Hygiene Standards",
      desc: "Sanitized kitchens, temperature-checked staff, and fresh daily sourcing ensuring pristine food quality every single day.",
    },
    {
      icon: HeartHandshake,
      title: "Hospitality Warmth",
      desc: "Dedicated event hosts and attentive service tailored for families, couples, birthday bashes, and corporate get-togethers.",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white">
      {/* Page Header Hero */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#161616] via-[#0B0B0B] to-[#0B0B0B] border-b border-white/10 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E30613_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
            A Paradise On Roof • BN Reddy Nagar, Hyderabad
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white">
            The Story Of Oasis The Cafe
          </h1>

          <p className="font-cormorant italic text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Where open skies, gourmet culinary craft, and memorable celebrations create Hyderabad's premier rooftop sanctuary.
          </p>
        </div>
      </div>

      {/* Main Storytelling Component */}
      <About />

      {/* Brand Pillars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.25em] font-poppins">
            Uncompromising Excellence
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
            Our Hospitality Pillars
          </h2>
          <p className="text-sm text-gray-400 font-poppins">
            Designed for guests seeking a luxury rooftop atmosphere without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandPillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E30613]/10 border border-[#E30613]/30 flex items-center justify-center text-[#E30613] mb-6 group-hover:bg-[#E30613] group-hover:text-white transition-colors">
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs text-gray-400 font-poppins leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Location Banner Callout */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#161616] via-black to-[#161616] border border-[#E30613]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-[#E30613] text-xs font-bold uppercase tracking-wider font-poppins">
              <MapPin className="w-4 h-4" />
              <span>BN Reddy Nagar, Hyderabad</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white">
              Experience The Rooftop Vibe Tonight
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 font-poppins leading-relaxed">
              Open 7 days a week. Opens Daily at 12:00 Noon. Walk-ins welcomed, table reservations recommended for rooftop corner seating.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setIsBookTableOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(227,6,19,0.5)] transition-all cursor-pointer text-center"
            >
              Reserve Table
            </button>

            <Link
              to="/menu"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all cursor-pointer text-center"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
