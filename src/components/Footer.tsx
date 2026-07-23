import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OfficialLogo } from "./OfficialLogo";
import { Instagram, Phone, MapPin, Mail, Clock, Send, Heart, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#070707] border-t border-white/10 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <OfficialLogo size="md" />
            <p className="font-cormorant italic text-lg text-gray-300 max-w-sm">
              "A Paradise On Roof — Hyderabad's finest rooftop cafe for artisanal food, mocktails, and unforgettable starlit moments."
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-poppins pt-2">
              <MapPin className="w-4 h-4 text-[#E30613]" />
              <span>BN Reddy Nagar, Hyderabad, Telangana</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3 font-poppins text-xs">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-[#E30613] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#E30613] transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="hover:text-[#E30613] transition-colors">Rooftop Menu</Link></li>
              <li><Link to="/celebrations" className="hover:text-[#E30613] transition-colors">Celebrations</Link></li>
              <li><Link to="/offers" className="hover:text-[#E30613] transition-colors">Daily Offers</Link></li>
              <li><Link to="/gallery" className="hover:text-[#E30613] transition-colors">Photo Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-[#E30613] transition-colors">Google Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-[#E30613] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact */}
          <div className="lg:col-span-3 space-y-3 font-poppins text-xs">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-4">
              Hours & Contact
            </h4>
            <div className="space-y-2.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E30613]" />
                <span>Everyday: Opens Daily at 12:00 Noon</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E30613]" />
                <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#E30613]" />
                <a href="https://www.instagram.com/oasisthecafe.hyd/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  @oasisthecafe.hyd
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3 font-poppins text-xs">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-4">
              Rooftop VIP Club
            </h4>
            <p className="text-gray-400">
              Subscribe to get secret weekly discounts & celebration perks!
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Welcome to Oasis VIP.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161616] border border-white/15 focus:border-[#E30613] text-white rounded-xl px-3 py-2.5 outline-none font-poppins"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-poppins gap-4">
          <p>© {new Date().getFullYear()} Oasis The Cafe, BN Reddy Nagar, Hyderabad. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#E30613] fill-[#E30613]" />
            <span>for Rooftop Food Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
