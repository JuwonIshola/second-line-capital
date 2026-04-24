import RepaymentCalculator from './RepaymentCalculator'
import BankingDesertMap from './BankingDesertMap'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'

/* ── Floating score-preview card shown in the hero ────────── */
function HeroScoreCard() {
  const circumference = 2 * Math.PI * 42
  const score = 81
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative animate-float">
      {/* Glow halo */}
      <div
        className="absolute -inset-6 rounded-[2.5rem] pointer-events-none animate-glow"
        style={{ background: 'radial-gradient(circle, rgba(196,154,34,0.25) 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative bg-white rounded-3xl card-shadow-lg overflow-hidden w-[300px] sm:w-[320px]">
        {/* Card header bar */}
        <div
          className="px-5 py-3 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #062E22, #0F6E56)' }}
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
            </svg>
          </div>
          <span className="text-xs font-bold text-white/90 tracking-wide">SECOND LINE CAPITAL</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60">Live</span>
          </div>
        </div>

        {/* Business row */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: '#E1F5EE' }}
          >
            🍲
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900">Ms. Chanel's Kitchen</div>
            <div className="text-xs text-gray-400">Creole Food Truck · New Orleans</div>
          </div>
        </div>

        {/* Score ring */}
        <div className="px-5 pt-2 pb-3 flex flex-col items-center">
          <div className="relative">
            <svg width="104" height="104" className="rotate-[-90deg]">
              <circle cx="52" cy="52" r="42" fill="none" stroke="#E1F5EE" strokeWidth="9" />
              <circle
                cx="52" cy="52" r="42" fill="none"
                stroke="#0F6E56" strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black" style={{ color: '#0F6E56' }}>81</span>
              <span className="text-xs text-gray-400 font-medium">/100</span>
            </div>
          </div>

          <div
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0F6E56' }} />
            Good Standing
          </div>
        </div>

        {/* Mini breakdown */}
        <div className="px-5 pb-4 space-y-2">
          {[
            { label: 'Revenue Consistency', pct: 83 },
            { label: 'Customer Loyalty', pct: 87 },
            { label: 'Seasonality', pct: 80 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{item.label}</span>
                <span className="font-semibold" style={{ color: '#0F6E56' }}>{item.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E1F5EE' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.pct}%`, backgroundColor: '#0F6E56' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Loan offer strip */}
        <div className="mx-4 mb-4 rounded-2xl p-3 text-center" style={{ backgroundColor: '#FFF8E1' }}>
          <div className="text-xs text-gray-500 mb-0.5">Pre-qualified for up to</div>
          <div className="text-2xl font-black" style={{ color: '#C49A22' }}>$30,000</div>
          <div className="text-xs text-gray-400">Decision in 24 hours · No collateral required</div>
        </div>
      </div>

      {/* Floating CDFI badge */}
      <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl card-shadow px-3 py-2 flex items-center gap-2 border border-gray-100">
        <span className="text-lg">🎺</span>
        <div>
          <div className="text-xs font-bold text-gray-900">CDFI Partners</div>
          <div className="text-xs text-gray-400">TruFund · New Corp</div>
        </div>
      </div>
    </div>
  )
}

/* ── How-it-works step icons ──────────────────────────────── */
const HOW_IT_WORKS = [
  {
    step: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Tell us about your business',
    desc: 'Answer 7 quick questions about your POS system, revenue history, and community presence. Takes 3 minutes.',
  },
  {
    step: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'AI scores five dimensions',
    desc: 'Revenue consistency, growth, seasonality, customer loyalty, fixed cost coverage — everything FICO ignores.',
  },
  {
    step: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Get funded in 24 hours',
    desc: 'See your score and loan amount, then connect to TruFund or New Corp Inc. — New Orleans CDFIs with same-week funding.',
  },
]

export default function LandingPage({ onGetScore, onDemoMode, onNavigate }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentScreen="landing" onNavigate={onNavigate} onGetScore={onGetScore} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <main
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #062E22 0%, #0F6E56 55%, #1B9E7A 100%)' }}
      >
        {/* Decorative background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #C49A22, transparent)' }}
          />
          <div
            className="absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white, transparent)' }}
          />
          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left column */}
            <div className="animate-fade-in">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block animate-pulse"
                  style={{ backgroundColor: '#C49A22' }}
                />
                AI-Powered Micro-Lending · New Orleans
              </div>

              <h1
                className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white"
                style={{ letterSpacing: '-1.5px' }}
              >
                Banks won't lend to a{' '}
                <span style={{ color: '#C49A22' }}>brass band.</span>
                <br />We will.
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
                $5,000–$50,000 loans for New Orleans restaurants and food trucks.
                No credit score. No collateral. Decision in 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={onGetScore}
                  className="px-8 py-4 rounded-2xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-95"
                  style={{ backgroundColor: '#C49A22' }}
                >
                  Get Your Second Line Score →
                </button>
                <button
                  onClick={onDemoMode}
                  className="px-8 py-4 rounded-2xl font-bold text-base border border-white/30 text-white hover:bg-white/10"
                >
                  See Demo Score
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-6 text-white/50 text-xs font-medium">
                <TrustItem icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                } label="256-bit SSL Encrypted" />
                <TrustItem icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                } label="CDFI Certified Partners" />
                <TrustItem icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                } label="Decision in 24 Hours" />
              </div>
            </div>

            {/* Right column: floating card */}
            <div className="hidden lg:flex justify-center items-center animate-slide-right">
              <HeroScoreCard />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </main>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <StatCard number="4,200+" label="NOLA restaurants & food trucks underserved by traditional banks" color="#0F6E56" />
          <StatCard number="$87B" label="Annual credit gap for underbanked small businesses nationwide" color="#C49A22" />
          <StatCard number="39%" label="Higher loan denial rate for Black-owned vs. white-owned businesses" color="#0F6E56" />
        </div>
      </section>

      {/* ── Banking desert map ─────────────────────────────────── */}
      <BankingDesertMap />

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F8FAFB' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
            >
              Simple · Transparent · Fast
            </div>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#111827' }}>How it works</h2>
            <p className="text-lg text-gray-500">From your POS data to a funded loan in three steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-8 card-shadow hover:card-shadow-md transition-all group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
                >
                  {item.icon}
                </div>
                <div className="text-xs font-black text-gray-200 mb-2 tracking-widest">{item.step}</div>
                <h3 className="font-bold text-lg mb-3" style={{ color: '#111827' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('about-score')}
              className="text-sm font-semibold hover:underline underline-offset-2 transition-colors"
              style={{ color: '#0F6E56' }}
            >
              Read the full scoring methodology →
            </button>
          </div>
        </div>
      </section>

      {/* ── Repayment calculator ───────────────────────────────── */}
      <RepaymentCalculator />

      {/* ── Testimonial ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
            style={{ backgroundColor: '#F8FAFB' }}
          >
            {/* Decorative quote mark */}
            <div className="absolute top-4 left-6 text-[120px] font-black text-gray-100 leading-none select-none pointer-events-none">
              "
            </div>

            <div className="relative">
              {/* Avatar + info */}
              <div className="flex items-center gap-4 mb-8">
                <img
                  src="https://picsum.photos/seed/chanel-nola/80/80"
                  alt="Ms. Chanel"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white card-shadow"
                />
                <div>
                  <div className="font-bold text-gray-900">Ms. Chanel</div>
                  <div className="text-sm text-gray-500">Creole Food Truck · St. Claude Ave, New Orleans</div>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">50+ Google reviews</span>
                  </div>
                </div>
              </div>

              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800 mb-6">
                "There is a Creole food truck on St. Claude Avenue that has been open for four years. She does $5,000 a week through Square, is fully booked through every Jazz Fest and Mardi Gras, and has a loyal neighborhood following. Two banks turned her down for a $15,000 loan — not because the business is failing, but because a FICO score cannot see any of it."
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ backgroundColor: '#E1F5EE' }} />
                <p className="text-base font-semibold" style={{ color: '#0F6E56' }}>
                  Second Line Capital can see it — and so can our CDFI partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #062E22 0%, #0F6E56 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #C49A22, transparent)' }}
          />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Free · No commitment · Takes 3 minutes
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-1px' }}>
            Ready to get your score?
          </h2>
          <p className="text-xl text-white/65 mb-10">
            See exactly what you qualify for. No FICO score needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetScore}
              className="px-10 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-95"
              style={{ backgroundColor: '#C49A22', color: 'white' }}
            >
              Get Your Second Line Score →
            </button>
            <button
              onClick={onDemoMode}
              className="px-10 py-4 rounded-2xl font-bold text-base border border-white/30 text-white hover:bg-white/10"
            >
              View Demo First
            </button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}

function StatCard({ number, label, color }) {
  return (
    <div className="text-center px-6 py-4">
      <div className="text-4xl font-black mb-2" style={{ color }}>{number}</div>
      <div className="text-sm text-gray-500 leading-snug">{label}</div>
    </div>
  )
}

function TrustItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/60">{icon}</span>
      {label}
    </div>
  )
}
