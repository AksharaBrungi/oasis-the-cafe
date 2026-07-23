import React, { useState } from "react";
import { GALLERY_ITEMS } from "../data/siteData";
import { GalleryItem } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Rooftop", "Food", "Mocktails", "Events"];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            Visual Storytelling
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-3">
            Oasis Atmosphere Gallery
          </h2>
          <p className="font-cormorant italic text-xl text-gray-300">
            A glimpse into the starlit nights, artisanal craft, and vibrant celebrations.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E30613] text-white shadow-[0_0_20px_rgba(227,6,19,0.5)]"
                  : "bg-[#161616] text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveLightboxIndex(idx)}
              className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#E30613]/60 transition-all duration-500 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Title & Category Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#E30613] uppercase tracking-widest font-poppins">
                    {item.category}
                  </span>
                  <h4 className="font-cinzel text-lg font-bold text-white group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h4>
                </div>

                <div className="p-2.5 rounded-full bg-[#E30613] text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-[0_0_15px_#E30613]">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-[#E30613] text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev & Next Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-[#E30613] text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-[#E30613] text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col items-center text-center space-y-4"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/20 max-h-[70vh] shadow-[0_0_50px_rgba(227,6,19,0.3)]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[70vh] w-auto object-contain rounded-3xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E30613]">
                  {activeItem.category} • Oasis Gallery
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-gray-300 font-poppins max-w-lg mt-2">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
