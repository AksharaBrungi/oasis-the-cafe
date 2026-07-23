import React, { useState, useEffect } from "react";
import { REVIEWS_DATA } from "../data/siteData";
import { Review } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle, ChevronLeft, ChevronRight, MessageSquarePlus } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS_DATA);

  const [newAuthor, setNewAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, reviewsList.length]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: newRating,
      date: "Just now",
      comment: newComment,
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddReview(false);
    setNewAuthor("");
    setNewComment("");
  };

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3 py-1 bg-[#E30613]/10 border border-[#E30613]/20 rounded-full">
            Real Customer Praise
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-3">
            Loved By Hyderabad
          </h2>
          <p className="font-cormorant italic text-xl text-gray-300">
            Read what our starlit rooftop guests say on Google Reviews.
          </p>

          {/* Google Summary Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#161616] border border-white/10 mt-6 shadow-lg">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-white font-poppins">
              4.9 / 5.0 Rating
            </span>
            <span className="text-xs text-gray-400 border-l border-white/15 pl-3 font-poppins">
              700+ Verified Google Reviews
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-12 rounded-3xl bg-[#161616]/90 backdrop-blur-2xl border border-[#E30613]/30 shadow-2xl relative"
            >
              <Quote className="absolute top-6 right-8 w-16 h-16 text-[#E30613]/15 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <img
                  src={reviewsList[activeIndex].avatar}
                  alt={reviewsList[activeIndex].author}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E30613] shadow-lg shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 space-y-3">
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                    {Array.from({ length: reviewsList[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 animate-pulse" />
                    ))}
                  </div>

                  <p className="font-cormorant italic text-xl sm:text-2xl text-gray-200 leading-relaxed">
                    "{reviewsList[activeIndex].comment}"
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                    <span className="font-cinzel text-base font-bold text-white">
                      {reviewsList[activeIndex].author}
                    </span>

                    {reviewsList[activeIndex].verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" />
                        <span>Google Verified</span>
                      </span>
                    )}

                    <span className="text-xs text-gray-500 font-poppins">
                      {reviewsList[activeIndex].date}
                    </span>
                  </div>

                  {reviewsList[activeIndex].dishRecommended && (
                    <div className="text-xs text-[#E30613] font-poppins pt-1 font-semibold">
                      Recommended: {reviewsList[activeIndex].dishRecommended}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() =>
                setActiveIndex((activeIndex - 1 + reviewsList.length) % reviewsList.length)
              }
              className="p-3 rounded-full bg-[#161616] hover:bg-[#E30613] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviewsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-[#E30613] shadow-[0_0_10px_#E30613]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((activeIndex + 1) % reviewsList.length)}
              className="p-3 rounded-full bg-[#161616] hover:bg-[#E30613] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Leave a Review Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAddReview(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#E30613]" />
              <span>Leave A Google Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {showAddReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#161616] border border-[#E30613]/30 rounded-3xl max-w-md w-full p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setShowAddReview(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>

              <h3 className="font-cinzel text-xl font-bold text-white mb-2">Write A Review</h3>
              <p className="text-xs text-gray-400 font-poppins mb-6">
                Share your experience at Oasis The Cafe, BN Reddy Nagar.
              </p>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs font-poppins">
                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-[#0B0B0B] border border-white/15 text-white rounded-xl p-3 outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 / 5 - Outstanding)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 / 5 - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 / 5 - Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the rooftop food, mocktails, and ambiance..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold uppercase tracking-wider cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
