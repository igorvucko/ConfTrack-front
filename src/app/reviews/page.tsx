"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ConferenceSearch from "@/components/reviews/ConferenceSearch";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";

export default function ReviewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedConference, setSelectedConference] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/conferences" className="text-gray-400 hover:text-white transition-colors">
              Conferences
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">Reviews</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Conference Reviews</h1>
          <p className="text-gray-400">Share your experience and read reviews from other attendees</p>
        </div>

        {!selectedConference ? (
          <ConferenceSearch onConferenceSelect={setSelectedConference} />
        ) : showForm ? (
          <ReviewForm
            conference={selectedConference}
            onCancel={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              setRefreshKey(prev => prev + 1);
            }}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white">{selectedConference.name}</h2>
                  <p className="text-gray-400">{selectedConference.location}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedConference.startDate).toLocaleDateString()} -{" "}
                    {new Date(selectedConference.endDate).toLocaleDateString()}
                  </p>
                  {selectedConference.description && (
                    <p className="text-gray-300 text-sm mt-2">{selectedConference.description}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Write Review
                  </button>
                  <button
                    onClick={() => setSelectedConference(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Back to Search
                  </button>
                </div>
              </div>
            </div>

            <ReviewList conferenceId={selectedConference.id} refreshKey={refreshKey} />
          </div>
        )}
      </div>
    </div>
  );
}