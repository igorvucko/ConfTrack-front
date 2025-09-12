"use client";

import { useState } from 'react';

interface Conference {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  website?: string;
  tags?: string[];
  lat?: number;
  lon?: number;
}

export default function ConferenceClientInfo({ conference }: { conference: Conference }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{conference.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Location</h3>
            <p className="text-gray-600">{conference.location}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Date</h3>
            <p className="text-gray-600">
              {new Date(conference.startDate).toLocaleDateString()} - {new Date(conference.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {conference.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className={`text-gray-600 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
              {conference.description}
            </p>
            {conference.description.length > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-blue-500 hover:text-blue-700 mt-2 text-sm font-medium"
              >
                {isDescriptionExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {conference.tags && conference.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {conference.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {conference.website && (
          <div>
            <a
              href={conference.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Visit Website
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}