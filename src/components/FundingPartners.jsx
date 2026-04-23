const LENDERS = [
  {
    name: 'TruFund Financial Services',
    shortName: 'TruFund',
    type: 'CDFI',
    typeBg: '#E1F5EE',
    typeColor: '#0F6E56',
    range: '$5,000 – $50,000',
    description: 'New Orleans CDFI and Second Line Capital originating partner — serving underbanked Louisiana entrepreneurs with fast, fair lending.',
    icon: '🏛️',
    highlight: true,
  },
  {
    name: 'New Corp Inc.',
    shortName: 'New Corp',
    type: 'CDFI',
    typeBg: '#E1F5EE',
    typeColor: '#0F6E56',
    range: '$5,000 – $50,000',
    description: 'Community development lender focused on economic equity in New Orleans neighborhoods — a Second Line Capital originating partner.',
    icon: '🌿',
    highlight: true,
  },
  {
    name: 'Accion Opportunity Fund',
    shortName: 'Accion',
    type: 'Micro-lender',
    typeBg: '#F3E5F5',
    typeColor: '#6A1B9A',
    range: '$5,000 – $100,000',
    description: 'Mission-driven lending for underserved business owners nationwide — available when local CDFI capacity is full.',
    icon: '🤝',
    highlight: false,
  },
]

export default function FundingPartners({ scoreData, onStartOver, onBack }) {
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
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">
            ← Back to score
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-3" style={{ color: '#1A1A1A' }}>Your Funding Partners</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Based on your Second Line Score, here are the lenders ready to review your application — decisions in 24 hours.
          </p>
        </div>

        {/* Lender cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {LENDERS.map((lender) => (
            <div
              key={lender.name}
              className="bg-white rounded-2xl shadow-sm p-6 flex flex-col"
              style={lender.highlight ? { outline: '2px solid #0F6E56' } : {}}
            >
              {lender.highlight && (
                <div className="text-xs font-bold mb-3 px-2 py-1 rounded-full self-start"
                  style={{ backgroundColor: '#0F6E56', color: 'white' }}>
                  Preferred Partner
                </div>
              )}
              <div className="text-3xl mb-3">{lender.icon}</div>
              <div
                className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ backgroundColor: lender.typeBg, color: lender.typeColor }}
              >
                {lender.type}
              </div>
              <h3 className="font-bold text-base mb-1 leading-snug" style={{ color: '#1A1A1A' }}>
                {lender.name}
              </h3>
              <div className="text-sm font-semibold mb-2" style={{ color: '#0F6E56' }}>
                {lender.range}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">{lender.description}</p>
              <a
                href="#"
                className="block text-center py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={lender.highlight
                  ? { backgroundColor: '#0F6E56', color: 'white' }
                  : { backgroundColor: '#f3f4f6', color: '#374151' }}
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>

        {/* How repayment works */}
        <div className="rounded-3xl p-8 mb-6" style={{ backgroundColor: '#E1F5EE' }}>
          <h2 className="font-bold text-lg mb-2" style={{ color: '#0F6E56' }}>
            💸 How Revenue-Based Repayment Works
          </h2>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            No fixed monthly payment. You repay 5–8% of your daily POS receipts, automatically swept until the loan is repaid. The amount adjusts to your actual revenue.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Normal week ($4K POS)', payment: '~$240/week', note: '6% holdback' },
              { label: 'Jazz Fest week ($9K POS)', payment: '~$540/week', note: 'Pay off faster' },
              { label: 'Slow August ($2K POS)', payment: '~$120/week', note: 'No default risk' },
            ].map((ex) => (
              <div key={ex.label} className="bg-white rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">{ex.label}</div>
                <div className="font-bold text-base" style={{ color: '#0F6E56' }}>{ex.payment}</div>
                <div className="text-xs text-gray-400">{ex.note}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Repayment capped at 1.4× principal. Hurricane or disaster? Automatic forbearance activates — no collections until revenue stabilizes.
          </p>
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <h2 className="font-bold text-xl mb-6" style={{ color: '#1A1A1A' }}>
            🗺️ Your Action Plan
          </h2>
          <ol className="space-y-5">
            {scoreData.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: '#0F6E56' }}
                >
                  {i + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Improve Your Score */}
        <div className="rounded-3xl p-8 mb-10" style={{ backgroundColor: '#FFF8E1' }}>
          <h2 className="font-bold text-xl mb-2" style={{ color: '#C49A22' }}>
            📈 Improve Your Score
          </h2>
          <p className="text-sm text-gray-600 mb-5">These changes could raise your score by 10–15 points:</p>
          <ul className="space-y-3">
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
            className="px-8 py-3 rounded-xl border-2 font-semibold transition-colors"
            style={{ borderColor: '#0F6E56', color: '#0F6E56' }}
          >
            ← Score a Different Business
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400">
          © 2026 Second Line Capital · Powered by{' '}
          <span className="font-semibold" style={{ color: '#0F6E56' }}>Claude AI</span>
        </p>
      </div>
    </div>
  )
}
