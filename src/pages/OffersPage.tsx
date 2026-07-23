import React, { useState } from "react";
import { SpecialOffers } from "../components/SpecialOffers";
import { Link } from "react-router-dom";
import { Tag, Sparkles, Clock, Copy, Check, ShoppingBag, Gift } from "lucide-react";
import { useApp } from "../context/AppContext";

export const OffersPage: React.FC = () => {
  const { setIsCartOpen } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const vouchers = [
    {
      title: "First Order Discount",
      code: "OASISNEW20",
      discount: "FLAT 20% OFF",
      desc: "Valid on all online orders above ₹399. Applicable on Pizzas, Burgers & Mocktails.",
      bg: "from-red-900/60 to-[#161616]",
    },
    {
      title: "Rooftop Happy Hours",
      code: "SUNSET25",
      discount: "FLAT 25% OFF",
      desc: "Daily 4:00 PM – 7:00 PM on all Mocktails, Milkshakes & Starters.",
      bg: "from-amber-900/60 to-[#161616]",
    },
    {
      title: "Student Weekend Deal",
      code: "STUDENT15",
      discount: "FLAT 15% OFF",
      desc: "Show student ID card at billing or apply online for group orders above ₹299.",
      bg: "from-blue-900/60 to-[#161616]",
    },
    {
      title: "Family Feast Combo",
      code: "OASISFAMILY",
      discount: "SAVE ₹300",
      desc: "Order 2 Pizzas + 2 Pasta + 4 Drinks & get flat ₹300 cash discount automatically.",
      bg: "from-emerald-900/60 to-[#161616]",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white">
      {/* Banner */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-[#161616] to-[#0B0B0B] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
            Exclusive Vouchers & Combo Deals
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white">
            Special Rooftop Offers
          </h1>

          <p className="font-cormorant italic text-2xl text-gray-300 max-w-2xl mx-auto">
            Enjoy premium culinary creations with our curated coupon codes and weekly happy hour savings.
          </p>
        </div>
      </div>

      {/* Copyable Vouchers Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {vouchers.map((v) => (
            <div
              key={v.code}
              className={`p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${v.bg} shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold font-poppins text-[#E30613] uppercase tracking-wider block mb-1">
                    {v.title}
                  </span>
                  <h3 className="font-cinzel text-3xl font-extrabold text-white">{v.discount}</h3>
                </div>

                <div className="p-3 bg-black/40 rounded-2xl border border-white/10">
                  <Gift className="w-6 h-6 text-[#E30613]" />
                </div>
              </div>

              <p className="text-xs text-gray-300 font-poppins leading-relaxed">{v.desc}</p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/20 font-mono font-bold text-sm tracking-wider text-amber-400">
                  {v.code}
                </div>

                <button
                  onClick={() => copyVoucher(v.code)}
                  className="px-5 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(227,6,19,0.5)]"
                >
                  {copiedCode === v.code ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section Component */}
      <SpecialOffers />
    </div>
  );
};
