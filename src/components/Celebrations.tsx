import React, { useState } from "react";
import { CelebrationPackage } from "../types";
import { CELEBRATION_PACKAGES } from "../data/siteData";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Tv, CheckCircle2, Sparkles, X, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export const Celebrations: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<CelebrationPackage | null>(null);
  const [guestCount, setGuestCount] = useState(20);
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Birthday Party");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !eventDate) {
      alert("Please fill in your name, phone, and date.");
      return;
    }

    // Trigger confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E30613", "#FFFFFF", "#FFD700"],
    });

    setSubmitted(true);

    // Format WhatsApp message
    const msg = `Hi Oasis The Cafe 👋

I would like to reserve a Celebration Event on the Rooftop!

• Event Type: ${eventType}
• Guest Count: ${guestCount} Guests
• Event Date: ${eventDate}
• Name: ${name}
• Phone: ${phone}
${notes ? `• Special Notes: ${notes}` : ""}

Please confirm availability and share menu package options. Thank you!`;

    setTimeout(() => {
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1000);
  };

  return (
    <section id="celebrations" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#E30613]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            Unforgettable Memories Under The Sky
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-3">
            Rooftop Celebrations & Events
          </h2>
          <p className="font-cormorant italic text-xl text-gray-300">
            Host your birthdays, kitty parties, corporate events, and romantic dates at Hyderabad's premier rooftop venue.
          </p>
        </div>

        {/* Feature Highlight Banner: Projector & Custom Decor */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#161616] via-[#1A0A0C] to-[#161616] border border-[#E30613]/30 shadow-2xl mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-[#E30613]/20 text-[#E30613] border border-[#E30613]/40 shrink-0">
              <Tv className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-bold text-white">Big Screen HD Projector</h4>
              <p className="text-xs text-gray-400 font-poppins">Play video memory slideshows & live match screenings</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-[#E30613]/20 text-[#E30613] border border-[#E30613]/40 shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-bold text-white">Custom Event Decor</h4>
              <p className="text-xs text-gray-400 font-poppins">Fairy lights, balloon arches & personalized name LED boards</p>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end">
            <button
              onClick={() => setSelectedPackage(CELEBRATION_PACKAGES[0])}
              className="px-6 py-3.5 rounded-full bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(227,6,19,0.6)] cursor-pointer transition-all"
            >
              Reserve Event Space
            </button>
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CELEBRATION_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#161616] border border-white/10 hover:border-[#E30613]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_10px_30px_rgba(227,6,19,0.25)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/60" />

                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white font-poppins flex items-center gap-1 border border-white/15">
                  <Users className="w-3 h-3 text-[#E30613]" />
                  <span>{pkg.capacity}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-1 group-hover:text-[#E30613] transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="font-cormorant italic text-sm text-gray-300 mb-4">
                    {pkg.subtitle}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300 font-poppins">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E30613] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setEventType(pkg.title);
                    setSelectedPackage(pkg);
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#E30613] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#161616] border border-[#E30613]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setSubmitted(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[#E30613] text-xs font-bold uppercase tracking-widest font-poppins">
                  Rooftop Event Booking
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                  Reserve {selectedPackage.title}
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-white">
                    Reservation Request Sent!
                  </h4>
                  <p className="text-xs text-gray-300 font-poppins max-w-md mx-auto">
                    We're opening WhatsApp to connect you directly with our Oasis Event Manager.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} className="space-y-4 text-xs font-poppins">
                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    >
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Kitty Party">Kitty Party</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Candlelight Date">Candlelight Date</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 uppercase font-bold mb-1">
                        Expected Guests
                      </label>
                      <input
                        type="number"
                        min={2}
                        max={100}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase font-bold mb-1">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Reddy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Special Requests (Decor, Food preferences, Projector)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need projector setup for slideshow & 25 Veg/Non-veg combos"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E30613] to-[#B0040E] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.6)] cursor-pointer"
                  >
                    Confirm & Contact Event Manager
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
