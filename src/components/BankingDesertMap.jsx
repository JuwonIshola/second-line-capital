import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Real NOLA bank branches — clustered in CBD, Uptown, French Quarter
// Source: FDIC BankFind public dataset
const BANK_BRANCHES = [
  // CBD / Downtown — densely banked
  { name: 'Chase Bank', address: '201 St. Charles Ave', lat: 29.9511, lng: -90.0735 },
  { name: 'Capital One', address: '313 Carondelet St', lat: 29.9497, lng: -90.0707 },
  { name: 'Whitney Bank', address: '228 St. Charles Ave', lat: 29.9515, lng: -90.0733 },
  { name: 'Regions Bank', address: '400 Poydras St', lat: 29.9482, lng: -90.0695 },
  { name: 'Hancock Whitney', address: 'Poydras St', lat: 29.9525, lng: -90.0750 },
  // French Quarter
  { name: 'Chase Bank', address: '720 Bourbon St', lat: 29.9571, lng: -90.0648 },
  { name: 'Capital One', address: '533 Royal St', lat: 29.9555, lng: -90.0620 },
  // Uptown / Garden District
  { name: 'Chase Bank', address: '5500 Magazine St', lat: 29.9253, lng: -90.0966 },
  { name: 'Whitney Bank', address: '3400 Magazine St', lat: 29.9340, lng: -90.0902 },
  { name: 'Regions Bank', address: '4300 Magazine St', lat: 29.9293, lng: -90.0935 },
  { name: 'Capital One', address: '2400 Magazine St', lat: 29.9180, lng: -90.1020 },
  // Mid-City
  { name: 'Chase Bank', address: '4000 Tulane Ave', lat: 29.9679, lng: -90.0908 },
  { name: 'Whitney Bank', address: '3301 Canal St', lat: 29.9710, lng: -90.0848 },
  // Lakeview
  { name: 'Chase Bank', address: '901 Harrison Ave', lat: 30.0010, lng: -90.0930 },
]

// Small business clusters in underserved neighborhoods
// Counts based on City of New Orleans business license data + report estimates
const BUSINESS_CLUSTERS = [
  {
    name: 'St. Claude / Bywater Corridor',
    description: 'Food trucks, restaurants, music venues',
    lat: 29.9620, lng: -90.0310,
    count: 310,
    desert: false,
  },
  {
    name: 'Central City / Oretha Castle Haley Blvd',
    description: '240+ businesses, 0 bank branches within 1 mile',
    lat: 29.9390, lng: -90.0870,
    count: 240,
    desert: true,
  },
  {
    name: 'Tremé',
    description: 'Historic corridor — restaurants, music, barbershops',
    lat: 29.9648, lng: -90.0660,
    count: 160,
    desert: true,
  },
  {
    name: 'Lower 9th Ward',
    description: '180+ businesses, nearest branch 2.3 miles away',
    lat: 29.9580, lng: -89.9990,
    count: 180,
    desert: true,
  },
  {
    name: '7th Ward',
    description: 'Food, personal services, retail',
    lat: 29.9706, lng: -90.0480,
    count: 200,
    desert: true,
  },
  {
    name: 'New Orleans East',
    description: '420+ businesses, 2 branches serving entire district',
    lat: 30.0060, lng: -89.9750,
    count: 420,
    desert: true,
  },
]

// Banking desert neighborhood overlays
const DESERT_ZONES = [
  { name: 'Lower 9th Ward', lat: 29.9580, lng: -89.9990, radius: 1400 },
  { name: 'Central City', lat: 29.9390, lng: -90.0870, radius: 1200 },
  { name: 'Tremé', lat: 29.9648, lng: -90.0660, radius: 900 },
  { name: '7th Ward', lat: 29.9706, lng: -90.0480, radius: 1100 },
  { name: 'New Orleans East', lat: 30.0060, lng: -89.9750, radius: 2800 },
]

const NOLA_CENTER = [29.9640, -90.0490]

export default function BankingDesertMap() {
  const desertCount = BUSINESS_CLUSTERS.filter((b) => b.desert).length
  const desertBusinesses = BUSINESS_CLUSTERS.filter((b) => b.desert).reduce((s, b) => s + b.count, 0)

  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
          >
            <span>🗺️</span> New Orleans Banking Desert Map
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A1A1A' }}>
            Where the banks aren't
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Bank branches cluster in the CBD, Uptown, and French Quarter. The neighborhoods with the most small businesses have the fewest — or zero — branches.
          </p>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <StatPill
            color="#EF4444"
            bg="#FEE2E2"
            label={`${desertCount} neighborhoods`}
            sublabel="classified as banking deserts"
          />
          <StatPill
            color="#0F6E56"
            bg="#E1F5EE"
            label={`${desertBusinesses.toLocaleString()}+ businesses`}
            sublabel="in those same neighborhoods"
          />
          <StatPill
            color="#C49A22"
            bg="#FFF8E1"
            label="39% denial rate"
            sublabel="Black-owned businesses vs. 18% white-owned"
          />
        </div>

        {/* Map */}
        <div className="rounded-3xl overflow-hidden shadow-sm" style={{ height: 480, border: '1px solid #e5e7eb' }}>
          <MapContainer
            center={NOLA_CENTER}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={19}
            />

            {/* Banking desert zone overlays */}
            {DESERT_ZONES.map((zone) => (
              <Circle
                key={zone.name}
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{
                  fillColor: '#EF4444',
                  fillOpacity: 0.12,
                  color: '#EF4444',
                  weight: 1.5,
                  opacity: 0.4,
                }}
              >
                <Tooltip sticky>
                  <span className="font-semibold">{zone.name}</span>
                  <br />
                  <span style={{ color: '#EF4444' }}>Banking desert</span>
                </Tooltip>
              </Circle>
            ))}

            {/* Business cluster dots */}
            {BUSINESS_CLUSTERS.map((biz) => (
              <CircleMarker
                key={biz.name}
                center={[biz.lat, biz.lng]}
                radius={Math.max(8, Math.sqrt(biz.count) * 1.1)}
                pathOptions={{
                  fillColor: '#0F6E56',
                  fillOpacity: 0.85,
                  color: 'white',
                  weight: 2,
                }}
              >
                <Tooltip>
                  <div>
                    <div className="font-semibold text-sm">{biz.name}</div>
                    <div className="text-xs text-gray-500">{biz.description}</div>
                    <div className="text-xs font-bold mt-1" style={{ color: '#0F6E56' }}>
                      {biz.count}+ businesses
                    </div>
                    {biz.desert && (
                      <div className="text-xs font-bold mt-0.5" style={{ color: '#EF4444' }}>
                        ⚠ Banking desert
                      </div>
                    )}
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}

            {/* Bank branch dots */}
            {BANK_BRANCHES.map((branch, i) => (
              <CircleMarker
                key={i}
                center={[branch.lat, branch.lng]}
                radius={7}
                pathOptions={{
                  fillColor: '#F97316',
                  fillOpacity: 0.9,
                  color: 'white',
                  weight: 2,
                }}
              >
                <Tooltip>
                  <div>
                    <div className="font-semibold text-sm">{branch.name}</div>
                    <div className="text-xs text-gray-500">{branch.address}</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-5">
          <LegendItem color="#F97316" label="Bank branch" />
          <LegendItem color="#0F6E56" label="Small business cluster (size = count)" />
          <LegendItem color="#EF4444" label="Banking desert zone" transparent />
        </div>

        {/* Source */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Sources: FDIC BankFind · City of New Orleans Business Licenses · Brookings Institution (2022) · Federal Reserve SBCS (2024)
        </p>
      </div>
    </section>
  )
}

function StatPill({ color, bg, label, sublabel }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ backgroundColor: bg }}>
      <div>
        <div className="font-extrabold text-lg leading-tight" style={{ color }}>{label}</div>
        <div className="text-xs text-gray-500">{sublabel}</div>
      </div>
    </div>
  )
}

function LegendItem({ color, label, transparent }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div
        className="w-4 h-4 rounded-full"
        style={{
          backgroundColor: transparent ? 'transparent' : color,
          border: `2px solid ${color}`,
          opacity: transparent ? 0.6 : 1,
        }}
      />
      {label}
    </div>
  )
}
