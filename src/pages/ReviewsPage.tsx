import React, { useState } from "react";
import { ReviewsSection } from "../components/ReviewsSection";
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp } from "lucide-react";

export const ReviewsPage: React.FC = () => {
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);

    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  return (
    <div className="pt-24 pb-20 bg-[#0B0B0B] text-white">
      {/* Header Banner */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-[#161616] to-[#0B0B0B] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-[#E30613] text-xs font-bold uppercase tracking-[0.3em] font-poppins px-3.5 py-1 bg-[#E30613]/10 border border-[#E30613]/30 rounded-full inline-block">
            Authentic Guest Testimonials
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white">
            Guest Reviews & Feedback
          </h1>

          <p className="font-cormorant italic text-2xl text-gray-300 max-w-2xl mx-auto">
            Rated 4.8★ on Google Maps with over 1,200+ happy diners from BN Reddy Nagar & across Hyderabad.
          </p>
        </div>
      </div>

      {/* Reviews Main Section */}
      <ReviewsSection />

      {/* Submit Your Own Review Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-[#161616] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#E30613]/10 border border-[#E30613]/30 rounded-2xl text-[#E30613]">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel text-2xl font-bold text-white">Write A Review</h3>
              <p className="text-xs text-gray-400 font-poppins">
                Shared your evening with us? Let us know how your food and ambiance experience was!
              </p>
            </div>
          </div>

          {submittedToast && (
            <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-poppins flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you! Your feedback has been submitted successfully to Oasis Management.</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4 text-xs font-poppins">
            <div>
              <label className="block text-gray-400 uppercase font-bold mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sravanthi Kumar"
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 uppercase font-bold mb-1">Rating *</label>
              <div className="flex items-center gap-2 bg-[#0B0B0B] p-3 rounded-xl border border-white/15">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReviewRating ? "fill-amber-400" : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-bold text-amber-400">
                  {newReviewRating} Stars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 uppercase font-bold mb-1">Review Details *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about the rooftop ambiance, staff service, pizza, drinks..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#E30613] text-white rounded-xl p-3.5 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#E30613] hover:bg-[#FF1A27] text-white font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(227,6,19,0.5)] cursor-pointer transition-colors"
            >
              Submit Public Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
