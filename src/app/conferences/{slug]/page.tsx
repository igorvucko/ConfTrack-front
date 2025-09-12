import { notFound } from 'next/navigation'
import Image from 'next/image'
import conferencesData from '@/../public/data/conferences.json'
import ConferenceClientInfo from '@/components/reviews/ConferenceClientInfo'
import ConferenceLeafletMap from '@/components/ConferenceLeafLetMap'

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

interface ConferencesData {
  conferences: Conference[];
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function generateStaticParams() {
  const data = conferencesData as ConferencesData;
  return data.conferences.map(conf => ({
    slug: slugify(conf.name),
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = conferencesData as ConferencesData;
  const conference = data.conferences.find(c => slugify(c.name) === params.slug)

  if (!conference) return notFound()

  const imagePath = `/img/${params.slug}.jpg`

  return (
    <div className="bg-white text-gray-900">
      <div className="relative w-full aspect-[3/1] ">
        <Image
          src={imagePath}
          alt={`${conference.name} venue`}
          fill
          className="object-cover object-bottom"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg">{conference.name}</h1>
        </div>
      </div>

      <ConferenceClientInfo conference={conference} />

      {conference.lat && conference.lon && (
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <ConferenceLeafletMap
            lat={conference.lat}
            lon={conference.lon}
            name={conference.name}
            location={conference.location}
          />
        </div>
      )}
    </div>
  )
}