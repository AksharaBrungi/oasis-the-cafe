import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { AiChatbot } from "./AiChatbot";
import { OnlineOrderCart } from "./OnlineOrderCart";
import { BookTableModal } from "./BookTableModal";
import { IntroLoader } from "./IntroLoader";
import { useApp } from "../context/AppContext";
import { MENU_ITEMS } from "../data/menuData";

export const Layout: React.FC = () => {
  const [showIntro, setShowIntro] = useState(() => {
    // Show intro loader on initial load only once per session
    return !sessionStorage.getItem("oasis_intro_shown");
  });

  const location = useLocation();
  const {
    cartItems,
    isCartOpen,
    isBookTableOpen,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleClearCart,
    setIsCartOpen,
    setIsBookTableOpen,
  } = useApp();

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("oasis_intro_shown", "true");
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen font-poppins selection:bg-[#E30613] selection:text-white relative flex flex-col justify-between">
      {/* Intro Loader */}
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}

      {/* Main Header Navbar */}
      <Navbar />

      {/* Main Route Page Content */}
      <main className="flex-1 min-h-[70vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* AI Food Concierge Chatbot */}
      <AiChatbot onAddToCart={handleAddToCart} menuItems={MENU_ITEMS} />

      {/* Global Cart Drawer */}
      <OnlineOrderCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Global Table / Celebration Booking Modal */}
      <BookTableModal
        isOpen={isBookTableOpen}
        onClose={() => setIsBookTableOpen(false)}
      />
    </div>
  );
};
