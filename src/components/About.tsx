import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, HeartHandshake, Sparkles, Star, Users, Utensils, CheckCircle2 } from "lucide-react";

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "vision">("story");

  const stats = [
    { value: "700+", label: "Google Reviews", sub: "4.9★ Average Rating", icon: Star },
    { value: "200+", label: "Delicious Dishes", sub: "Continental & Indian", icon: Utensils },
    { value: "1000+", label: "Happy Customers", sub: "Every Single Week", icon: Users },
    { value: "100%", label: "Fresh Ingredients", sub: "Master Chef Handcrafted", icon: ShieldCheck },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative overflow-hidden">
      {/* Background Subtle Red Lighting Accent */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#E30613]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            Our Legacy & Passion
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
            A Paradise Above The City
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-gray-300">
            "Where gourmet flavors meets the twinkling Hyderabad sky."
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
              <img
                src="/src/assets/images/rooftop_hero_1784783481532.jpg"
                alt="Oasis The Cafe Ambience"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#E30613]/30 flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white">BN Reddy Nagar</h4>
                  <p className="text-xs text-gray-400 font-poppins">Hyderabad's Premier Rooftop Cafe</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#E30613] text-white text-xs font-bold font-poppins uppercase tracking-wider">
                  Official Spot
                </div>
              </div>
            </div>

            {/* Secondary Accent Badge */}
            <div className="hidden sm:flex absolute -top-6 -right-6 p-4 rounded-2xl bg-[#161616] border border-[#E30613]/40 shadow-2xl items-center gap-3">
              <div className="p-3 rounded-xl bg-[#E30613]/20 text-[#E30613]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-cinzel text-sm font-bold text-white">Top Rated Cafe</span>
                <span className="text-[11px] text-gray-400 font-poppins">Hyderabad Hospitality Awards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Storytelling */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tabs Selector */}
            <div className="flex gap-2 p-1.5 rounded-2xl bg-[#161616] border border-white/10 mb-8 max-w-md">
              {(["story", "mission", "vision"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "story" ? "Our Story" : tab === "mission" ? "Our Mission" : "Our Vision"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[220px]">
              {activeTab === "story" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed"
                >
                  <p>
                    Nestled in BN Reddy Nagar, <strong className="text-white">Oasis The Cafe</strong> was born out of a passion to craft an extraordinary open-air rooftop dining experience in Hyderabad.
                  </p>
                  <p>
                    We combined the warmth of luxury hospitality, artisan culinary perfection, woodfired pizzas, hand-crafted mocktails, and live rooftop projector screenings under a canopy of stars.
                  </p>
                  <p>
                    Whether you are celebrating a milestone birthday, hosting a lively kitty party, enjoying a quiet date, or catching up over burgers with friends, Oasis is designed to be your sanctuary.
                  </p>
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed"
                >
                  <p>
                    Our mission is to deliver world-class culinary excellence alongside warm, memorable rooftop hospitality at accessible prices.
                  </p>
                  <ul className="space-y-2 mt-4">
                    {[
                      "100% Fresh, high-quality, farm-sourced ingredients",
                      "Artisanal woodfired pizzas & chef special mocktails",
                      "Hygiene, safety, and swift friendly customer care",
                      "Memorable event setups tailored to your budget",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed"
                >
                  <p>
                    Our vision is to be recognized as Hyderabad's premier benchmark for rooftop cafe culture — where good food, great music, and beautiful memories flow seamlessly.
                  </p>
                  <p>
                    We continuously innovate our menu with global fusion recipes, theatrical drink presentations, and high-tech dining comfort.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Key Features Bullets */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E30613]/10 border border-[#E30613]/30 flex items-center justify-center text-[#E30613]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-white uppercase">Roof Top Vibes</h5>
                  <p className="text-[11px] text-gray-400 font-poppins">Open-air breezy seating</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E30613]/10 border border-[#E30613]/30 flex items-center justify-center text-[#E30613]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-cinzel text-xs font-bold text-white uppercase">Premium Dining</h5>
                  <p className="text-[11px] text-gray-400 font-poppins">5-Star service standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Counter Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#161616] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 text-center relative group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#E30613]/10 border border-[#E30613]/30 flex items-center justify-center text-[#E30613] group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white mb-1 drop-shadow-[0_0_15px_rgba(227,6,19,0.4)]">
                  {stat.value}
                </div>
                <div className="font-poppins text-xs font-bold uppercase tracking-wider text-[#E30613] mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-400 font-poppins">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
