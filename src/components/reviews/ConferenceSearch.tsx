"use client";

import { useState, useEffect } from "react";
import { Conference } from "@/types/conferences";

interface ConferenceSearchProps {
  onConferenceSelect: (conference: Conference) => void;
}

export default function ConferenceSearch({ onConferenceSelect }: ConferenceSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      searchConferences();
    } else if (searchTerm.length === 0) {
      fetchPopularConferences();
    } else {
      setConferences([]);
    }
  }, [searchTerm]);

  const searchConferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/conferences/search?search=${encodeURIComponent(searchTerm)}&limit=20`);
      if (response.ok) {
        const data = await response.json();
        setConferences(data);
      }
    } catch (error) {
      console.error("Error searching conferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopularConferences = async () => {
    try {
      const response = await fetch(`/api/conferences/search?limit=8`);
      if (response.ok) {
        const data = await response.json();
        setConferences(data);
      }
    } catch (error) {
      console.error("Error fetching popular conferences:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Find a Conference to Review</h2>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by name, location, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {conferences.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-300">
              {searchTerm ? "Search Results" : "Popular Conferences"}
            </h3>
            <span className="text-xs text-gray-500">
              {conferences.length} {conferences.length === 1 ? "result" : "results"}
            </span>
          </div>

          {conferences.map((conference) => (
            <div
              key={conference.id}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors group"
              onClick={() => onConferenceSelect(conference)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {conference.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{conference.location}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {formatDate(conference.startDate)} - {formatDate(conference.endDate)}
                  </p>

                  {conference.tags && conference.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {conference.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {conference.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{conference.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <svg
                  className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm.length > 1 && conferences.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2 text-gray-400">No conferences found</p>
          <p className="text-sm text-gray-500">Try searching with different keywords</p>
        </div>
      )}

      {searchTerm.length === 0 && conferences.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-400">Start typing to search for conferences</p>
        </div>
      )}
    </div>
  );
}