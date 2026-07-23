import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, Instagram, ArrowUp } from "lucide-react";

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Buttons Group */}
      <div className="flex flex-col items-center gap-2.5 pointer-events-auto">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=Hi%20Oasis%20The%20Cafe%20👋"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
        </a>

        {/* Direct Call Button */}
        <a
          href="tel:+919876543210"
          className="w-12 h-12 rounded-full bg-[#E30613] text-white flex items-center justify-center shadow-[0_0_20px_rgba(227,6,19,0.6)] hover:scale-110 transition-transform cursor-pointer"
          title="Call Cafe Directly"
        >
          <Phone className="w-5 h-5 fill-white" />
        </a>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/oasisthecafe.hyd/?utm_source=ig_web_button_share_sheet"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-110 transition-transform cursor-pointer"
          title="Follow on Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>

        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E30613] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
