import RepaymentCalculator from './RepaymentCalculator'
import BankingDesertMap from './BankingDesertMap'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'

export default function LandingPage({ onGetScore, onDemoMode, onNavigate }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentScreen="landing" onNavigate={onNavigate} onGetScore={onGetScore} />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#0F6E56' }} />
            AI-Powered Micro-Lending · New Orleans
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
            style={{ color: '#1A1A1A', letterSpacing: '-1.5px' }}>
            Banks won't lend to a<br />
            <span style={{ color: '#0F6E56' }}>brass band.</span>{' '}
            <span style={{ color: '#C49A22' }}>We will.</span>
          </h1>

          <p className="text-xl text-gray-500 mb-4 max-w-xl mx-auto leading-relaxed">
            $5,000–$50,000 loans for New Orleans restaurants and food trucks. No credit score. No collateral. Decision in 24 hours.
          </p>
          <p className="text-base text-gray-400 mb-12 max-w-lg mx-auto">
            Repay as a percentage of daily POS revenue — automatically, with no fixed payment that can trigger default during a slow August.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetScore}
              className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#0F6E56' }}
            >
              Get Your Second Line Score →
            </button>
            <button
              onClick={onDemoMode}
              className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-colors"
              style={{ borderColor: '#C49A22', color: '#C49A22', backgroundColor: '#FFF8E1' }}
            >
              See Demo Score
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatCard number="4,200+" label="NOLA restaurants & food trucks underserved by traditional banks" color="#0F6E56" bg="#E1F5EE" />
            <StatCard number="$87B" label="annual credit gap for underbanked small businesses nationwide" color="#C49A22" bg="#FFF8E1" />
            <StatCard number="39%" label="loan denial rate for Black-owned businesses vs. 18% for white-owned" color="#0F6E56" bg="#E1F5EE" />
          </div>
        </div>
      </main>

      <BankingDesertMap />

      {/* How It Works */}
      <section className="py-16 px-6" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A1A1A' }}>How it works</h2>
          <p className="text-gray-500 mb-12">Three steps from your POS data to funded loan</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell us about your business',
                desc: 'Answer 7 quick questions about your POS system, revenue history, and community presence. Upload documents to strengthen your score.',
              },
              {
                step: '02',
                title: 'Our AI scores five dimensions',
                desc: 'The Second Line Score analyzes revenue consistency, growth trajectory, seasonality predictability, customer loyalty, and fixed cost coverage — everything FICO ignores.',
              },
              {
                step: '03',
                title: 'Get a loan offer in 24 hours',
                desc: 'See your score, your loan amount, and get connected to TruFund or New Corp Inc. — New Orleans CDFIs that partner with us for same-week funding.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm text-left">
                <div className="text-4xl font-black mb-4" style={{ color: '#E1F5EE' }}>{item.step}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1A1A' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('about-score')}
            className="mt-10 text-sm font-semibold underline underline-offset-2 transition-colors"
            style={{ color: '#0F6E56' }}
          >
            Read the full scoring methodology →
          </button>
        </div>
      </section>

      <RepaymentCalculator />

      {/* Ms. Chanel quote */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-6">🎺</div>
          <blockquote className="text-xl font-medium leading-relaxed mb-6" style={{ color: '#1A1A1A' }}>
            "There is a Creole food truck on St. Claude Avenue that has been open for four years. She does $5,000 a week through Square, is fully booked through every Jazz Fest and Mardi Gras, and has a loyal neighborhood following that leaves five-star reviews religiously. Two banks turned her down for a $15,000 loan."
          </blockquote>
          <p className="text-gray-500 text-sm mb-4">
            Not because the business is failing. Because a FICO score cannot see any of it.
          </p>
          <p className="font-semibold text-base" style={{ color: '#0F6E56' }}>Second Line Capital can.</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: '#0F6E56' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to get your score?</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Free, no commitment. Takes 3 minutes. See exactly what you qualify for.
          </p>
          <button
            onClick={onGetScore}
            className="px-10 py-4 rounded-xl font-semibold text-lg transition-transform hover:scale-105"
            style={{ backgroundColor: '#C49A22', color: 'white' }}
          >
            Get Your Second Line Score →
          </button>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}

function StatCard({ number, label, color, bg }) {
  return (
    <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: bg }}>
      <div className="text-3xl font-extrabold mb-1" style={{ color }}>{number}</div>
      <div className="text-sm text-gray-600 leading-snug">{label}</div>
    </div>
  )
}
