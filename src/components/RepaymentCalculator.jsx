import { useState } from 'react'

function formatCurrency(n) {
  if (n >= 1000) return '$' + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K'
  return '$' + Math.round(n)
}

function formatFull(n) {
  return '$' + Math.round(n).toLocaleString()
}

export default function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(20000)
  const [weeklyRevenue, setWeeklyRevenue] = useState(4000)
  const [holdback, setHoldback] = useState(6)

  const repaymentCap = loanAmount * 1.4
  const normalPayment = weeklyRevenue * (holdback / 100)
  const slowPayment = weeklyRevenue * 0.5 * (holdback / 100)
  const jazzFestPayment = weeklyRevenue * 2.25 * (holdback / 100)

  const weeksNormal = Math.ceil(repaymentCap / normalPayment)
  const weeksJazzFest = Math.ceil(repaymentCap / jazzFestPayment)
  const monthsNormal = (weeksNormal / 4.33).toFixed(0)

  const loanPct = ((loanAmount - 5000) / (50000 - 5000)) * 100
  const revPct = ((weeklyRevenue - 500) / (20000 - 500)) * 100

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ backgroundColor: '#FFF8E1', color: '#C49A22' }}>
            <span>💸</span> Revenue-Based Repayment Calculator
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A1A1A' }}>
            See exactly what you'd repay
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            No fixed payment. You repay a percentage of what you actually make — fast in a good week, slow in a bad one.
          </p>
        </div>

        <div className="rounded-3xl p-8" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Loan Amount</label>
                <span className="text-sm font-extrabold" style={{ color: '#0F6E56' }}>{formatFull(loanAmount)}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={5000}
                  max={50000}
                  step={1000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #0F6E56 ${loanPct}%, #E1F5EE ${loanPct}%)`,
                    accentColor: '#0F6E56',
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$5,000</span><span>$50,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Avg. Weekly POS Revenue</label>
                <span className="text-sm font-extrabold" style={{ color: '#0F6E56' }}>{formatFull(weeklyRevenue)}/wk</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={250}
                  value={weeklyRevenue}
                  onChange={(e) => setWeeklyRevenue(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #0F6E56 ${revPct}%, #E1F5EE ${revPct}%)`,
                    accentColor: '#0F6E56',
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$500</span><span>$20,000</span>
              </div>
            </div>
          </div>

          {/* Holdback selector */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm font-semibold text-gray-700">Holdback rate:</span>
            <div className="flex gap-2">
              {[5, 6, 7, 8].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setHoldback(rate)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={holdback === rate
                    ? { backgroundColor: '#0F6E56', color: 'white' }
                    : { backgroundColor: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-1">of daily POS receipts</span>
          </div>

          {/* Summary result */}
          <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-6"
            style={{ border: '2px solid #0F6E56' }}>
            <div className="text-center flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Normal week payment</div>
              <div className="text-4xl font-extrabold" style={{ color: '#0F6E56' }}>
                {formatFull(normalPayment)}
                <span className="text-base font-medium text-gray-400">/week</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-100 hidden sm:block" />
            <div className="text-center flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estimated payoff</div>
              <div className="text-4xl font-extrabold" style={{ color: '#1A1A1A' }}>
                ~{monthsNormal}
                <span className="text-base font-medium text-gray-400"> months</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-100 hidden sm:block" />
            <div className="text-center flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total repaid (1.4× cap)</div>
              <div className="text-4xl font-extrabold" style={{ color: '#C49A22' }}>
                {formatFull(repaymentCap)}
              </div>
            </div>
          </div>

          {/* Scenario cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ScenarioCard
              emoji="🐌"
              label="Slow August"
              sublabel="50% of normal revenue"
              revenue={weeklyRevenue * 0.5}
              payment={slowPayment}
              note="Small payment, no default risk"
              color="#6b7280"
              bg="#f9fafb"
            />
            <ScenarioCard
              emoji="📅"
              label="Normal Week"
              sublabel="Your average revenue"
              revenue={weeklyRevenue}
              payment={normalPayment}
              note={`Clears in ~${weeksNormal} weeks`}
              color="#0F6E56"
              bg="#E1F5EE"
              highlight
            />
            <ScenarioCard
              emoji="🎺"
              label="Jazz Fest Week"
              sublabel="225% of normal revenue"
              revenue={weeklyRevenue * 2.25}
              payment={jazzFestPayment}
              note={`Pay off ${weeksNormal - weeksJazzFest}+ weeks faster`}
              color="#C49A22"
              bg="#FFF8E1"
            />
          </div>

          <p className="text-xs text-gray-400 text-center mt-5">
            Hurricane or declared disaster? Automatic forbearance activates — collections pause until your revenue signals confirm recovery.
          </p>
        </div>
      </div>
    </section>
  )
}

function ScenarioCard({ emoji, label, sublabel, revenue, payment, note, color, bg, highlight }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: bg,
        outline: highlight ? `2px solid ${color}` : 'none',
      }}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="font-bold text-sm mb-0.5" style={{ color: '#1A1A1A' }}>{label}</div>
      <div className="text-xs text-gray-400 mb-3">{sublabel}</div>
      <div className="text-xs text-gray-500 mb-1">Revenue: <span className="font-semibold text-gray-700">${Math.round(revenue).toLocaleString()}/wk</span></div>
      <div className="text-2xl font-extrabold mb-1" style={{ color }}>
        ${Math.round(payment).toLocaleString()}
        <span className="text-sm font-normal text-gray-400">/wk</span>
      </div>
      <div className="text-xs font-medium" style={{ color }}>{note}</div>
    </div>
  )
}
