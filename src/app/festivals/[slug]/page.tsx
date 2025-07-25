import { notFound } from 'next/navigation'
import Image from 'next/image'
import festivals from '@/../public/data/topten.json'
import FestivalClientInfo from '@/components/ClientInfo'
import CountryMap from '@/components/CountryMap'
import FestivalLeafletMap from '@/components/FestivalLeafLetMap'


function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function generateStaticParams() {
  return festivals.map(fest => ({
    slug: slugify(fest.name),
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const fest = festivals.find(f => slugify(f.name) === params.slug)

  if (!fest) return notFound()

  const imagePath = `/img/${params.slug}.jpg`

  return (
    <div className="bg-white text-gray-900 text-center">
      <div className="relative w-full aspect-[3/1] ">
  <Image
    src={imagePath}
    alt={`${fest.name} stage`}
    fill
    className="object-cover object-bottom "
    priority
  />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h1 className="text-white text-5xl font-bold drop-shadow-lg">{fest.name}</h1>
  </div>
</div>

      <FestivalClientInfo fest={fest} />

      <div className="max-w-4xl mx-auto px-4 pb-20">
  <FestivalLeafletMap lat={fest.lat} lon={fest.lon} name={fest.name} />
                </div>
                </div>

 )
}