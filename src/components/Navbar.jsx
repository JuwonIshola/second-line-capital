import { useState } from 'react'

const LINKS = [
  { label: 'How It Works', screen: 'landing' },
  { label: 'About the Score', screen: 'about-score' },
  { label: 'About Us', screen: 'about' },
  { label: 'FAQ', screen: 'faq' },
]

export default function Navbar({ currentScreen, onNavigate, onGetScore }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F6E56' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-lg" style={{ color: '#0F6E56' }}>Second Line Capital</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <button
              key={link.screen}
              onClick={() => onNavigate(link.screen)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: currentScreen === link.screen ? '#0F6E56' : '#6b7280',
                backgroundColor: currentScreen === link.screen ? '#E1F5EE' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGetScore}
            className="hidden sm:block px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-transform hover:scale-105"
            style={{ backgroundColor: '#0F6E56' }}
          >
            Get Your Score →
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500"
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-1 bg-white">
          {LINKS.map((link) => (
            <button
              key={link.screen}
              onClick={() => { onNavigate(link.screen); setMobileOpen(false) }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{
                color: currentScreen === link.screen ? '#0F6E56' : '#374151',
                backgroundColor: currentScreen === link.screen ? '#E1F5EE' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onGetScore(); setMobileOpen(false) }}
            className="w-full mt-2 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: '#0F6E56' }}
          >
            Get Your Score →
          </button>
        </div>
      )}
    </nav>
  )
}
