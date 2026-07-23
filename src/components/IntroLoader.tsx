import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OfficialLogo } from "./OfficialLogo";

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<"initial" | "logoAppear" | "textReveal" | "zoomOut" | "done">("initial");

  useEffect(() => {
    // Timeline sequence for luxury movie intro
    const timer1 = setTimeout(() => setStage("logoAppear"), 400);
    const timer2 = setTimeout(() => setStage("textReveal"), 1600);
    const timer3 = setTimeout(() => setStage("zoomOut"), 3600);
    const timer4 = setTimeout(() => {
      setStage("done");
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  // Particle positions
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0B] text-white overflow-hidden select-none"
        >
          {/* Ambient Red Lighting Spotlight in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,6,19,0.25)_0%,rgba(11,11,11,0.95)_70%)] pointer-events-none" />

          {/* Floating Glowing Red Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: `${p.y}%`, x: `${p.x}%` }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [`${p.y}%`, `${p.y - 15}%`],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full bg-[#E30613] shadow-[0_0_10px_#E30613]"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}
          </div>

          {/* Center Stage Container */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            {/* Logo Scaling & Glowing */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: stage === "zoomOut" ? 0.3 : stage !== "initial" ? 1.1 : 0.5,
                opacity: stage === "initial" ? 0 : 1,
                filter: stage === "textReveal" ? "drop-shadow(0 0 35px rgba(227,6,19,0.9))" : "drop-shadow(0 0 15px rgba(227,6,19,0.4))",
              }}
              transition={{
                duration: stage === "zoomOut" ? 0.8 : 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-6"
            >
              <OfficialLogo size="xl" showTagline={false} />
            </motion.div>

            {/* Text Reveal Sequence */}
            <div className="h-28 flex flex-col items-center justify-center overflow-hidden">
              {stage !== "initial" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <motion.h1
                    initial={{ letterSpacing: "0.1em" }}
                    animate={{ letterSpacing: "0.3em" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(227,6,19,0.5)]"
                  >
                    OASIS
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="font-cinzel text-sm sm:text-lg text-[#E30613] font-bold tracking-[0.4em] uppercase mt-1"
                  >
                    THE CAFE
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="font-cormorant italic text-base sm:text-2xl text-gray-300 tracking-widest mt-2"
                  >
                    — A Paradise On Roof —
                  </motion.p>
                </motion.div>
              )}
            </div>

            {/* Location Badge */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === "textReveal" ? 0.8 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-6 font-poppins"
            >
              BN Reddy Nagar, Hyderabad
            </motion.span>
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={() => {
              setStage("done");
              onComplete();
            }}
            className="absolute bottom-8 right-8 z-20 text-xs font-poppins uppercase tracking-widest text-gray-400 hover:text-white border border-white/20 hover:border-[#E30613] px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
