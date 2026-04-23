import { useState } from 'react'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'

const FAQS = [
  {
    q: 'Do I need a credit score to apply?',
    a: 'No. The Second Line Score does not use FICO or any traditional credit bureau data. We score your business based on POS transaction history, customer reviews, social engagement, and the documents you provide. A low or nonexistent credit score does not disqualify you.',
  },
  {
    q: 'Do I need collateral?',
    a: 'Never. Second Line Capital loans are unsecured. We lend against your revenue — not your equipment, your car, or your home.',
  },
  {
    q: 'How fast will I get a decision?',
    a: 'Your initial Second Line Score is generated in under 60 seconds. Full underwriting and a formal loan offer takes up to 24 hours. Funds arrive within 48 hours of accepting your offer.',
  },
  {
    q: 'How does repayment work?',
    a: 'Repayment is revenue-based. We automatically sweep 5–8% of your daily POS receipts until the loan is repaid. There is no fixed monthly payment. During a slow August you pay less; during Jazz Fest you pay more and pay off faster. Total repayment is capped at 1.4× the loan principal.',
  },
  {
    q: 'What happens if I have a bad month?',
    a: "Your payment automatically decreases with your revenue. There is no fixed payment that triggers a default. A slow month means a smaller sweep — the loan just takes a little longer to repay. You cannot default simply because business is slow.",
  },
  {
    q: 'What about hurricanes or disasters?',
    a: 'Automatic forbearance activates when our model detects a declared disaster or significant neighborhood foot traffic drop. Collections pause until your POS revenue signals confirm stabilization. No application required, no manual process.',
  },
  {
    q: 'What POS systems do you support?',
    a: 'Square, Toast, and Stripe at launch. Clover and other platforms are on the roadmap. If you use a different system, you can upload bank statements and POS export files directly — our AI reads them and incorporates the data into your score.',
  },
  {
    q: 'How much can I borrow?',
    a: 'Loans range from $5,000 to $50,000. The amount offered depends on your Second Line Score, monthly revenue, and operating history. An Excellent score (80+) with $10K/month in POS revenue typically qualifies for $40,000–$50,000.',
  },
  {
    q: 'What if my score is too low?',
    a: "Scores below 50 (Building tier) may not qualify for a loan right now — but you're not out of options. We'll connect you to the Savor the City NOLA grant program ($2,000–$10,000 stabilization grants) and give you a specific action plan to raise your score. Most businesses can move up a tier in 3–6 months.",
  },
  {
    q: 'Is my financial data secure?',
    a: "Yes. All document uploads and POS data are encrypted in transit and at rest. We don't store raw financial documents longer than the underwriting period. We never sell or share your data with third parties.",
  },
  {
    q: 'Can I invest in Second Line Capital?',
    a: 'A Regulation CF community note pool launches in Q3 2026, allowing New Orleans residents to invest as little as $100 and target a 6–9% annual yield. Capital stays in NOLA neighborhoods. Join the waitlist on our About page.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4"
      >
        <span className="font-semibold text-gray-800 leading-snug">{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm transition-transform"
          style={{
            backgroundColor: open ? '#0F6E56' : '#e5e7eb',
            color: open ? 'white' : '#6b7280',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-5 text-gray-500 leading-relaxed text-sm pr-10 animate-fade-in">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ({ onNavigate, onGetScore }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentScreen="faq" onNavigate={onNavigate} onGetScore={onGetScore} />

      {/* Hero */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: '#1A1A1A' }}>
            Frequently asked questions
          </h1>
          <p className="text-gray-500 text-lg">
            Everything you need to know about Second Line Capital, how scoring works, and what to expect.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-16 px-6 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-4">
            {FAQS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 rounded-3xl p-8 text-center" style={{ backgroundColor: '#E1F5EE' }}>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1A1A' }}>Still have questions?</h3>
            <p className="text-gray-600 text-sm mb-6">
              Get your actual score — the process itself answers most questions.
            </p>
            <button
              onClick={onGetScore}
              className="px-8 py-3 rounded-xl text-white font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: '#0F6E56' }}
            >
              Get Your Second Line Score →
            </button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}
