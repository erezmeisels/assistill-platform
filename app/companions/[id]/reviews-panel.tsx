"use client";

import { useState } from "react";
import { Star, MessageSquare, RefreshCw } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  author: { email: string };
}

interface Props {
  profileId: string;
  initialReviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </span>
  );
}

export function ReviewsPanel({ profileId, initialReviews }: Props) {
  const [reviews,    setReviews]    = useState<Review[]>(initialReviews);
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/companions/${profileId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.reviews.map((r: any) => ({
            id:        r.id,
            rating:    r.rating,
            comment:   r.comment ?? null,
            createdAt: r.createdAt,
            author:    { email: r.author.email },
          }))
        );
      }
    } finally {
      setRefreshing(false);
    }
  }

  const avg =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0f172a]">
          <MessageSquare className="h-4 w-4 text-slate-400" />
          Reviews
          {avg !== null && (
            <span className="ml-1 flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400" />
              {avg}
            </span>
          )}
          <span className="text-slate-400 font-normal">({reviews.length})</span>
        </h2>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition"
        >
          <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {reviews.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">No reviews yet.</p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-slate-50 pb-5 last:border-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-700">
                    {review.author.email.split("@")[0]}
                  </p>
                  <div className="mt-1">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <time className="shrink-0 text-xs text-slate-400">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </time>
              </div>
              {review.comment && (
                <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
