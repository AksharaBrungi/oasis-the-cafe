import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { OfficialLogo } from "./OfficialLogo";
import {
  ShoppingBag,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const {
    totalCartCount,
    setIsCartOpen,
    setIsBookTableOpen,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Celebrations", path: "/celebrations" },
    { name: "Offers", path: "/offers" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-[#E30613]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Left */}
          <Link to="/" className="flex items-center">
            <OfficialLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E30613] rounded-full shadow-[0_0_8px_#E30613]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons Right */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart / Order Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:border-[#E30613] cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-[#E30613] group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-[#E30613] text-white text-xs font-bold rounded-full shadow-[0_0_10px_#E30613]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Book Table Button */}
            <button
              onClick={() => setIsBookTableOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#E30613] to-[#B0040E] hover:from-[#FF0A1A] hover:to-[#E30613] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(227,6,19,0.5)] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </button>
          </div>

          {/* Mobile Navigation Icons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-white/10 text-white border border-white/15 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#E30613]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E30613] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white border border-white/15 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 transition-all overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-cinzel font-semibold transition-colors py-2 border-b border-white/10 flex items-center justify-between ${
                    isActive ? "text-[#E30613] font-bold" : "text-gray-200 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-poppins text-gray-500">→</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center gap-2 cursor-pointer text-xs uppercase"
            >
              <ShoppingBag className="w-4 h-4 text-[#E30613]" />
              <span>View Cart ({totalCartCount})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookTableOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E30613] to-[#B0040E] text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(227,6,19,0.5)] cursor-pointer text-xs uppercase"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

