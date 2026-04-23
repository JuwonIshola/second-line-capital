export default function SiteFooter({ onNavigate }) {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F6E56' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-lg" style={{ color: '#0F6E56' }}>Second Line Capital</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI-powered micro-lending for New Orleans small businesses. $5,000–$50,000 in 24 hours. No credit score. No collateral.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-400">
              <span>Powered by</span>
              <span className="font-semibold" style={{ color: '#0F6E56' }}>Claude AI</span>
              <span>·</span>
              <span>Built for the Freeman AI Innovation Challenge</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: 'Get Your Score', screen: 'form' },
                { label: 'About the Score', screen: 'about-score' },
                { label: 'How It Works', screen: 'landing' },
                { label: 'FAQ', screen: 'faq' },
              ].map((item) => (
                <li key={item.screen}>
                  <button
                    onClick={() => onNavigate(item.screen)}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', screen: 'about' },
                { label: 'Our Partners', screen: 'about' },
                { label: 'Savor the City NOLA', screen: 'about' },
                { label: 'Investor Info', screen: 'about' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(item.screen)}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2026 Second Line Capital. For demonstration purposes only. Not financial advice.</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
