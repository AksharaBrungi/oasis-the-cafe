import React from "react";
import { MenuItem } from "../types";
import { motion } from "framer-motion";
import { Star, Plus, Flame, Sparkles } from "lucide-react";

interface FeaturedDishesProps {
  dishes: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ dishes, onAddToCart }) => {
  const featured = dishes.filter((d) => d.isChefSpecial || d.isBestSeller).slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B0B0B] via-[#121212] to-[#0B0B0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
              Chef's Culinary Masterpieces
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-3">
              Signature Spotlight
            </h2>
          </div>
          <p className="font-cormorant italic text-lg text-gray-400 max-w-md mt-2 md:mt-0">
            Handpicked specialties crafted exclusively for our rooftop connoisseurs.
          </p>
        </div>

        {/* Large Premium Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl relative group"
            >
              {/* Image Container with Steam Animation */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/60" />

                {/* Steam effect */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-10 bg-white/50 rounded-full blur-xs animate-steam mx-auto" />
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E30613] to-[#B0040E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_15px_#E30613]">
                  Chef's Signature
                </div>

                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{dish.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E30613]">
                      {dish.category}
                    </span>
                    <span className="font-cinzel text-2xl font-black text-white">
                      ₹{dish.price}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#E30613] transition-colors">
                    {dish.name}
                  </h3>

                  <p className="text-xs text-gray-400 font-poppins leading-relaxed mb-6">
                    {dish.description}
                  </p>
                </div>

                <button
                  onClick={() => onAddToCart(dish)}
                  className="w-full py-3.5 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(227,6,19,0.5)] hover:shadow-[0_0_30px_rgba(227,6,19,0.9)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add To Order</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
