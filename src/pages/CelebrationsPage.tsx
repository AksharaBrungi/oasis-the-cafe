import React, { useState } from "react";
import { Celebrations } from "../components/Celebrations";
import { BookTableModal } from "../components/BookTableModal";
import { Sparkles, Calendar, Users, PartyPopper, CheckCircle2, GlassWater, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";

export const CelebrationsPage: React.FC = () => {
  const { setIsBookTableOpen } = useApp();

  const partyPackages = [
    {
      name: "Rooftop Birthday Bash",
      icon: PartyPopper,
      guests: "10 - 50 Guests",
      features: [
        "Custom Balloon & Floral Canopy Arch",
        "3-Course Gourmet Buffet or A La Carte",
        "Mocktail Punch Bowl Service",
        "Rooftop DJ & Live Music Setup",
        "Complimentary Birthday Cake Sparklers",
      ],
      tag: "Most Popular",
    },
    {
      name: "Candlelight Date Night",
      icon: Heart,
      guests: "Couples / 2 Guests",
      features: [
        "Private Corner Rooftop Seating",
        "Rose Petal Table Setup & Candle Lighting",
        "Special 4-Course Chef Tasting Menu",
        "2 Signature Sparkling Mocktails",
        "Personalized Music Request",
      ],
      tag: "Romantic Favorite",
    },
    {
      name: "Kitty Party / Family Gathering",
      icon: Users,
      guests: "8 - 30 Guests",
      features: [
        "Spacious High-Rise Sofa Lounge",
        "Unlimited High-Tea Snacks & Starter Platter",
        "Assorted Cold Coffee & Mocktail Bar",
        "Customized Group Photo Props",
        "Dedicated Service Captain",
      ],
      tag: "Family Special",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white">
      {/* Header Banner */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-[#161616] to-[#0B0B0B] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
            Memorable Rooftop Gatherings
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white">
            Celebrations On Roof
          </h1>

          <p className="font-cormorant italic text-2xl text-gray-300 max-w-2xl mx-auto">
            Host your birthdays, anniversaries, kitty parties, and corporate evenings under open Hyderabad skies.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsBookTableOpen(true)}
              className="px-8 py-4 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.6)] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Celebration Spot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Celebrations Showcase */}
      <Celebrations />

      {/* Party Packages Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.25em] font-poppins">
            Tailored Experiences
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
            Curated Party Packages
          </h2>
          <p className="text-sm text-gray-400 font-poppins">
            Customizable menus, theme decorations, and dedicated service for all your milestone occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partyPackages.map((pkg) => {
            const IconComp = pkg.icon;
            return (
              <div
                key={pkg.name}
                className="bg-[#161616] border border-white/10 hover:border-[#E30613]/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-2xl relative"
              >
                {pkg.tag && (
                  <span className="absolute top-4 right-4 bg-[#E30613] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_#E30613]">
                    {pkg.tag}
                  </span>
                )}

                <div>
                  <div className="p-4 rounded-2xl bg-[#E30613]/10 border border-[#E30613]/30 w-fit text-[#E30613] mb-6">
                    <IconComp className="w-8 h-8" />
                  </div>

                  <h3 className="font-cinzel text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <span className="inline-block text-xs font-poppins font-semibold text-emerald-400 mb-6 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">
                    {pkg.guests}
                  </span>

                  <ul className="space-y-3 mb-8 text-xs text-gray-300 font-poppins">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setIsBookTableOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-[#E30613] border border-white/20 hover:border-[#E30613] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Reserve This Package
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
