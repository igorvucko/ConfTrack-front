"use client";

import { useState, useEffect } from "react";

interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  likes: any[];
  comments: any[];
}

interface ReviewListProps {
  conferenceId: number;
  refreshKey: number;
}

export default function ReviewList({ conferenceId, refreshKey }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [conferenceId, refreshKey]);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/reviews?conferenceId=${conferenceId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Reviews API endpoint not found");
        } else {
          setError(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
        }
        return;
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Reviews</h2>
        <div className="text-red-400 p-4 bg-red-900/20 rounded-lg">
          <p>{error}</p>
          <button
            onClick={fetchReviews}
            className="mt-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review this conference!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {review.user.name?.charAt(0).toUpperCase() || review.user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-white font-medium">
                    {review.user.name || review.user.email || "Unknown User"}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">{"⭐".repeat(review.rating)}</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mb-3">{review.content}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <button className="hover:text-white transition-colors">
                  👍 {review.likes?.length || 0}
                </button>
                <button className="hover:text-white transition-colors">
                  💬 {review.comments?.length || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}