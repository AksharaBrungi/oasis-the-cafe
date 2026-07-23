import React, { useState, useMemo } from "react";
import { MenuItem, CategoryType } from "../types";
import { Search, Heart, Plus, Minus, Star, Flame, Clock, Sparkles, Filter, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuSectionProps {
  items: MenuItem[];
  cartItemsMap: Record<string, number>;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}

const CATEGORIES: CategoryType[] = [
  "All",
  "Continental",
  "Chinese",
  "North Indian",
  "Pizza",
  "Burger",
  "Pasta",
  "Seafood",
  "Rice Bowls",
  "Mocktails",
  "Milkshakes",
  "Desserts",
  "Salads",
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  cartItemsMap,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((dish) => {
      // Category filter
      if (selectedCategory !== "All" && dish.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === "veg" && !dish.isVeg) return false;
      if (dietFilter === "non-veg" && dish.isVeg) return false;
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchCat = dish.category.toLowerCase().includes(q);
        return matchName || matchDesc || matchCat;
      }
      return true;
    });
  }, [items, selectedCategory, dietFilter, searchQuery]);

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            Artisanal Culinary Selection
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-3">
            Exploration Of Flavors
          </h2>
          <p className="font-cormorant italic text-xl text-gray-300">
            Hand-crafted by our master chefs with premium ingredients & fiery rooftop passion.
          </p>
        </div>

        {/* Controls Bar: Search & Diet Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#161616] p-4 rounded-2xl border border-white/10">
          {/* Live Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Pizza, Pasta, Mocktails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Diet Filter Toggles */}
          <div className="flex items-center gap-2 bg-[#0B0B0B] p-1.5 rounded-xl border border-white/10 w-full md:w-auto justify-center">
            <button
              onClick={() => setDietFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                dietFilter === "all" ? "bg-white/15 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              All Dishes
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                dietFilter === "veg"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                  : "text-gray-400 hover:text-emerald-400"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietFilter("non-veg")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                dietFilter === "non-veg"
                  ? "bg-red-950 text-red-400 border border-[#E30613]/40"
                  : "text-gray-400 hover:text-red-400"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] inline-block" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Categories Carousel / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E30613] text-white shadow-[0_0_20px_rgba(227,6,19,0.6)]"
                  : "bg-[#161616] text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dish Count Header */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-400 font-poppins">
          <span>
            Showing <strong className="text-white">{filteredItems.length}</strong> delicacies
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-[#E30613] hover:underline cursor-pointer"
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#161616] rounded-3xl border border-white/10">
            <p className="font-cinzel text-xl text-gray-300 mb-2">No delicacies found</p>
            <p className="text-xs text-gray-500 font-poppins">
              Try adjusting your search query or switching category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => {
              const qty = cartItemsMap[dish.id] || 0;
              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-[#161616] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-[0_10px_30px_rgba(227,6,19,0.2)] relative"
                >
                  {/* Top Image Container */}
                  <div className="relative h-52 overflow-hidden bg-black/60">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/60" />

                    {/* Steam animation overlay */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-1.5 h-6 bg-white/40 rounded-full blur-xs animate-steam mx-auto" />
                    </div>

                    {/* Veg / Non-Veg Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      <span
                        className={`w-2.5 h-2.5 rounded-full border border-white/40 ${
                          dish.isVeg ? "bg-emerald-500" : "bg-[#E30613]"
                        }`}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white font-poppins">
                        {dish.isVeg ? "Veg" : "Non-Veg"}
                      </span>
                    </div>

                    {/* Best Seller / Chef Special Badges */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {dish.isBestSeller && (
                        <span className="bg-[#E30613] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_#E30613]">
                          Best Seller
                        </span>
                      )}
                      {dish.isChefSpecial && (
                        <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Chef's Special
                        </span>
                      )}
                    </div>

                    {/* Prep Time & Rating Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-poppins text-gray-300">
                      <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{dish.rating}</span>
                      </span>

                      <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-gray-300">
                        <Clock className="w-3 h-3 text-[#E30613]" />
                        <span>{dish.prepTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3
                          onClick={() => setSelectedDishDetail(dish)}
                          className="font-cinzel text-lg font-bold text-white hover:text-[#E30613] transition-colors cursor-pointer line-clamp-1"
                        >
                          {dish.name}
                        </h3>
                        <span className="font-cinzel text-lg font-black text-[#E30613] shrink-0">
                          ₹{dish.price}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 font-poppins line-clamp-2 leading-relaxed mb-4">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Add To Cart Row */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedDishDetail(dish)}
                        className="text-[11px] text-gray-400 hover:text-white underline font-poppins cursor-pointer"
                      >
                        View Details
                      </button>

                      {qty === 0 ? (
                        <button
                          onClick={() => onAddToCart(dish)}
                          className="px-4 py-2 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(227,6,19,0.4)] hover:shadow-[0_0_20px_rgba(227,6,19,0.8)] transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-[#0B0B0B] border border-[#E30613]/50 rounded-xl p-1">
                          <button
                            onClick={() => onRemoveFromCart(dish.id)}
                            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold font-poppins text-white">
                            {qty}
                          </span>
                          <button
                            onClick={() => onAddToCart(dish)}
                            className="p-1 rounded-lg bg-[#E30613] text-white cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {selectedDishDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#161616] border border-[#E30613]/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedDishDetail(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/20 hover:border-[#E30613] cursor-pointer"
              >
                ✕
              </button>

              <div className="relative h-64">
                <img
                  src={selectedDishDetail.image}
                  alt={selectedDishDetail.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/40" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      selectedDishDetail.isVeg
                        ? "bg-emerald-950 text-emerald-400 border-emerald-500/40"
                        : "bg-red-950 text-red-400 border-[#E30613]/40"
                    }`}
                  >
                    {selectedDishDetail.isVeg ? "100% Vegetarian" : "Non-Vegetarian"}
                  </span>
                  <span className="font-cinzel text-2xl font-black text-[#E30613]">
                    ₹{selectedDishDetail.price}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                  {selectedDishDetail.name}
                </h3>

                <p className="text-xs text-gray-300 font-poppins leading-relaxed mb-6">
                  {selectedDishDetail.description}
                </p>

                <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#0B0B0B] border border-white/10 mb-6 text-center text-xs font-poppins">
                  <div>
                    <span className="block text-gray-500 text-[10px]">PREP TIME</span>
                    <span className="font-bold text-white">{selectedDishDetail.prepTime}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px]">RATING</span>
                    <span className="font-bold text-amber-400">{selectedDishDetail.rating} ★</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px]">CALORIES</span>
                    <span className="font-bold text-gray-300">{selectedDishDetail.calories || "N/A"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(selectedDishDetail);
                    setSelectedDishDetail(null);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E30613] to-[#B0040E] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.6)] cursor-pointer"
                >
                  Add To Order (₹{selectedDishDetail.price})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
