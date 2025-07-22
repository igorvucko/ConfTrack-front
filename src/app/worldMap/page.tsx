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
  shape: 'triangle' | 'star'
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
    const height = window.innerHeight / 1.2 // slightly shorter map

    const projection = d3.geoMercator().scale(width /7).translate([width / 2, height / 1.2])
    const path = d3.geoPath().projection(projection)

    const color = d3.scaleSequential(d3.interpolateViridis).domain([40000, 500]) // reversed

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        svg.selectAll('g.map').attr('transform', event.transform.toString())
      })

    svg.call(zoom as any)

d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((geojson: any) => {
geojson.features = geojson.features.filter((d: any) => d.properties.name !== 'Antarctica')

        const g = svg.append('g').attr('class', 'map')

        g.selectAll('path')
          .data(geojson.features)
          .join('path')
          .attr('d', path as any)
          .attr('fill', '#eee')
          .attr('stroke', '#999')

        d3.json<Festival[]>('/topten.json').then((data) => {
          if (!data) return

          g.selectAll('path.festival')
            .data(data)
            .join('path')
            .attr('class', 'festival')
            .attr('transform', (d) => {
const point = projection([d.lon, d.lat])
              return point ? `translate(${point[0]},${point[1]})` : ''
            })
            .attr('d', (d) => {
              return d.shape === 'triangle'
                ? d3.symbol().type(d3.symbolTriangle).size(100)()
                : d3.symbol().type(d3.symbolStar).size(200)()
            })
            .attr('fill', (d) => color(d.visitors))
            .attr('stroke', '#333')
            .attr('stroke-width', 0.5)
            .on('mouseover', function (event, d) {
              tooltip.transition().duration(200).style('opacity', '0.9')
              tooltip
                .html(
`${d.name}
${d.city}, ${d.country}<br/>${d.visitors.toLocaleString()} visitors<br/>${d.startDate} to ${d.endDate}`
                )
                .style('left', event.pageX + 5 + 'px')
                .style('top', event.pageY - 28 + 'px')
            })
            .on('mouseout', () => tooltip.transition().duration(500).style('opacity', '0'))

          // LEGEND
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
            .tickFormat(d3.format('.0s'))
            .ticks(6)

          canvas.append('g')
            .attr('transform', 'translate(30, 0)')
            .call(yAxis)

          canvas.append('text')
            .attr('x', 0)
            .attr('y', -10)
            .text('Veličina publike')
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
          background: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          pointerEvents: 'none',
          opacity: 0,
          fontFamily: 'sans-serif',
          fontSize: '16px',
          maxWidth:'220px'
        }}
      ></div>
    </div>
  )
}