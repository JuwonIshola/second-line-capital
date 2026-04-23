import { useEffect, useState, useRef } from 'react'

const TIER_COLORS = {
  Excellent: { bg: '#FFF8E1', text: '#C49A22', border: '#C49A22' },
  Good: { bg: '#E1F5EE', text: '#0F6E56', border: '#0F6E56' },
  Fair: { bg: '#FFF3E0', text: '#E65100', border: '#E65100' },
  Building: { bg: '#F3E5F5', text: '#6A1B9A', border: '#6A1B9A' },
}

const CATEGORY_META = {
  revenueConsistency: { label: 'Revenue Consistency', max: 35, weight: '35%' },
  trajectory: { label: 'Revenue Trajectory', max: 20, weight: '20%' },
  seasonalityPredictability: { label: 'Seasonality Predictability', max: 20, weight: '20%' },
  customerLoyalty: { label: 'Customer Loyalty Depth', max: 15, weight: '15%' },
  fixedCostCoverage: { label: 'Fixed Cost Coverage', max: 10, weight: '10%' },
}

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return value
}

function ScoreCircle({ score }) {
  const displayScore = useCountUp(score)
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      <svg width="160" height="160" className="rotate-[-90deg]">
        <circle cx="80" cy="80" r="54" fill="none" stroke="#E1F5EE" strokeWidth="12" />
        <circle
          cx="80" cy="80" r="54" fill="none"
          stroke="#0F6E56" strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-extrabold" style={{ color: '#0F6E56' }}>{displayScore}</span>
        <span className="text-xs text-gray-400 font-medium">/ 100</span>
      </div>
    </div>
  )
}

function CategoryBar({ label, value, max, weight }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth((value / max) * 100), 200)
        obs.disconnect()
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value, max])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center text-sm mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">{label}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
            {weight}
          </span>
        </div>
        <span className="font-bold tabular-nums" style={{ color: '#0F6E56' }}>
          {value}
          <span className="text-gray-400 font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E1F5EE' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: '#0F6E56',
            transition: 'width 1.1s ease-out',
          }}
        />
      </div>
    </div>
  )
}

export default function ScoreResults({ formData, scoreData, hasDocuments, onFindPartners, onStartOver }) {
  const tierStyle = TIER_COLORS[scoreData.tier] || TIER_COLORS.Good

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F6E56' }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="font-bold" style={{ color: '#0F6E56' }}>Second Line Capital</span>
          </div>
          <button onClick={onStartOver} className="text-sm text-gray-400 hover:text-gray-600">
            ← Start over
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
        {/* Score hero card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-500 mb-3">
            {formData.businessName}'s Second Line Score
          </h1>
          {hasDocuments && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
              <span>📄</span> Scored with uploaded documents
            </div>
          )}

          <div className="flex flex-col items-center gap-4 mb-6">
            <ScoreCircle score={scoreData.score} />
            <div
              className="px-5 py-2 rounded-full text-sm font-bold border-2"
              style={{ backgroundColor: tierStyle.bg, color: tierStyle.text, borderColor: tierStyle.border }}
            >
              {scoreData.tier}
            </div>
          </div>

          {/* Loan amount + repayment note */}
          <div className="inline-flex items-start gap-3 px-6 py-4 rounded-2xl mb-6 text-left"
            style={{ backgroundColor: '#FFF8E1' }}>
            <span className="text-2xl mt-0.5">🏦</span>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">You qualify for up to</div>
              <div className="text-2xl font-extrabold" style={{ color: '#C49A22' }}>{scoreData.loanAmount}</div>
              <div className="text-xs text-gray-500 mt-1">
                Repay as 5–8% of daily POS revenue · No fixed payments · Capped at 1.4× principal
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">{scoreData.summary}</p>
        </div>

        {/* Score breakdown — 5 dimensions */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <h2 className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>Score Breakdown</h2>
          <p className="text-sm text-gray-400 mb-6">Five dimensions — the signals FICO can't see</p>
          {Object.entries(scoreData.categories).map(([key, val]) => {
            const meta = CATEGORY_META[key]
            if (!meta) return null
            return (
              <CategoryBar
                key={key}
                label={meta.label}
                value={val}
                max={meta.max}
                weight={meta.weight}
              />
            )
          })}
        </div>

        {/* Strengths + Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h2 className="font-bold text-lg mb-5" style={{ color: '#1A1A1A' }}>
              <span className="mr-2">💪</span>Strengths
            </h2>
            <ul className="space-y-3">
              {scoreData.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#0F6E56' }}>✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h2 className="font-bold text-lg mb-5" style={{ color: '#1A1A1A' }}>
              <span className="mr-2">📈</span>Areas to Improve
            </h2>
            <ul className="space-y-3">
              {scoreData.improvements.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#C49A22' }}>→</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
          <h2 className="font-bold text-lg mb-5" style={{ color: '#1A1A1A' }}>
            <span className="mr-2">🗺️</span>Your Next Steps
          </h2>
          <ol className="space-y-4">
            {scoreData.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-4 text-gray-600 leading-relaxed">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: '#0F6E56' }}
                >
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onFindPartners}
            className="px-10 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#0F6E56' }}
          >
            Find My Funding Partners →
          </button>
          <p className="text-sm text-gray-400 mt-4">Matched to TruFund, New Corp Inc., and Accion — real Louisiana lenders</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400">
          Powered by <span className="font-semibold" style={{ color: '#0F6E56' }}>Claude AI</span>
        </p>
      </div>
    </div>
  )
}
