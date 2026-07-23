import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowDown, Star, MapPin, Utensils } from "lucide-react";

interface HeroProps {
  onOrderNow: () => void;
  onBookCelebration: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onBookCelebration }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B0B0B]"
    >
      {/* Background Cinematic Visual with Glass Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/rooftop_hero_1784783481532.jpg"
          alt="Oasis Rooftop Cafe Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-110 scale-105 animate-pulse transition-transform duration-10000"
          referrerPolicy="no-referrer"
        />
        {/* Dark Vignette & Red Spotlight Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-black/80" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E30613]/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Soft Steam & Floating Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-[#E30613] shadow-[0_0_15px_#E30613] animate-float opacity-70" />
        <div className="absolute top-1/2 right-12 w-3 h-3 rounded-full bg-white/80 shadow-[0_0_20px_#FFF] animate-float opacity-50 delay-1000" />
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-[#E30613] shadow-[0_0_15px_#E30613] animate-float opacity-60 delay-2000" />
      </div>

      {/* Main Glassmorphism Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-red-200 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_20px_rgba(227,6,19,0.3)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#E30613] animate-ping" />
          <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
          <span>BN Reddy Nagar, Hyderabad • Opens Daily at 12:00 Noon</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.08] tracking-tight mb-6"
        >
          GOOD FOOD. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-[#E30613] drop-shadow-[0_0_35px_rgba(227,6,19,0.8)]">
            GREAT VIBES.
          </span>{" "}
          <br />
          BEAUTIFUL MEMORIES.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-gray-200 tracking-wide max-w-2xl mb-10"
        >
          Experience Hyderabad's Premier Rooftop Cafe.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={onOrderNow}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#E30613] via-[#FF1A27] to-[#B0040E] text-white font-bold text-sm sm:text-base uppercase tracking-widest shadow-[0_0_35px_rgba(227,6,19,0.7)] hover:shadow-[0_0_50px_rgba(227,6,19,1)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Utensils className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Order Online Now</span>
          </button>

          <button
            onClick={onBookCelebration}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 hover:border-[#E30613] text-white font-bold text-sm sm:text-base uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-[#E30613]" />
            <span>Book Celebration</span>
          </button>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 max-w-4xl w-full"
        >
          <div className="flex flex-col items-center border-r border-white/10 last:border-0 pr-2">
            <div className="flex items-center text-amber-400 gap-1 text-base font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
              700+ Google Reviews
            </span>
          </div>

          <div className="flex flex-col items-center border-r border-white/10 last:border-0 pr-2">
            <span className="text-white text-base font-bold font-cinzel text-[#E30613]">
              200+
            </span>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
              Delicious Dishes
            </span>
          </div>

          <div className="flex flex-col items-center border-r border-white/10 last:border-0 pr-2">
            <span className="text-white text-base font-bold font-cinzel">
              Rooftop
            </span>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
              Open Air Ambience
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-white text-base font-bold font-cinzel text-emerald-400">
              Projector
            </span>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
              Live Screening & Parties
            </span>
          </div>
        </motion.div>

        {/* Interactive Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 inline-flex flex-col items-center text-gray-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-poppins uppercase tracking-[0.3em] mb-2">
            Scroll To Discover
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 group-hover:border-[#E30613] p-1 flex justify-center transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-2.5 rounded-full bg-[#E30613]"
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
};
