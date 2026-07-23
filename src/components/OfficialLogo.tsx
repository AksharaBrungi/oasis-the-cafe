import React from "react";
import logoImg from "../assets/images/oasis_official_logo_1784786926327.jpg";

interface OfficialLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  className = "",
  size = "md",
  showTagline = true,
}) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  return (
    <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Official Red Circular Logo Badge */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-[#E30613]/50 shadow-[0_0_15px_rgba(227,6,19,0.6)] ${sizeClasses[size]}`}>
        <img
          src={logoImg}
          alt="Oasis The Cafe - Official Logo"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-cinzel font-black tracking-wider text-white ${textSizeClasses[size]}`}>
            OASIS
          </span>
          <span className="bg-[#E30613] text-white font-cinzel font-bold text-[10px] sm:text-xs px-1.5 py-0.5 rounded tracking-widest uppercase">
            THE CAFE
          </span>
        </div>
        {showTagline && (
          <span className="font-cormorant italic text-xs md:text-sm text-red-200/90 tracking-widest mt-0.5">
            A Paradise On Roof
          </span>
        )}
      </div>
    </div>
  );
};
