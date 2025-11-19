"use client";
import { useState } from "react";
export default function ClientReviewForm({ username }) {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
  
    const onSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess(false);
      const trimmed = content.trim();
      if (!trimmed) {
        setError("Please write a review before submitting.");
        return;
      }
      if (rating === 0) {
        setError("Please select a rating before submitting.");
        return;
      }
      setSubmitting(true);
      try {
        const res = await fetch(`/api/u/${encodeURIComponent(username)}/review`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: trimmed, rating }),
        });
        if (!res.ok) throw new Error("Failed to submit review");
        setContent("");
        setRating(0);
        setSuccess(true);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };
  
    const StarRating = () => {
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded"
              aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            >
              <span
                className={
                  star <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
          <span className="ml-2 text-sm text-slate-600">
            {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : "Select rating"}
          </span>
        </div>
      );
    };

    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-800 mb-2">Rate this resume</label>
          <StarRating />
        </div>
        
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-slate-800">Leave an anonymous review</label>
          <textarea
            id="review"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share actionable feedback about this resume..."
            className="mt-1 w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-orange-600 text-white font-semibold px-4 py-2 hover:bg-orange-700 transition-colors shadow-sm disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
          {success ? <span className="text-sm text-green-700">Thanks! Your review was submitted.</span> : null}
          {error ? <span className="text-sm text-red-700">{error}</span> : null}
        </div>
      </form>
    );
  }
  
  
  