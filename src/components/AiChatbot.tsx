import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, MenuItem } from "../types";
import { Sparkles, Send, X, Bot, User, Plus, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AiChatbotProps {
  onAddToCart: (item: MenuItem) => void;
  menuItems: MenuItem[];
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ onAddToCart, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Welcome to Oasis The Cafe! I am Oasis Gourmet AI, your rooftop culinary concierge. What kind of food or drinks are you in the mood for today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userText = input.trim();
    if (!userText || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userText }),
      });
      const data = await res.json();

      const aiReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: data.reply || "I highly recommend trying our Chicken Tikka Pizza and Ruby Mocktail on the rooftop!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendations: data.recommendations,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: "I recommend trying our Chef's Special Chicken Tikka Woodfired Pizza, White Sauce Pasta, and Oasis Signature Ruby Mocktail!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-[#E30613] to-[#B0040E] text-white shadow-[0_0_25px_rgba(227,6,19,0.7)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group border border-white/20"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-cinzel text-xs font-bold uppercase tracking-wider pr-1">
            Gourmet AI
          </span>
        </button>
      </div>

      {/* Chatbot Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 bg-[#121212] border border-[#E30613]/40 rounded-3xl shadow-2xl flex flex-col h-[480px] overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-[#161616] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#E30613]/20 text-[#E30613] border border-[#E30613]/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold">Oasis Gourmet AI</h4>
                  <span className="text-[10px] text-emerald-400 font-poppins flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online Sommelier
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="p-2.5 bg-[#0B0B0B] border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
              {["Best Sellers", "Spicy Non-Veg", "Vegetarian Options", "Mocktails"].map((qp) => (
                <button
                  key={qp}
                  onClick={() => handleQuickPrompt(`Recommend ${qp}`)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#E30613] text-gray-300 hover:text-white text-[10px] font-poppins border border-white/10 transition-colors cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-poppins text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-[#E30613] text-white rounded-br-none"
                        : "bg-[#1A1A1A] text-gray-200 border border-white/10 rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="block text-[9px] text-gray-400 mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                  <Bot className="w-4 h-4 text-[#E30613] animate-spin" />
                  <span>Curating culinary recommendations...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#161616] border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Ask e.g. What pizza should I get?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white text-xs rounded-xl px-3 py-2.5 outline-none font-poppins"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2.5 bg-[#E30613] hover:bg-[#FF1A27] text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
