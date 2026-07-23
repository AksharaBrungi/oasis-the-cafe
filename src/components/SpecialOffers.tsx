import React, { useState } from "react";
import { DAILY_OFFERS } from "../data/siteData";
import { motion } from "framer-motion";
import { Tag, Sparkles, Copy, Check, Flame } from "lucide-react";

export const SpecialOffers: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="offers" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            7 Days Of Delight
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-3">
            Weekly Special Offers
          </h2>
          <p className="font-cormorant italic text-xl text-gray-300">
            Exclusive daily rooftop deals crafted to make every visit special.
          </p>
        </div>

        {/* Weekly Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DAILY_OFFERS.map((offer, idx) => (
            <motion.div
              key={offer.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_10px_35px_rgba(227,6,19,0.3)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={offer.bannerImage}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-black/40 to-black/70" />

                <div className="absolute top-4 left-4 bg-[#E30613] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest font-cinzel shadow-[0_0_12px_#E30613]">
                  {offer.day} Special
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="font-cinzel text-2xl font-black text-amber-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    {offer.discount}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-1 group-hover:text-[#E30613] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="font-cormorant italic text-base text-red-200 mb-3">
                    "{offer.tagline}"
                  </p>
                  <p className="text-xs text-gray-400 font-poppins leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Promo Code Box */}
                <div className="p-3 rounded-2xl bg-[#0B0B0B] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#E30613]" />
                    <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#E30613] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
