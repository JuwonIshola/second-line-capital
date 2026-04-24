import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'How It Works', screen: 'landing' },
  { label: 'About the Score', screen: 'about-score' },
  { label: 'About Us', screen: 'about' },
  { label: 'FAQ', screen: 'faq' },
]

function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 flex-shrink-0 group">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
        style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-black text-base tracking-tight" style={{ color: '#0F6E56' }}>Second Line</div>
        <div className="font-semibold text-xs text-gray-400 tracking-wide">CAPITAL</div>
      </div>
    </button>
  )
}

export default function Navbar({ currentScreen, onNavigate, onGetScore }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,1)',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.06)' : '0 1px 0 #f3f4f6',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Logo onClick={() => onNavigate('landing')} />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <button
                key={link.screen}
                onClick={() => onNavigate(link.screen)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: currentScreen === link.screen ? '#0F6E56' : '#6b7280',
                  backgroundColor: currentScreen === link.screen ? '#E1F5EE' : 'transparent',
                  fontWeight: currentScreen === link.screen ? '600' : '500',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Security badge – desktop only */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400 font-medium border border-gray-100 rounded-full px-3 py-1.5">
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              256-bit SSL
            </div>

            <button
              onClick={onGetScore}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-95"
              style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
            >
              Get Your Score
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
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
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Logo onClick={() => { onNavigate('landing'); setMobileOpen(false) }} />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {LINKS.map((link) => (
                <button
                  key={link.screen}
                  onClick={() => { onNavigate(link.screen); setMobileOpen(false) }}
                  className="w-full text-left px-4 py-3.5 rounded-2xl text-sm font-medium transition-colors flex items-center justify-between"
                  style={{
                    color: currentScreen === link.screen ? '#0F6E56' : '#374151',
                    backgroundColor: currentScreen === link.screen ? '#E1F5EE' : 'transparent',
                    fontWeight: currentScreen === link.screen ? '600' : '500',
                  }}
                >
                  {link.label}
                  {currentScreen === link.screen && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0F6E56' }} />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-4 pb-8 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                256-bit SSL · CDFI Certified Partners
              </div>
              <button
                onClick={() => { onGetScore(); setMobileOpen(false) }}
                className="w-full py-3.5 rounded-2xl text-white text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
              >
                Get Your Second Line Score →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
