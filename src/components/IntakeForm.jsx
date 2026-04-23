import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'businessName',
    question: "What's your business name?",
    type: 'text',
    placeholder: "e.g. Ms. Chanel's Creole Kitchen",
  },
  {
    id: 'businessType',
    question: 'What type of business are you?',
    type: 'radio',
    options: ['Food Truck', 'Restaurant', 'Caterer', 'Barbershop / Salon', 'Brass Band / Music', 'Boutique / Retail', 'Other'],
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
    options: [
      'No reviews yet',
      '1–10 reviews',
      '11–50 reviews',
      '50+ reviews with 4+ stars',
    ],
  },
  {
    id: 'websiteUrl',
    question: 'Do you have a website, Yelp page, or social media link?',
    type: 'text',
    placeholder: 'e.g. yelp.com/biz/your-business or instagram.com/yourbiz',
    optional: true,
    hint: 'Optional — paste any public link. Our AI will factor in your online presence.',
  },
]

export default function IntakeForm({ onComplete, onBack }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [textValue, setTextValue] = useState('')
  const [animating, setAnimating] = useState(false)

  const question = QUESTIONS[currentQ]
  const progress = ((currentQ) / QUESTIONS.length) * 100
  const currentAnswer = answers[question.id]

  const canProceed =
    question.optional
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
    }, 300)
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f9fafb' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={handleBack} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
              ← Back
            </button>
            <span className="text-sm font-medium" style={{ color: '#0F6E56' }}>
              {currentQ + 1} / {QUESTIONS.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress + (100 / QUESTIONS.length)}%`, backgroundColor: '#0F6E56' }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="max-w-xl w-full"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateX(-20px)' : 'translateX(0)', transition: 'all 0.3s ease' }}
        >
          {/* Header logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F6E56' }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-base" style={{ color: '#0F6E56' }}>Second Line Capital</span>
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
            {question.question}
          </h2>

          {question.hint && (
            <p className="text-sm text-gray-400 mb-8">{question.hint}</p>
          )}
          {!question.hint && <div className="mb-8" />}

          {question.type === 'text' ? (
            <div>
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canProceed && handleNext()}
                placeholder={question.placeholder}
                autoFocus
                className="w-full px-5 py-4 text-lg border-2 rounded-xl outline-none transition-colors"
                style={{
                  borderColor: textValue ? '#0F6E56' : '#e5e7eb',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="mt-6 w-full py-4 rounded-xl text-white font-semibold text-lg transition-all"
                style={{
                  backgroundColor: canProceed ? '#0F6E56' : '#d1d5db',
                  cursor: canProceed ? 'pointer' : 'not-allowed',
                }}
              >
                {question.optional && !textValue.trim() ? 'Skip →' : 'Continue →'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {question.options.map((option) => {
                const selected = currentAnswer === option
                return (
                  <button
                    key={option}
                    onClick={() => advance(option)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all"
                    style={{
                      borderColor: selected ? '#0F6E56' : '#e5e7eb',
                      backgroundColor: selected ? '#E1F5EE' : 'white',
                      color: selected ? '#0F6E56' : '#1A1A1A',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: selected ? '#0F6E56' : '#d1d5db' }}
                      >
                        {selected && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0F6E56' }} />
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
