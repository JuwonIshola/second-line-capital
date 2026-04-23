import Navbar from './Navbar'
import SiteFooter from './SiteFooter'

const PARTNERS = [
  {
    name: 'TruFund Financial Services',
    role: 'Originating CDFI Partner',
    desc: 'New Orleans-based CDFI providing originating lender infrastructure and regulatory compliance for Second Line Capital loan products.',
    icon: '🏛️',
    color: '#0F6E56',
    bg: '#E1F5EE',
  },
  {
    name: 'New Corp Inc.',
    role: 'Originating CDFI Partner',
    desc: 'Community development lender focused on economic equity across New Orleans neighborhoods.',
    icon: '🌿',
    color: '#0F6E56',
    bg: '#E1F5EE',
  },
  {
    name: 'Savor the City NOLA',
    role: 'Grant Pool & Lead Channel',
    desc: 'Food festival at Broadside NOLA where 100% of proceeds fund stabilization grants of $2,000–$10,000 for independent restaurants in crisis.',
    icon: '🎺',
    color: '#C49A22',
    bg: '#FFF8E1',
  },
  {
    name: 'BoodleBox',
    role: 'AI Operations Platform',
    desc: 'NLP orchestration layer powering borrower communications, underwriting explanations, and monthly investor reports.',
    icon: '🤖',
    color: '#6A1B9A',
    bg: '#F3E5F5',
  },
  {
    name: 'SBA Microloan Program',
    role: 'Capital Partner',
    desc: 'SBA 1% facility providing low-cost capital to complement CDFI grants and Reg CF community notes in the loan pool.',
    icon: '🇺🇸',
    color: '#1e40af',
    bg: '#EFF6FF',
  },
  {
    name: 'Accion Opportunity Fund',
    role: 'National Micro-lender',
    desc: 'Mission-driven national lender available when local CDFI capacity is full — ensuring no qualified borrower is turned away.',
    icon: '🤝',
    color: '#6A1B9A',
    bg: '#F3E5F5',
  },
]

const TIMELINE = [
  { phase: 'Now', label: 'Prototype Launch', desc: 'AI scoring demo live. Savor the City grant pool operational. CDFI partnership term sheets in negotiation.' },
  { phase: 'Q3 2026', label: 'Regulation CF Filing', desc: 'FINRA review and escrow setup complete. New Orleans residents can invest as little as $100 at 6–9% target yield.' },
  { phase: 'Year 1', label: '75 Loans Funded', desc: '$1.5M in originations. 75 New Orleans restaurants and food trucks funded. Model trains on real repayment data.' },
  { phase: 'Year 2', label: 'NOLA Full Market', desc: 'Expand beyond restaurants to all NOLA small business sectors. $4.6M in originations. 220 businesses.' },
  { phase: 'Year 3–4', label: 'Louisiana & Deep South', desc: 'Baton Rouge, Shreveport, Lafayette. Then Atlanta, Houston, Memphis. Second Line Score licensing begins.' },
  { phase: 'Year 5+', label: 'National Score Licensing', desc: '5,000+ loans. $30M AUM. Second Line Score licensed to CDFIs and community banks in 12 banking desert cities.' },
]

export default function AboutUs({ onNavigate, onGetScore }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentScreen="about" onNavigate={onNavigate} onGetScore={onGetScore} />

      {/* Hero */}
      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #0F6E56 0%, #0a4f3e 100%)' }}>
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-5xl mb-6">🎺</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ letterSpacing: '-1px' }}>
            Built for the Second Line
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            In New Orleans, the Second Line is the community that follows the band — the people who show up because they believe in something. This platform is the financial community showing up behind the entrepreneur.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
                Our Mission
              </div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
                Every denied loan is a piece of New Orleans that doesn't come back.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When a Tremé barbershop closes because it couldn't get a $10,000 bridge loan, or Ms. Chanel's Creole Kitchen turns down a catering contract because she can't front the supply cost — New Orleans loses cultural infrastructure it cannot replace.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The capital access gap is not an abstract inequality. It is actively dismantling what makes this city worth visiting. Second Line Capital exists to close that gap — one loan at a time, starting with the businesses that have always deserved one.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { number: '4,200+', label: 'target NOLA restaurants & food trucks', color: '#0F6E56', bg: '#E1F5EE' },
                { number: '39%', label: 'loan denial rate for Black-owned businesses', color: '#EF4444', bg: '#FEE2E2' },
                { number: '$87B', label: 'annual credit gap for underbanked US small businesses', color: '#C49A22', bg: '#FFF8E1' },
                { number: '24hrs', label: 'from application to loan decision', color: '#0F6E56', bg: '#E1F5EE' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: s.bg }}>
                  <div className="text-2xl font-extrabold flex-shrink-0" style={{ color: s.color }}>{s.number}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ms. Chanel story */}
      <section className="py-16 px-6" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-6">🍲</div>
          <blockquote className="text-xl font-medium leading-relaxed text-white mb-6">
            "There is a Creole food truck on St. Claude Avenue that has been open for four years. She does $5,000 a week through Square, is fully booked through every Jazz Fest and Mardi Gras, and has a loyal neighborhood following that leaves five-star reviews religiously. Two banks turned her down for a $15,000 loan."
          </blockquote>
          <p className="text-gray-400 mb-2">Not because the business is failing.</p>
          <p className="text-lg font-semibold" style={{ color: '#6EE7B7' }}>
            Because a FICO score cannot see any of it. Second Line Capital can.
          </p>
          <p className="text-sm text-gray-500 mt-6">
            Ms. Chanel's Creole Kitchen is not a hypothetical. She is the customer this platform was built for.
          </p>
        </div>
      </section>

      {/* Savor the City */}
      <section className="py-16 px-6" style={{ backgroundColor: '#FFF8E1' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-4xl mb-4">🍽️</div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A1A1A' }}>Savor the City NOLA</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A world-class New Orleans food festival at Broadside NOLA where <strong>100% of proceeds</strong> go directly to independent restaurants in crisis — as stabilization grants of $2,000–$10,000.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Savor the City is our warmest lead channel. Restaurants already in the network trust the ecosystem — no cold outreach required. Grant recipients who stabilize become natural loan candidates.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Grants of $2,000–$10,000 for restaurants in immediate crisis',
                  '100% of event proceeds go to the grant pool',
                  'Tax-deductible giving via 501(c)(3)',
                  'Grant-to-loan pipeline: stabilize first, then grow',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: '#C49A22' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-8 text-center" style={{ backgroundColor: 'white' }}>
              <div className="text-5xl mb-4">🎪</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1A1A' }}>Attend. Eat. Fund.</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Every ticket sold, every dish tasted, every dollar spent goes to a New Orleans restaurant fighting to stay open.
              </p>
              <div className="space-y-3 text-left text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Event</span>
                  <span className="font-semibold">Savor the City NOLA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Venue</span>
                  <span className="font-semibold">Broadside NOLA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Proceeds</span>
                  <span className="font-semibold" style={{ color: '#C49A22' }}>100% to restaurants</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax status</span>
                  <span className="font-semibold">501(c)(3) deductible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A1A1A' }}>Our partners</h2>
            <p className="text-gray-500">The organizations that make Second Line Capital possible.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {PARTNERS.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3">{p.icon}</div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: p.bg, color: p.color }}>
                  {p.role}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#1A1A1A' }}>{p.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-6" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A1A1A' }}>Roadmap</h2>
            <p className="text-gray-500 max-w-lg mx-auto">New Orleans is the proof point. The Second Line Score is what scales.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 hidden sm:flex"
                    style={{ backgroundColor: i === 0 ? '#0F6E56' : '#d1d5db', color: i === 0 ? 'white' : '#6b7280' }}>
                    {i + 1}
                  </div>
                  <div className="bg-white rounded-2xl p-5 flex-1 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{ backgroundColor: i === 0 ? '#E1F5EE' : '#f3f4f6', color: i === 0 ? '#0F6E56' : '#6b7280' }}>
                        {item.phase}
                      </span>
                      <span className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{item.label}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competition note */}
      <section className="py-10 px-6 text-center border-t border-gray-100">
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Second Line Capital was developed for the <strong className="text-gray-600">Freeman AI Innovation Challenge with BoodleBox</strong> at Tulane University Freeman School of Business, April 2026.
        </p>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}
