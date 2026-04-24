import { useState } from 'react'

const BUSINESS_TYPES = [
  { value: 'Food Truck',          icon: '🚚', label: 'Food Truck' },
  { value: 'Restaurant',          icon: '🍽️', label: 'Restaurant' },
  { value: 'Caterer',             icon: '🍱', label: 'Caterer' },
  { value: 'Barbershop / Salon',  icon: '✂️', label: 'Barbershop / Salon' },
  { value: 'Brass Band / Music',  icon: '🎺', label: 'Brass Band / Music' },
  { value: 'Boutique / Retail',   icon: '🛍️', label: 'Boutique / Retail' },
  { value: 'Other',               icon: '⭐', label: 'Other' },
]

const QUESTIONS = [
  {
    id: 'businessName',
    question: "What's your business name?",
    type: 'text',
    placeholder: "e.g. Ms. Chanel's Creole Kitchen",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    id: 'businessType',
    question: 'What type of business are you?',
    type: 'icon-grid',
    options: BUSINESS_TYPES,
  },
  {
    id: 'posSystem',
    question: 'What POS or payment system do you use?',
    type: 'radio',
    options: ['Square', 'Toast', 'Stripe', 'Clover', 'Other / multiple systems', 'Cash only / no POS'],
    hint: 'This is how we pull your transaction history for underwriting.',
  },
  {
    id: 'operatingTime',
    question: 'How long have you been operating?',
    type: 'radio',
    options: ['Less than 1 year', '1-2 years', '3-5 years', '5+ years'],
  },
  {
    id: 'monthlyRevenue',
    question: 'What is your average monthly revenue?',
    type: 'radio',
    options: ['Under $2,000', '$2,000–$5,000', '$5,000–$10,000', '$10,000–$20,000', 'Over $20,000'],
  },
  {
    id: 'socialMedia',
    question: 'How would you describe your social media presence?',
    type: 'radio',
    options: [
      'No presence',
      'Small (under 1,000 followers)',
      'Medium (1,000–10,000 followers)',
      'Large (10,000+ followers)',
    ],
  },
  {
    id: 'reviews',
    question: 'What are your Yelp or Google review stats?',
    type: 'radio',
    options: ['No reviews yet', '1–10 reviews', '11–50 reviews', '50+ reviews with 4+ stars'],
  },
  {
    id: 'websiteUrl',
    question: 'Do you have a website, Yelp page, or social media link?',
    type: 'text',
    placeholder: 'e.g. yelp.com/biz/your-business or instagram.com/yourbiz',
    optional: true,
    hint: 'Optional — paste any public link. Our AI will factor in your online presence.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
]

const STEP_NAMES = [
  'Business Name',
  'Business Type',
  'Payment System',
  'Operating Time',
  'Revenue',
  'Social Media',
  'Reviews',
  'Online Presence',
]

export default function IntakeForm({ onComplete, onBack }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [textValue, setTextValue] = useState('')
  const [animating, setAnimating] = useState(false)

  const question = QUESTIONS[currentQ]
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100
  const currentAnswer = answers[question.id]

  const canProceed = question.optional
    ? true
    : question.type === 'text'
    ? textValue.trim().length > 0
    : currentAnswer !== undefined

  const advance = (value) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)
    setAnimating(true)

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1)
        setTextValue('')
        setAnimating(false)
      } else {
        onComplete(newAnswers)
      }
    }, 280)
  }

  const handleNext = () => {
    if (!canProceed) return
    const value = question.type === 'text' ? textValue.trim() : currentAnswer
    advance(value)
  }

  const handleBack = () => {
    if (currentQ === 0) {
      onBack()
    } else {
      setCurrentQ(currentQ - 1)
      setTextValue(answers[QUESTIONS[currentQ - 1].id] || '')
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFB' }}>
      {/* Top progress bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <div className="text-center">
              <div className="text-xs font-semibold" style={{ color: '#0F6E56' }}>
                {STEP_NAMES[currentQ]}
              </div>
              <div className="text-xs text-gray-400">{currentQ + 1} of {QUESTIONS.length}</div>
            </div>
            <div className="text-sm font-bold" style={{ color: '#0F6E56' }}>
              {Math.round(progress)}%
            </div>
          </div>

          {/* Progress track */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #0F6E56, #1B9E7A)' }}
            />
          </div>

          {/* Step dots */}
          <div className="flex gap-1 mt-2.5 justify-center">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentQ ? 20 : 6,
                  height: 6,
                  backgroundColor: i < currentQ ? '#0F6E56' : i === currentQ ? '#0F6E56' : '#e5e7eb',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="max-w-xl w-full"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateX(-24px)' : 'translateX(0)',
            transition: 'opacity 0.28s ease, transform 0.28s ease',
          }}
        >
          {/* Logo mark */}
          <div className="flex items-center gap-2 mb-10">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0F6E56, #1B9E7A)' }}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-base" style={{ color: '#0F6E56' }}>Second Line Capital</span>
          </div>

          {/* Question */}
          <h2 className="text-3xl font-black mb-2" style={{ color: '#111827', letterSpacing: '-0.5px' }}>
            {question.question}
          </h2>
          {question.hint && (
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">{question.hint}</p>
          )}
          {!question.hint && <div className="mb-8" />}

          {/* Icon grid (business type) */}
          {question.type === 'icon-grid' && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {question.options.map((opt) => {
                const selected = currentAnswer === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => advance(opt.value)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all hover:scale-[1.03] active:scale-95"
                    style={{
                      borderColor: selected ? '#0F6E56' : '#e5e7eb',
                      backgroundColor: selected ? '#E1F5EE' : 'white',
                    }}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span
                      className="text-xs font-semibold text-center leading-tight"
                      style={{ color: selected ? '#0F6E56' : '#374151' }}
                    >
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Radio list */}
          {question.type === 'radio' && (
            <div className="space-y-2.5">
              {question.options.map((option) => {
                const selected = currentAnswer === option
                return (
                  <button
                    key={option}
                    onClick={() => advance(option)}
                    className="w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      borderColor: selected ? '#0F6E56' : '#e5e7eb',
                      backgroundColor: selected ? '#E1F5EE' : 'white',
                      color: selected ? '#0F6E56' : '#1A1A1A',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
                        style={{ borderColor: selected ? '#0F6E56' : '#d1d5db' }}
                      >
                        {selected && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0F6E56' }} />
                        )}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Text input */}
          {question.type === 'text' && (
            <div>
              <div className="relative">
                {question.icon && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {question.icon}
                  </div>
                )}
                <input
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && canProceed && handleNext()}
                  placeholder={question.placeholder}
                  autoFocus
                  className="w-full py-4 text-lg border-2 rounded-2xl outline-none transition-all"
                  style={{
                    borderColor: textValue ? '#0F6E56' : '#e5e7eb',
                    paddingLeft: question.icon ? '3rem' : '1.25rem',
                    paddingRight: '1.25rem',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: textValue ? '0 0 0 3px rgba(15,110,86,0.15)' : 'none',
                  }}
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="mt-4 w-full py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: canProceed ? 'linear-gradient(135deg, #0F6E56, #1B9E7A)' : '#d1d5db',
                  cursor: canProceed ? 'pointer' : 'not-allowed',
                  boxShadow: canProceed ? '0 4px 14px rgba(15,110,86,0.35)' : 'none',
                }}
              >
                {question.optional && !textValue.trim() ? 'Skip →' : 'Continue →'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom security note */}
      <div className="text-center pb-8">
        <div className="inline-flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Your data is encrypted and never sold to third parties
        </div>
      </div>
    </div>
  )
}
