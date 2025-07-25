'use client'

import React from 'react'

type Festival = {
  name: string
  city: string
  country: string
  startDate: string
  endDate: string
  visitors: number
  buyLink?: string
  faq?: { q: string; a: string }[]
  reviews?: { user: string; rating: number; comment: string }[]
}

type Props = {
  fest: Festival
}

export default function FestivalClientInfo({ fest }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">Festival Info</h2>
      <p><strong>Location:</strong> {fest.city}, {fest.country}</p>
      <p><strong>Dates:</strong> {fest.startDate} – {fest.endDate}</p>
      <p><strong>Visitors:</strong> {fest.visitors.toLocaleString('en-US')}</p>

      {fest.buyLink && (
        <a
          href={fest.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          🎟 Buy Tickets
        </a>
      )}

      {Array.isArray(fest.faq) && fest.faq.length > 0 && (
        <div className="pt-12">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <ul className="space-y-4">
            {fest.faq.map((item, i) => (
              <li key={i}>
                <p className="font-semibold">❓ {item.q}</p>
                <p className="text-gray-700">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(fest.reviews) && fest.reviews.length > 0 && (
        <div className="pt-12 pb-20">
          <h2 className="text-2xl font-semibold mb-4">Recenzije</h2>
          <ul className="space-y-6">
            {fest.reviews.map((review, i) => (
              <li key={i} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <p className="font-semibold">⭐ {review.rating}/5 — {review.user}</p>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
