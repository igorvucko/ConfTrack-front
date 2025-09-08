"use client";

import { useState, useEffect } from "react";

interface Conference {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  website?: string;
  tags?: string[];
}

interface ConferenceSearchProps {
  onConferenceSelect: (conference: Conference) => void;
}

export default function ConferenceSearch({ onConferenceSelect }: ConferenceSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchConferences();
    } else {
      setConferences([]);
    }
  }, [searchTerm]);

  const searchConferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/conferences?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setConferences(data);
    } catch (error) {
      console.error("Error searching conferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Find a Conference to Review</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for conferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {conferences.length > 0 && (
        <div className="space-y-3">
          {conferences.map((conference) => (
            <div
              key={conference.id}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
              onClick={() => onConferenceSelect(conference)}
            >
              <h3 className="font-semibold text-white">{conference.name}</h3>
              <p className="text-gray-400 text-sm">{conference.location}</p>
              <p className="text-gray-500 text-xs">
                {new Date(conference.startDate).toLocaleDateString()} -{" "}
                {new Date(conference.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {searchTerm.length > 2 && conferences.length === 0 && !isLoading && (
        <p className="text-gray-400 text-center py-4">No conferences found. Try a different search term.</p>
      )}
    </div>
  );
}