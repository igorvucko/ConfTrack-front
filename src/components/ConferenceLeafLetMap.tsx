"use client"

import {
  MapContainer as LeafletMapContainer,
  TileLayer as LeafletTileLayer,
  Marker as LeafletMarker,
  Popup as LeafletPopup
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

type Props = {
  lat: number
  lon: number
  name: string
  location: string
}

const CustomIcon = L.icon({
  iconUrl: '/img/gps.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -36],
})

export default function ConferenceLeafletMap({ lat, lon, name, location }: Props) {
  useEffect(() => {

    setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conference Location</h2>
      <LeafletMapContainer
        center={[lat, lon]}
        zoom={7}
        scrollWheelZoom={true}
        style={{
          height: '400px',
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <LeafletTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LeafletMarker position={[lat, lon]} icon={CustomIcon}>
          <LeafletPopup>
            <div className="text-center">
              <strong>{name}</strong><br/>
              {location}
            </div>
          </LeafletPopup>
        </LeafletMarker>
      </LeafletMapContainer>
      <div className="mt-4 text-gray-600">
        <p><strong>Venue:</strong> {name}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Coordinates:</strong> {lat.toFixed(4)}, {lon.toFixed(4)}</p>
      </div>
    </div>
  )
}