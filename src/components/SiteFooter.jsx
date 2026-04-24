export default function SiteFooter({ onNavigate }) {
  return (
    <footer style={{ backgroundColor: '#0A1F1A' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
                </svg>
              </div>
              <div>
                <div className="font-black text-lg text-white tracking-tight">Second Line Capital</div>
                <div className="text-xs text-white/40 font-semibold tracking-widest">MICRO-LENDING · NEW ORLEANS</div>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              AI-powered micro-lending for New Orleans small businesses. $5,000–$50,000 in 24 hours. No credit score. No collateral.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <TrustBadge icon="🔒" label="256-bit SSL" />
              <TrustBadge icon="🏛️" label="CDFI Partners" />
              <TrustBadge icon="🤖" label="Claude AI" />
            </div>

            <div className="mt-5 text-xs text-white/30">
              Built for the Freeman AI Innovation Challenge
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-bold text-white/40 mb-5 tracking-widest uppercase">Platform</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Get Your Score', screen: 'form' },
                { label: 'About the Score', screen: 'about-score' },
                { label: 'How It Works', screen: 'landing' },
                { label: 'FAQ', screen: 'faq' },
              ].map((item) => (
                <li key={item.screen}>
                  <button
                    onClick={() => onNavigate(item.screen)}
                    className="text-sm text-white/50 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold text-white/40 mb-5 tracking-widest uppercase">Company</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'About Us', screen: 'about' },
                { label: 'Our Partners', screen: 'about' },
                { label: 'Savor the City NOLA', screen: 'about' },
                { label: 'Investor Info', screen: 'about' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(item.screen)}
                    className="text-sm text-white/50 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 text-center sm:text-left">
            © 2026 Second Line Capital. For demonstration purposes only. Not financial advice.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function TrustBadge({ icon, label }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <span>{icon}</span>
      {label}
    </div>
  )
}
