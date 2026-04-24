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

const DIMENSIONS = [
  { label: 'Revenue Consistency', pct: '35%', icon: '📊' },
  { label: 'Trajectory',          pct: '20%', icon: '📈' },
  { label: 'Seasonality',         pct: '20%', icon: '🌊' },
  { label: 'Customer Loyalty',    pct: '15%', icon: '⭐' },
  { label: 'Fixed Cost Coverage', pct: '10%', icon: '🏠' },
]

export default function LoadingScreen({ hasDocuments }) {
  const MESSAGES = hasDocuments ? MESSAGES_DOCS : MESSAGES_BASE
  const [msgIndex, setMsgIndex] = useState(0)
  const [activeDim, setActiveDim] = useState(0)

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 700)
    const dimTimer = setInterval(() => {
      setActiveDim((i) => (i + 1) % DIMENSIONS.length)
    }, 1400)
    return () => { clearInterval(msgTimer); clearInterval(dimTimer) }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #062E22 0%, #0F6E56 60%, #1B9E7A 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 animate-glow"
          style={{ background: 'radial-gradient(circle, #C49A22, transparent)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10 animate-glow"
          style={{ background: 'radial-gradient(circle, white, transparent)', animationDelay: '1.5s' }}
        />
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-load" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-load)" />
        </svg>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-16 relative">
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
          </svg>
        </div>
        <div>
          <div className="font-black text-lg text-white tracking-tight">Second Line</div>
          <div className="text-xs text-white/50 font-semibold tracking-widest">CAPITAL</div>
        </div>
      </div>

      {/* Pulsing score orb */}
      <div className="relative mb-12">
        {/* Outer pulse rings */}
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
        <div
          className="absolute -inset-3 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(15,110,86,0.4) 0%, transparent 70%)',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}
        />

        {/* Center orb */}
        <div
          className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.25)' }}
        >
          {/* Spinning arc */}
          <svg
            width="112" height="112"
            className="absolute inset-0"
            style={{ animation: 'spin 1.8s linear infinite' }}
          >
            <circle
              cx="56" cy="56" r="50"
              fill="none"
              stroke="rgba(196,154,34,0.8)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="60 254"
            />
          </svg>
          <svg width="30" height="30" viewBox="0 0 20 20" fill="none" className="mb-1">
            <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="rgba(255,255,255,0.9)" />
          </svg>
          <span className="text-white/60 text-xs font-semibold">AI</span>
        </div>
      </div>

      {/* Status text */}
      <h2 className="text-white text-2xl font-black mb-3 text-center" style={{ letterSpacing: '-0.5px' }}>
        Analyzing your business...
      </h2>
      <p
        className="text-white/65 text-base text-center transition-all duration-300 mb-12 min-h-[24px]"
        key={msgIndex}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        {MESSAGES[msgIndex]}
      </p>

      {/* Dimension cards */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {DIMENSIONS.map((d, i) => (
          <div
            key={d.label}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-300"
            style={{
              backgroundColor: activeDim === i ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
              color: activeDim === i ? 'white' : 'rgba(255,255,255,0.5)',
              border: activeDim === i ? '1px solid rgba(255,255,255,0.35)' : '1px solid transparent',
              transform: activeDim === i ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <span>{d.icon}</span>
            <span>{d.label}</span>
            <span style={{ color: activeDim === i ? 'rgba(196,154,34,0.9)' : 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
              {d.pct}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
