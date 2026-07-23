import React, { useState, useMemo } from "react";
import { MenuItem, CategoryType } from "../types";
import { MENU_ITEMS } from "../data/menuData";
import { useApp } from "../context/AppContext";
import {
  Search,
  Heart,
  Plus,
  Minus,
  Star,
  Clock,
  Filter,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Flame,
  Check,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_CATEGORIES: { name: CategoryType; iconName: string; count?: number }[] = [
  { name: "All", iconName: "✨" },
  { name: "Pizza", iconName: "🍕" },
  { name: "Burger", iconName: "🍔" },
  { name: "Continental", iconName: "🍳" },
  { name: "Chinese", iconName: "🍜" },
  { name: "North Indian", iconName: "🍛" },
  { name: "Pasta", iconName: "🍝" },
  { name: "Rice Bowls", iconName: "🍚" },
  { name: "Mocktails", iconName: "🍹" },
  { name: "Milkshakes", iconName: "🥤" },
  { name: "Desserts", iconName: "🍰" },
  { name: "Salads", iconName: "🥗" },
];

export const MenuPage: React.FC = () => {
  const {
    cartItemsMap,
    handleAddToCart,
    handleUpdateCartQuantity,
    setIsCartOpen,
    totalCartCount,
    totalCartAmount,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high" | "rating">(
    "recommended"
  );
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    let result = MENU_ITEMS.filter((dish) => {
      // Category Filter
      if (selectedCategory !== "All" && dish.category !== selectedCategory) {
        return false;
      }
      // Diet Filter
      if (dietFilter === "veg" && !dish.isVeg) return false;
      if (dietFilter === "non-veg" && dish.isVeg) return false;

      // Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchCat = dish.category.toLowerCase().includes(q);
        return matchName || matchDesc || matchCat;
      }
      return true;
    });

    // Sorting
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, dietFilter, searchQuery, sortBy]);

  return (
    <div className="pt-24 pb-28 bg-[#0B0B0B] text-white min-h-screen">
      {/* Top Banner Header */}
      <div className="bg-[#161616] border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.25em] font-poppins">
              Digital Menu Board • Starbucks & Burger King Experience
            </span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Oasis Artisanal Menu
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(227,6,19,0.5)] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Order Cart ({totalCartCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Category Sidebar (Brand Style) */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 px-3 pb-3 border-b border-white/10 mb-3 flex items-center justify-between">
                <span>Categories</span>
                <span className="text-[#E30613] font-mono">{MENU_ITEMS.length} Items</span>
              </h3>

              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
                {SIDEBAR_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  const count = categoryCounts[cat.name] || 0;

                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)] font-bold"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{cat.iconName}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                          isActive
                            ? "bg-black/40 text-white"
                            : "bg-white/10 text-gray-400 group-hover:text-white"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Control Bar: Search, Diet Toggles & Sorting */}
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Pizza, Burger, Mocktails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl pl-10 pr-8 py-2.5 outline-none transition-colors"
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

              {/* Diet Filters & Sorting */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* Veg / Non Veg */}
                <div className="flex items-center bg-[#0B0B0B] p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setDietFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      dietFilter === "all" ? "bg-white/15 text-white" : "text-gray-400"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietFilter("veg")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                      dietFilter === "veg"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                        : "text-gray-400 hover:text-emerald-400"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Veg</span>
                  </button>
                  <button
                    onClick={() => setDietFilter("non-veg")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                      dietFilter === "non-veg"
                        ? "bg-red-950 text-red-400 border border-[#E30613]/30"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E30613] inline-block" />
                    <span>Non-Veg</span>
                  </button>
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-1.5 bg-[#0B0B0B] px-3 py-1.5 rounded-xl border border-white/10 text-xs text-gray-300">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#E30613]" />
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-transparent text-white text-xs outline-none cursor-pointer font-poppins"
                  >
                    <option value="recommended" className="bg-[#161616]">Recommended</option>
                    <option value="price-low" className="bg-[#161616]">Price: Low to High</option>
                    <option value="price-high" className="bg-[#161616]">Price: High to Low</option>
                    <option value="rating" className="bg-[#161616]">Rating: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h2 className="font-cinzel text-2xl font-bold text-white flex items-center gap-2">
                  <span>{selectedCategory} Delicacies</span>
                  <span className="text-xs font-poppins font-normal text-gray-400">
                    ({filteredItems.length} items)
                  </span>
                </h2>
              </div>

              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-xs text-[#E30613] hover:underline cursor-pointer font-poppins"
                >
                  Clear Category Filter
                </button>
              )}
            </div>

            {/* Dish Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-[#161616] rounded-3xl border border-white/10 p-8 space-y-3">
                <p className="font-cinzel text-2xl text-gray-300">No dishes match your filter</p>
                <p className="text-xs text-gray-400 font-poppins">
                  Try searching for a different dish name or changing the category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setDietFilter("all");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E30613] text-white text-xs font-bold uppercase tracking-wider cursor-pointer mt-2 inline-block"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((dish) => {
                  const qty = cartItemsMap[dish.id] || 0;

                  return (
                    <motion.div
                      key={dish.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl bg-[#161616] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-[0_10px_30px_rgba(227,6,19,0.2)] relative"
                    >
                      {/* Top Image Container */}
                      <div className="relative h-48 overflow-hidden bg-black/60">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/50" />

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

                        {/* Best Seller Badges */}
                        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                          {dish.isBestSeller && (
                            <span className="bg-[#E30613] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_#E30613]">
                              Best Seller
                            </span>
                          )}
                          {dish.isChefSpecial && (
                            <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Chef Special
                            </span>
                          )}
                        </div>

                        {/* Prep time & rating */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-poppins text-gray-300">
                          <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-amber-400 font-bold">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{dish.rating}</span>
                          </span>

                          <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-gray-300">
                            <Clock className="w-3 h-3 text-[#E30613]" />
                            <span>{dish.prepTime}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3
                              onClick={() => setSelectedDishDetail(dish)}
                              className="font-cinzel text-base font-bold text-white hover:text-[#E30613] transition-colors cursor-pointer line-clamp-1"
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

                        {/* Bottom Action */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedDishDetail(dish)}
                            className="text-[11px] text-gray-400 hover:text-white underline font-poppins cursor-pointer"
                          >
                            Details
                          </button>

                          {qty === 0 ? (
                            <button
                              onClick={() => handleAddToCart(dish)}
                              className="px-4 py-2 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(227,6,19,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 bg-[#0B0B0B] border border-[#E30613]/50 rounded-xl p-1">
                              <button
                                onClick={() => handleUpdateCartQuantity(dish.id, -1)}
                                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-bold font-poppins text-white">
                                {qty}
                              </span>
                              <button
                                onClick={() => handleAddToCart(dish)}
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
          </main>
        </div>
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
                    <span className="block text-gray-500 text-[10px]">CATEGORY</span>
                    <span className="font-bold text-gray-300">{selectedDishDetail.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedDishDetail);
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

      {/* Floating Bottom Quick Cart Bar */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg bg-[#E30613] text-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(227,6,19,0.8)] border border-white/20 flex items-center justify-between cursor-pointer animate-bounce-short"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center font-bold font-mono text-sm">
              {totalCartCount}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">Cart Summary</span>
              <span className="text-sm font-black font-cinzel">Total: ₹{totalCartAmount}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-black/30 px-4 py-2 rounded-xl">
            <span>Checkout</span>
            <span>→</span>
          </div>
        </div>
      )}
    </div>
  );
};
