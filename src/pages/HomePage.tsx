import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { MENU_ITEMS } from "../data/menuData";
import { useApp } from "../context/AppContext";
import {
  ArrowRight,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Star,
  PartyPopper,
  Tag,
  Clock,
  Phone,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export const HomePage: React.FC = () => {
  const { handleAddToCart, setIsBookTableOpen } = useApp();

  // Highlight top 3 signature dishes for home preview
  const signatureDishes = MENU_ITEMS.filter((item) => item.isBestSeller || item.isChefSpecial).slice(0, 3);

  return (
    <div className="space-y-0 bg-[#0B0B0B] text-white">
      {/* 1. Hero Banner */}
      <Hero onOpenBookTable={() => setIsBookTableOpen(true)} />

      {/* 2. Welcome & About Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/src/assets/images/rooftop_hero_1784783481532.jpg"
                alt="Oasis The Cafe Rooftop Ambience"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#E30613]/30 flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white">BN Reddy Nagar, Hyderabad</h4>
                  <p className="text-xs text-gray-400 font-poppins">Rooftop Dining & Living Paradise</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-[#E30613] text-white text-xs font-bold font-poppins uppercase tracking-wider">
                  Official Spot
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
              A Paradise On Roof
            </span>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Welcome To Oasis The Cafe
            </h2>

            <p className="font-cormorant italic text-xl sm:text-2xl text-gray-300 leading-relaxed">
              "Combining the warmth of luxury rooftop hospitality, artisan wood-fired pizzas, handcrafted mocktails, and live screenings under Hyderabad's night sky."
            </p>

            <p className="text-xs sm:text-sm text-gray-400 font-poppins leading-relaxed">
              Whether you are hosting a birthday bash, enjoying a romantic dinner for two, or relaxing with friends over burgers and cold coffee, Oasis is designed as your open-air urban sanctuary.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="px-6 py-3.5 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(227,6,19,0.5)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsBookTableOpen(true)}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                Reserve Rooftop Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Signature Dishes Spotlight Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111] border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.25em] font-poppins">
                Artisanal Culinary Craft
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Signature House Specialties
              </h2>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E30613] hover:text-white transition-colors font-poppins"
            >
              <span>Explore Full Menu ({MENU_ITEMS.length}+ Items)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#161616] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-[#E30613]/50 transition-all group flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/40" />
                  <span className="absolute top-4 right-4 bg-[#E30613] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_#E30613]">
                    {dish.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-cinzel text-lg font-bold text-white">{dish.name}</h3>
                      <span className="font-cinzel text-xl font-extrabold text-[#E30613]">₹{dish.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-poppins line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="w-full py-3 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(227,6,19,0.4)] cursor-pointer transition-colors"
                  >
                    Add To Cart (₹{dish.price})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Celebrations & Events Banner Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-950/30 via-[#0B0B0B] to-red-950/30 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E30613] font-poppins flex items-center gap-2">
              <PartyPopper className="w-4 h-4" />
              <span>Host Birthdays, Dates & Kitty Parties</span>
            </span>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white">
              Unforgettable Rooftop Celebrations
            </h2>

            <p className="font-cormorant italic text-xl text-gray-300 max-w-2xl">
              Complete event setups with LED backdrops, customized menus, private rooftop decks, and big-screen memory slideshows.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Link
              to="/celebrations"
              className="px-8 py-4 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold uppercase tracking-wider text-xs text-center shadow-[0_0_25px_rgba(227,6,19,0.6)] cursor-pointer"
            >
              Explore Party Packages
            </Link>

            <button
              onClick={() => setIsBookTableOpen(true)}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-xs text-center border border-white/20 cursor-pointer"
            >
              Reserve Event Date
            </button>
          </div>
        </div>
      </section>

      {/* 5. Quick Links Grid Bar (Navigation Teasers) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/menu"
            className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-300 group shadow-xl"
          >
            <div className="p-3.5 rounded-2xl bg-[#E30613]/10 text-[#E30613] w-fit mb-4 group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-1">Artisanal Menu</h3>
            <p className="text-xs text-gray-400 font-poppins mb-4">
              Explore 200+ dishes including Woodfired Pizza, Burgers, Pastas & Mocktails.
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E30613] group-hover:underline flex items-center gap-1">
              <span>View Menu</span>
              <span>→</span>
            </span>
          </Link>

          <Link
            to="/offers"
            className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-300 group shadow-xl"
          >
            <div className="p-3.5 rounded-2xl bg-[#E30613]/10 text-[#E30613] w-fit mb-4 group-hover:scale-110 transition-transform">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-1">Special Offers</h3>
            <p className="text-xs text-gray-400 font-poppins mb-4">
              Daily happy hour discounts, coupon vouchers, and student combo deals.
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E30613] group-hover:underline flex items-center gap-1">
              <span>View Offers</span>
              <span>→</span>
            </span>
          </Link>

          <Link
            to="/gallery"
            className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-300 group shadow-xl"
          >
            <div className="p-3.5 rounded-2xl bg-[#E30613]/10 text-[#E30613] w-fit mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-1">Atmosphere Gallery</h3>
            <p className="text-xs text-gray-400 font-poppins mb-4">
              Browse photo tours of our rooftop lighting, dishes, and party vibes.
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E30613] group-hover:underline flex items-center gap-1">
              <span>View Gallery</span>
              <span>→</span>
            </span>
          </Link>

          <Link
            to="/contact"
            className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-300 group shadow-xl"
          >
            <div className="p-3.5 rounded-2xl bg-[#E30613]/10 text-[#E30613] w-fit mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-1">Location & Directions</h3>
            <p className="text-xs text-gray-400 font-poppins mb-4">
              BN Reddy Nagar, Hyderabad. Tap for live Google Maps & direct call.
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E30613] group-hover:underline flex items-center gap-1">
              <span>Get Directions</span>
              <span>→</span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

