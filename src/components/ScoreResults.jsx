import { useEffect, useState, useRef } from 'react'

const TIER_CONFIG = {
  Excellent: { bg: '#FFF8E1', text: '#C49A22', border: '#C49A22', gradient: 'linear-gradient(135deg, #C49A22, #E8B84B)', dot: '#C49A22' },
  Good:      { bg: '#E1F5EE', text: '#0F6E56', border: '#0F6E56', gradient: 'linear-gradient(135deg, #0F6E56, #1B9E7A)', dot: '#0F6E56' },
  Fair:      { bg: '#FFF3E0', text: '#E65100', border: '#E65100', gradient: 'linear-gradient(135deg, #E65100, #F57C00)', dot: '#E65100' },
  Building:  { bg: '#F3E5F5', text: '#6A1B9A', border: '#6A1B9A', gradient: 'linear-gradient(135deg, #6A1B9A, #8E24AA)', dot: '#6A1B9A' },
}

const CATEGORY_META = {
  revenueConsistency:       { label: 'Revenue Consistency',       max: 35, icon: '📊' },
  trajectory:               { label: 'Revenue Trajectory',        max: 20, icon: '📈' },
  seasonalityPredictability:{ label: 'Seasonality Predictability',max: 20, icon: '🌊' },
  customerLoyalty:          { label: 'Customer Loyalty Depth',    max: 15, icon: '⭐' },
  fixedCostCoverage:        { label: 'Fixed Cost Coverage',       max: 10, icon: '🏠' },
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return value
}

function ScoreRing({ score, tier }) {
  const display = useCountUp(score)
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG.Good
  const r = 68
  const circ = 2 * Math.PI * r
  const offset = circ - (display / 100) * circ

  return (
    <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 animate-pulse-ring"
        style={{ background: cfg.gradient }}
      />
      <svg width="180" height="180" className="rotate-[-90deg]">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#F3F4F6" strokeWidth="14" />
        <circle
          cx="90" cy="90" r={r} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={cfg.dot} />
            <stop offset="100%" stopColor={cfg.dot} stopOpacity={0.7} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-black" style={{ color: cfg.dot, letterSpacing: '-2px' }}>{display}</span>
        <span className="text-sm text-gray-400 font-semibold">out of 100</span>
      </div>
    </div>
  )
}

function CategoryBar({ label, icon, value, max }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)
  const pct = Math.round((value / max) * 100)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setWidth(pct), 150); obs.disconnect() }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div ref={ref} className="py-3 border-b border-gray-50 last:border-0">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">/{max}</span>
          <span className="text-sm font-black tabular-nums" style={{ color: '#0F6E56' }}>{value}</span>
        </div>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #0F6E56, #1B9E7A)',
            transition: 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  )
}

export default function ScoreResults({ formData, scoreData, hasDocuments, onFindPartners, onStartOver }) {
  const cfg = TIER_CONFIG[scoreData.tier] || TIER_CONFIG.Good

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFB' }}>

      {/* ── Dashboard header ────────────────────────────────── */}
      <div
        className="relative overflow-hidden pb-32"
        style={{ background: 'linear-gradient(155deg, #062E22 0%, #0F6E56 60%, #1B9E7A 100%)' }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-res" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-res)" />
          </svg>
        </div>

        {/* Top nav */}
        <div className="relative px-6 py-4 max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-white text-base tracking-tight">Second Line Capital</span>
          </div>
          <button
            onClick={onStartOver}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Start over
          </button>
        </div>

        {/* Hero score area */}
        <div className="relative max-w-4xl mx-auto px-6 pt-6 pb-6 text-center">
          <div className="text-white/60 text-sm font-semibold mb-2 tracking-wide uppercase">
            {formData.businessName}
          </div>
          <h1 className="text-3xl font-black text-white mb-1" style={{ letterSpacing: '-0.5px' }}>
            Your Second Line Score
          </h1>
          {hasDocuments && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mt-2 mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
            >
              <span>📄</span> Scored with uploaded documents
            </div>
          )}
        </div>
      </div>

      {/* ── Floating score card — overlaps the hero ────────── */}
      <div className="max-w-4xl mx-auto px-6 -mt-28 relative z-10 animate-fade-in">

        {/* Score hero card */}
        <div className="bg-white rounded-3xl card-shadow-lg p-8 mb-5 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <ScoreRing score={scoreData.score} tier={scoreData.tier} />
            <div
              className="px-5 py-2 rounded-full text-sm font-bold border-2 inline-flex items-center gap-2"
              style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.border }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.dot }} />
              {scoreData.tier} Tier
            </div>
          </div>

          {/* Loan offer */}
          <div
            className="inline-flex items-start gap-4 px-6 py-5 rounded-2xl mb-6 text-left"
            style={{ background: 'linear-gradient(135deg, #FFF8E1, #FFF3CD)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
              style={{ backgroundColor: '#FDECC4' }}
            >
              🏦
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-0.5">
                You qualify for up to
              </div>
              <div className="text-3xl font-black" style={{ color: '#C49A22' }}>{scoreData.loanAmount}</div>
              <div className="text-xs text-gray-500 mt-1">
                Repay as 5–8% of daily POS revenue · No fixed payments · Capped at 1.4× principal
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto text-sm">{scoreData.summary}</p>
        </div>

        {/* Score breakdown */}
        <div className="bg-white rounded-3xl card-shadow p-8 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#E1F5EE' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                style={{ color: '#0F6E56' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <h2 className="font-black text-gray-900">Score Breakdown</h2>
              <p className="text-xs text-gray-400">Five dimensions FICO can't see</p>
            </div>
          </div>

          {Object.entries(scoreData.categories).map(([key, val]) => {
            const meta = CATEGORY_META[key]
            if (!meta) return null
            return (
              <CategoryBar key={key} label={meta.label} icon={meta.icon} value={val} max={meta.max} />
            )
          })}
        </div>

        {/* Strengths + Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-3xl card-shadow p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: '#E1F5EE' }}>💪</div>
              <h2 className="font-black text-gray-900">Strengths</h2>
            </div>
            <ul className="space-y-4">
              {scoreData.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
                  >
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl card-shadow p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: '#FFF8E1' }}>📈</div>
              <h2 className="font-black text-gray-900">Areas to Improve</h2>
            </div>
            <ul className="space-y-4">
              {scoreData.improvements.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#C49A22' }}
                  >
                    →
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-3xl card-shadow p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: '#E1F5EE' }}>🗺️</div>
            <h2 className="font-black text-gray-900">Your Next Steps</h2>
          </div>
          <ol className="space-y-5">
            {scoreData.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
                >
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed text-sm pt-2">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center pb-16">
          <button
            onClick={onFindPartners}
            className="px-10 py-4 rounded-2xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-95"
            style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
          >
            Find My Funding Partners →
          </button>
          <p className="text-sm text-gray-400 mt-3">
            Matched to TruFund, New Corp Inc., and Accion — real Louisiana lenders
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-300">
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            256-bit encrypted · Powered by Claude AI
          </div>
        </div>
      </div>
    </div>
  )
}
