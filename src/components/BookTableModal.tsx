import React, { useState } from "react";
import { X, Calendar, Clock, Users, CheckCircle2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface BookTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookTableModal: React.FC<BookTableModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:30 PM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [seatingPreference, setSeatingPreference] = useState("Rooftop Open Air Deck");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#E30613", "#FFFFFF", "#FFD700"],
    });

    setSubmitted(true);

    const msg = `Hi Oasis The Cafe 👋

I would like to reserve a Rooftop Table!

• Name: ${name}
• Phone: ${phone}
• Date: ${date}
• Time: ${time}
• Guests: ${guests} Person(s)
• Seating: ${seatingPreference}

Please confirm our table reservation. Thank you!`;

    setTimeout(() => {
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#161616] border border-[#E30613]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] text-white"
          >
            <button
              onClick={() => {
                onClose();
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[#E30613] text-xs font-bold uppercase tracking-widest font-poppins">
                Instant Reservation
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                Book A Rooftop Table
              </h3>
              <p className="text-xs text-gray-400 font-poppins mt-1">
                BN Reddy Nagar, Hyderabad • Opens Daily at 12:00 Noon
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white">
                  Table Reservation Request Sent!
                </h4>
                <p className="text-xs text-gray-300 font-poppins max-w-md mx-auto">
                  Opening WhatsApp to complete your rooftop table reservation with Oasis team...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-poppins">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    >
                      <option value="01:00 PM">01:00 PM (Lunch)</option>
                      <option value="04:00 PM">04:00 PM (High Tea)</option>
                      <option value="07:00 PM">07:00 PM (Sunset Dinner)</option>
                      <option value="08:30 PM">08:30 PM (Starlit Dinner)</option>
                      <option value="10:00 PM">10:00 PM (Late Night)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 uppercase font-bold mb-1">
                      Seating Preference
                    </label>
                    <select
                      value={seatingPreference}
                      onChange={(e) => setSeatingPreference(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                    >
                      <option value="Rooftop Open Air Deck">Rooftop Open Air Deck</option>
                      <option value="Projector Screen View">Projector Screen View</option>
                      <option value="VIP Lounge Booth">VIP Lounge Booth</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sravanthi Reddy"
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

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E30613] to-[#B0040E] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.6)] cursor-pointer"
                >
                  Reserve Table via WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
