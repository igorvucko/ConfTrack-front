'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export type Festival = {
  name: string
  city: string
  country: string
  startDate: string
  endDate: string
  lat: number
  lon: number
  visitors: number
  shape: string
}

export default function FestivalMapPage() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svgElement = svgRef.current
    const tooltipElement = tooltipRef.current
    if (!svgElement || !tooltipElement) return

    const svg = d3.select(svgElement)
    const tooltip = d3.select(tooltipElement)
    const width = window.innerWidth / 1.2
    const height = window.innerHeight / 1.2

    const projection = d3.geoMercator().scale(width / 7).translate([width / 1.75, height / 1.2])
    const path = d3.geoPath().projection(projection)

    const color = d3.scaleSequential(d3.interpolateViridis).domain([1, 10])
    const sizeScale = d3.scaleLinear().domain([1, 14]).range([4, 10])

    const mapLayer = svg.append('g').attr('class', 'map-layer')
    const circleLayer = svg.append('g').attr('class', 'circle-layer')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        const transform = event.transform
        mapLayer.attr('transform', transform.toString())
        circleLayer.attr('transform', transform.toString())

        circleLayer.selectAll('circle.festival')
          .attr('r', function () {
            const d = d3.select(this).datum() as Festival
            const start = new Date(d.startDate)
            const end = new Date(d.endDate)
            const duration = Math.max((+end - +start) / (1000 * 60 * 60 * 24), 1)
            return sizeScale(duration) / transform.k
          })
      })

    svg.call(zoom as any)

    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((geojson: any) => {
        d3.json<Festival[]>('/data/topten.json').then((data) => {
          if (!data) return

          const countryCount: Record<string, number> = {}
          data.forEach((d) => {
            const country = d.country
            countryCount[country] = (countryCount[country] || 0) + 1
          })

          geojson.features = geojson.features.filter((d: any) => d.properties.name !== 'Antarctica')

          mapLayer.selectAll('path')
            .data(geojson.features)
            .join('path')
            .attr('d', path as any)
            .attr('fill', (d: any) => {
              const count = countryCount[d.properties.name]
              return count ? color(Math.min(count, 10)) : '#eee'
            })
            .attr('stroke', '#999')

          circleLayer.selectAll('circle.festival')
            .data(data)
            .join('circle')
            .attr('class', 'festival')
            .attr('cx', (d) => projection([d.lon, d.lat])?.[0] ?? 0)
            .attr('cy', (d) => projection([d.lon, d.lat])?.[1] ?? 0)
            .attr('r', (d) => {
              const start = new Date(d.startDate)
              const end = new Date(d.endDate)
              const duration = Math.max((+end - +start) / (1000 * 60 * 60 * 24), 1)
              return sizeScale(duration)
            })
            .attr('fill', '#f3b400')
            .attr('stroke', '#222')
            .attr('stroke-width', 0.5)
            .style('cursor', 'pointer')
            .on('mouseover', function (event, d) {
              d3.select(this).attr('fill', '#e53935')
              tooltip.transition().duration(200).style('opacity', '1')
              tooltip
                .html(
                  `<strong>${d.name}</strong><br/>${d.city}, ${d.country}<br/>👥 ${d.visitors.toLocaleString()} posjetitelja<br/>⏱ ${d.startDate} – ${d.endDate}`
                )
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 40}px`)
            })
            .on('mouseout', function () {
              d3.select(this).attr('fill', '#f3b400')
              tooltip.transition().duration(300).style('opacity', '0')
            })
            .on('click', function (event, d) {
              const slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
              window.location.href = `/festivali/${slug}`
            })

          const canvas = d3.select(legendRef.current)
          const defs = canvas.append('defs')
          const linearGradient = defs.append('linearGradient')
            .attr('id', 'legend-gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%')

          const legendSteps = 10
          const domain = color.domain()

          for (let i = 0; i <= legendSteps; i++) {
            const t = i / legendSteps
            linearGradient.append('stop')
              .attr('offset', `${t * 100}%`)
              .attr('stop-color', color(domain[0] + t * (domain[1] - domain[0])))
          }

          canvas.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 30)
            .attr('height', 180)
            .style('fill', 'url(#legend-gradient)')

          const yScale = d3.scaleLinear()
            .domain([domain[1], domain[0]])
            .range([180, 0])

          const yAxis = d3.axisRight(yScale)
            .tickFormat(d3.format('d'))
            .ticks(5)

          canvas.append('g')
            .attr('transform', 'translate(30, 0)')
            .call(yAxis)

          canvas.append('text')
            .attr('x', 0)
            .attr('y', -10)
            .text('Broj festivala po zemlji')
            .attr('font-size', '14px')
        })
      })
  }, [])

  return (
    <div style={{ position: 'relative', margin: '0 1rem' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100vh' }} />
      <svg ref={legendRef} style={{ position: 'absolute', bottom: '20px', left: '20px', width: '60px', height: '220px' }} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: '#1f1f2e',
          padding: '10px',
          border: '1px solid #888',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
          pointerEvents: 'none',
          opacity: 0,
          fontFamily: 'sans-serif',
          fontSize: '14px',
          color: '#fff',
          transition: 'opacity 0.3s ease, transform 0.2s ease',
          transform: 'translateY(0px)',
          zIndex: 10
        }}
      ></div>
    </div>
  )
}