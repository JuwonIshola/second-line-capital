import Navbar from './Navbar'
import SiteFooter from './SiteFooter'

const DIMENSIONS = [
  {
    key: 'Revenue Consistency',
    weight: '35%',
    color: '#0F6E56',
    bg: '#E1F5EE',
    icon: '📊',
    logic: 'Stability across 18 months, not peak size. A steady $3K/week outscores a volatile $8K/week — because consistent revenue is what repays a loan.',
  },
  {
    key: 'Revenue Trajectory',
    weight: '20%',
    color: '#0F6E56',
    bg: '#E1F5EE',
    icon: '📈',
    logic: 'Rolling 90-day trend. Momentum matters more than a single strong month. A business on an upward curve is a better bet than one declining from a past peak.',
  },
  {
    key: 'Seasonality Predictability',
    weight: '20%',
    color: '#C49A22',
    bg: '#FFF8E1',
    icon: '🗓️',
    logic: 'Predictable dips (slow August, post-Mardi Gras) are manageable — we build them into the repayment model. Unpredictable volatility is the real risk signal.',
  },
  {
    key: 'Customer Loyalty Depth',
    weight: '15%',
    color: '#C49A22',
    bg: '#FFF8E1',
    icon: '⭐',
    logic: 'Repeat rate, review velocity, social consistency. A loyal customer base recovers from shocks — hurricanes, slow seasons, temporary closures.',
  },
  {
    key: 'Fixed Cost Coverage',
    weight: '10%',
    color: '#6b7280',
    bg: '#f3f4f6',
    icon: '🏠',
    logic: 'Ratio of consistent revenue to known fixed obligations — rent, utilities, suppliers. A business comfortably covering its fixed costs can absorb a loan payment.',
  },
]

const DATA_SOURCES = [
  { source: 'POS Transactions (Square / Toast / Stripe)', captures: 'Revenue consistency, volume trend, return rate', why: 'Direct measure of repayment capacity — invisible to FICO for cash-heavy operators' },
  { source: 'Google & Yelp Sentiment (NLP)', captures: 'Customer satisfaction trend over 90 days', why: 'Declining sentiment predicts revenue decline 3–4 months ahead — a leading indicator no credit bureau tracks' },
  { source: 'Social Media Engagement', captures: 'Loyalty depth, community reach, growth momentum', why: 'Predicts recovery capacity after a flood, slow season, or difficult month' },
  { source: 'Event Booking Calendar', captures: 'Confirmed forward revenue pipeline', why: 'Converts future earnings into present creditworthiness — critical for musicians and caterers' },
  { source: 'Uploaded Documents', captures: 'Bank statements, tax returns, POS exports', why: 'Direct financial evidence that significantly improves scoring accuracy and loan amount' },
]

const COMPARISON = [
  { factor: 'Credit history required', fico: '✗ Required', second: '✓ Not required' },
  { factor: 'Collateral required', fico: '✗ Often required', second: '✓ Never required' },
  { factor: 'Cash revenue visibility', fico: '✗ Invisible', second: '✓ Core input' },
  { factor: 'Seasonal business support', fico: '✗ Penalizes gaps', second: '✓ Models seasonality' },
  { factor: 'Decision time', fico: '✗ 2–6 weeks', second: '✓ 24 hours' },
  { factor: 'Community trust signals', fico: '✗ Not considered', second: '✓ Weighted 15%' },
  { factor: 'Disaster forbearance', fico: '✗ Manual process', second: '✓ Automatic' },
]

export default function AboutScore({ onNavigate, onGetScore }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentScreen="about-score" onNavigate={onNavigate} onGetScore={onGetScore} />

      {/* Hero */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: '#E1F5EE' }}>
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'white', color: '#0F6E56' }}>
            <span>🧠</span> AI Scoring Methodology
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#1A1A1A', letterSpacing: '-1px' }}>
            The Second Line Score
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            A 0–100 score built from the signals that actually predict whether a New Orleans small business will repay a loan — none of which appear in a FICO score.
          </p>
        </div>
      </section>

      {/* Five dimensions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A1A1A' }}>Five dimensions. One score.</h2>
            <p className="text-gray-500">Each dimension is weighted by its predictive power for loan repayment.</p>
          </div>

          <div className="space-y-4">
            {DIMENSIONS.map((d) => (
              <div key={d.key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-5 items-start">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-3xl">{d.icon}</span>
                  <div
                    className="px-4 py-2 rounded-xl text-center min-w-[64px]"
                    style={{ backgroundColor: d.bg }}
                  >
                    <div className="text-xl font-extrabold" style={{ color: d.color }}>{d.weight}</div>
                    <div className="text-xs text-gray-500">weight</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>{d.key}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{d.logic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier table */}
      <section className="py-12 px-6" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1A1A1A' }}>Score tiers & loan amounts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { tier: 'Excellent', range: '80–100', loan: 'Up to $50,000', color: '#C49A22', bg: '#FFF8E1' },
              { tier: 'Good', range: '65–79', loan: 'Up to $35,000', color: '#0F6E56', bg: '#E1F5EE' },
              { tier: 'Fair', range: '50–64', loan: 'Up to $20,000', color: '#E65100', bg: '#FFF3E0' },
              { tier: 'Building', range: '< 50', loan: 'Grant pathway', color: '#6A1B9A', bg: '#F3E5F5' },
            ].map((t) => (
              <div key={t.tier} className="rounded-2xl p-5 text-center" style={{ backgroundColor: t.bg }}>
                <div className="font-extrabold text-lg mb-1" style={{ color: t.color }}>{t.tier}</div>
                <div className="text-sm font-semibold text-gray-700 mb-2">{t.range}</div>
                <div className="text-xs text-gray-500">{t.loan}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1A1A1A' }}>What data we use</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Data Source</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">What It Captures</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Why It Predicts Repayment</th>
                </tr>
              </thead>
              <tbody>
                {DATA_SOURCES.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-800">{row.source}</td>
                    <td className="px-6 py-4 text-gray-600">{row.captures}</td>
                    <td className="px-6 py-4 text-gray-500">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Second Line vs FICO */}
      <section className="py-16 px-6" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: '#1A1A1A' }}>Second Line Score vs. FICO</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">FICO was built for salaried employees with credit cards. The Second Line Score was built for New Orleans.</p>
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 text-sm font-semibold" style={{ backgroundColor: '#1A1A1A', color: 'white' }}>
              <div className="px-5 py-3">Factor</div>
              <div className="px-5 py-3 text-center">FICO Score</div>
              <div className="px-5 py-3 text-center" style={{ color: '#6EE7B7' }}>Second Line Score</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="px-5 py-3 text-gray-700 font-medium">{row.factor}</div>
                <div className="px-5 py-3 text-center text-red-500">{row.fico}</div>
                <div className="px-5 py-3 text-center font-semibold" style={{ color: '#0F6E56' }}>{row.second}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model governance */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1A1A1A' }}>Model governance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: '🔄', title: 'Monthly retraining', desc: 'Model retrains on a rolling 24-month window. What it learned last year updates with what it learns this month.' },
              { icon: '⚖️', title: 'Quarterly bias audits', desc: 'Demographic Parity and Equal Opportunity checks every quarter. Documented remediation if disparities are found.' },
              { icon: '👁️', title: 'Human review band', desc: 'Scores 55–65 go to a credit analyst before approval. Every override is logged for compliance and model improvement.' },
              { icon: '🛡️', title: 'Self-correcting risk', desc: 'If default rates exceed 12% for two consecutive months, the model automatically raises its minimum score threshold.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: '#1A1A1A' }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: '#E1F5EE' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A1A1A' }}>See your score in 3 minutes</h2>
        <p className="text-gray-600 mb-8">Answer 7 questions and our AI generates your full Second Line Score — free, no commitment.</p>
        <button
          onClick={onGetScore}
          className="px-10 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: '#0F6E56' }}
        >
          Get Your Second Line Score →
        </button>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}
