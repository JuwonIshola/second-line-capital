import { useEffect, useState } from 'react'

const MESSAGES_BASE = [
  'Analyzing POS transaction history...',
  'Processing customer review sentiment...',
  'Evaluating community engagement signals...',
  'Modeling seasonal revenue patterns...',
  'Calculating Fixed Cost Coverage ratio...',
  'Generating your Second Line Score...',
]

const MESSAGES_DOCS = [
  'Reading your uploaded documents...',
  'Extracting revenue data from statements...',
  'Cross-referencing transaction history...',
  'Analyzing cash flow patterns...',
  'Calculating Fixed Cost Coverage ratio...',
  'Generating your Second Line Score...',
]

export default function LoadingScreen({ hasDocuments }) {
  const MESSAGES = hasDocuments ? MESSAGES_DOCS : MESSAGES_BASE
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#0F6E56' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-16">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
          </svg>
        </div>
        <span className="font-bold text-xl text-white">Second Line Capital</span>
      </div>

      {/* Spinner */}
      <div className="relative mb-10">
        <div
          className="w-24 h-24 rounded-full border-4 border-white/20"
          style={{ borderTopColor: 'white', animation: 'spin 1s linear infinite' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
          </svg>
        </div>
      </div>

      <h2 className="text-white text-2xl font-bold mb-4 text-center">
        Our AI is analyzing your business...
      </h2>
      <p className="text-white/70 text-base text-center transition-all duration-300" key={msgIndex}>
        {MESSAGES[msgIndex]}
      </p>

      {/* Five dimension pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-10 max-w-sm">
        {[
          { label: 'Revenue Consistency', pct: '35%' },
          { label: 'Trajectory', pct: '20%' },
          { label: 'Seasonality', pct: '20%' },
          { label: 'Customer Loyalty', pct: '15%' },
          { label: 'Fixed Cost Coverage', pct: '10%' },
        ].map((d) => (
          <div key={d.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs">
            <span>{d.label}</span>
            <span className="font-bold text-white/50">{d.pct}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
