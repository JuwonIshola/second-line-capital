const LENDERS = [
  {
    name: 'TruFund Financial Services',
    type: 'CDFI',
    range: '$5,000 – $50,000',
    description: 'New Orleans CDFI and Second Line Capital originating partner — serving underbanked Louisiana entrepreneurs with fast, fair lending.',
    bg: '#E1F5EE',
    accent: '#0F6E56',
    badge: 'Preferred Partner',
    badgeBg: '#0F6E56',
    icon: '🏛️',
    features: ['24-hour decision', 'Revenue-based repayment', 'No collateral required'],
    highlight: true,
  },
  {
    name: 'New Corp Inc.',
    type: 'CDFI',
    range: '$5,000 – $50,000',
    description: 'Community development lender focused on economic equity in New Orleans neighborhoods — a Second Line Capital originating partner.',
    bg: '#E1F5EE',
    accent: '#0F6E56',
    badge: 'Community Lender',
    badgeBg: '#0F6E56',
    icon: '🌿',
    features: ['Neighborhood focus', 'Bilingual support', 'Technical assistance'],
    highlight: true,
  },
  {
    name: 'Accion Opportunity Fund',
    type: 'Micro-lender',
    range: '$5,000 – $100,000',
    description: 'Mission-driven lending for underserved business owners nationwide — available when local CDFI capacity is full.',
    bg: '#F3E5F5',
    accent: '#6A1B9A',
    badge: 'Backup Partner',
    badgeBg: '#6A1B9A',
    icon: '🤝',
    features: ['National coverage', 'Flexible terms', 'Online application'],
    highlight: false,
  },
]

const REPAYMENT_EXAMPLES = [
  { label: 'Normal week', revenue: '$4,000 POS', payment: '~$240/week', note: '6% holdback', icon: '📅' },
  { label: 'Jazz Fest week', revenue: '$9,000 POS', payment: '~$540/week', note: 'Pay off faster', icon: '🎺' },
  { label: 'Slow August', revenue: '$2,000 POS', payment: '~$120/week', note: 'No default risk', icon: '☀️' },
]

export default function FundingPartners({ scoreData, onStartOver, onBack }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFB' }}>

      {/* ── Header banner ────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pb-24"
        style={{ background: 'linear-gradient(155deg, #062E22 0%, #0F6E56 60%, #1B9E7A 100%)' }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-fp" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-fp)" />
          </svg>
        </div>

        {/* Nav */}
        <div className="relative px-6 py-4 max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-white text-base">Second Line Capital</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to score
          </button>
        </div>

        {/* Hero text */}
        <div className="relative max-w-5xl mx-auto px-6 pt-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
          >
            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            Lenders ready to review your application
          </div>
          <h1 className="text-4xl font-black text-white mb-3" style={{ letterSpacing: '-0.5px' }}>
            Your Funding Partners
          </h1>
          <p className="text-white/65 max-w-lg mx-auto">
            Based on your Second Line Score, these lenders are ready to make a decision within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10 pb-16 animate-fade-in">

        {/* ── Lender cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {LENDERS.map((lender) => (
            <div
              key={lender.name}
              className="bg-white rounded-3xl card-shadow overflow-hidden flex flex-col transition-all hover:card-shadow-md"
              style={lender.highlight ? { outline: '2px solid ' + lender.accent } : {}}
            >
              {/* Card top color bar */}
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${lender.accent}, ${lender.accent}99)` }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Badge + icon */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: lender.badgeBg }}
                  >
                    {lender.badge}
                  </div>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: lender.bg }}
                  >
                    {lender.icon}
                  </div>
                </div>

                {/* Type */}
                <div
                  className="inline-self-start px-2.5 py-1 rounded-full text-xs font-bold mb-2 self-start"
                  style={{ backgroundColor: lender.bg, color: lender.accent }}
                >
                  {lender.type}
                </div>

                {/* Name + range */}
                <h3 className="font-black text-base mb-1 text-gray-900 leading-tight">{lender.name}</h3>
                <div className="text-sm font-bold mb-2" style={{ color: lender.accent }}>{lender.range}</div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{lender.description}</p>

                {/* Feature bullets */}
                <ul className="space-y-1.5 mb-6">
                  {lender.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: lender.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className="block w-full text-center py-3 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={lender.highlight
                    ? { background: `linear-gradient(135deg, ${lender.accent}, #1B9E7A)`, color: 'white', boxShadow: '0 4px 12px rgba(15,110,86,0.3)' }
                    : { backgroundColor: '#F3F4F6', color: '#374151' }}
                >
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Revenue-based repayment explainer ─────────────── */}
        <div className="rounded-3xl p-8 mb-5" style={{ background: 'linear-gradient(135deg, #E1F5EE, #D4F0E4)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'white' }}>💸</div>
            <div>
              <h2 className="font-black text-lg" style={{ color: '#0F6E56' }}>How Revenue-Based Repayment Works</h2>
              <p className="text-xs text-gray-500">No fixed monthly payment — ever</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-6 leading-relaxed max-w-2xl">
            You repay 5–8% of your daily POS receipts, automatically swept until the loan is repaid. The amount adjusts to your actual revenue — so slow weeks stay manageable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REPAYMENT_EXAMPLES.map((ex) => (
              <div key={ex.label} className="bg-white rounded-2xl p-5 card-shadow">
                <div className="text-2xl mb-2">{ex.icon}</div>
                <div className="text-xs text-gray-500 font-medium mb-0.5">{ex.label}</div>
                <div className="text-xs text-gray-400 mb-2">{ex.revenue}</div>
                <div className="text-base font-black" style={{ color: '#0F6E56' }}>{ex.payment}</div>
                <div className="text-xs text-gray-400 mt-0.5">{ex.note}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
            <span>🌀</span>
            Repayment capped at 1.4× principal. Hurricane or disaster? Automatic forbearance — no collections until revenue stabilizes.
          </p>
        </div>

        {/* ── Action plan ───────────────────────────────────── */}
        <div className="bg-white rounded-3xl card-shadow p-8 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: '#E1F5EE' }}>🗺️</div>
            <h2 className="font-black text-xl text-gray-900">Your Action Plan</h2>
          </div>
          <ol className="space-y-5">
            {scoreData.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
                >
                  {i + 1}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm pt-2">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Score improvements ────────────────────────────── */}
        <div className="rounded-3xl p-8 mb-10" style={{ background: 'linear-gradient(135deg, #FFF8E1, #FFF3CD)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'white' }}>📈</div>
            <div>
              <h2 className="font-black text-lg" style={{ color: '#C49A22' }}>Improve Your Score</h2>
              <p className="text-xs text-gray-500">These changes could raise your score by 10–15 points</p>
            </div>
          </div>
          <ul className="space-y-3.5">
            {scoreData.improvements.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                  style={{ backgroundColor: '#C49A22' }}
                >
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Start over */}
        <div className="text-center">
          <button
            onClick={onStartOver}
            className="px-8 py-3.5 rounded-2xl border-2 font-semibold text-sm transition-all hover:scale-[1.02]"
            style={{ borderColor: '#0F6E56', color: '#0F6E56' }}
          >
            ← Score a Different Business
          </button>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center py-6">
        <p className="text-xs text-gray-400">
          © 2026 Second Line Capital · Powered by{' '}
          <span className="font-semibold" style={{ color: '#0F6E56' }}>Claude AI</span>
        </p>
      </div>
    </div>
  )
}
