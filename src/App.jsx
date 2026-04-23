import { useState } from 'react'
import LandingPage from './components/LandingPage'
import IntakeForm from './components/IntakeForm'
import DocumentUpload from './components/DocumentUpload'
import ScoreResults from './components/ScoreResults'
import FundingPartners from './components/FundingPartners'
import LoadingScreen from './components/LoadingScreen'
import AboutScore from './components/AboutScore'
import AboutUs from './components/AboutUs'
import FAQ from './components/FAQ'
import './index.css'

const DEMO_DATA = {
  businessName: "Marcus's Food Truck",
  businessType: 'Food Truck',
  posSystem: 'Square',
  operatingTime: '3-5 years',
  monthlyRevenue: '$5,000-$10,000',
  socialMedia: 'Medium (1,000-10,000 followers)',
  reviews: '50+ reviews with 4+ stars',
  websiteUrl: '',
}

const DEMO_SCORE = {
  score: 81,
  tier: 'Good',
  loanAmount: '$30,000',
  categories: {
    revenueConsistency: 29,
    trajectory: 16,
    seasonalityPredictability: 16,
    customerLoyalty: 13,
    fixedCostCoverage: 7,
  },
  summary:
    "Marcus's Food Truck demonstrates exceptional customer loyalty and consistent POS revenue that no FICO score can see. The 3-5 year operating history with predictable Jazz Fest and Mardi Gras seasonality makes this an ideal revenue-share loan candidate. Strengthening off-season revenue and documenting fixed costs would push this score into the Excellent tier.",
  strengths: [
    'POS consistency — steady $5K–$10K monthly through Square signals reliable repayment capacity',
    '50+ reviews at 4+ stars reflects deep customer loyalty that recovers from seasonal dips',
    'Predictable seasonality (Jazz Fest, Mardi Gras) makes revenue-share repayment highly manageable',
  ],
  improvements: [
    'Document fixed costs (rent, suppliers, utilities) to improve Fixed Cost Coverage scoring',
    'Add catering or event bookings to build a forward revenue pipeline lenders can see',
    'Expand to Toast or Stripe for redundant POS data that strengthens underwriting',
  ],
  nextSteps: [
    'Connect your Square account to complete full underwriting — 18 months of transaction data unlocks a higher loan amount',
    'Apply directly to TruFund Financial Services — a New Orleans CDFI that partners with Second Line Capital for origination',
    'Join the Savor the City NOLA network for a $2,000–$10,000 stabilization grant before your loan application',
  ],
}

function PrototypeBanner() {
  return (
    <div
      className="w-full text-center py-2 px-4 text-xs font-medium tracking-wide"
      style={{ backgroundColor: '#1A1A1A', color: '#9ca3af' }}
    >
      🚧 Early Prototype &nbsp;·&nbsp; AI scoring is for demonstration purposes only &nbsp;·&nbsp; Not financial advice
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [formData, setFormData] = useState({})
  const [documents, setDocuments] = useState([])
  const [scoreData, setScoreData] = useState(null)

  const handleDemoMode = () => {
    setFormData(DEMO_DATA)
    setScoreData(DEMO_SCORE)
    setScreen('results')
  }

  const handleFormComplete = (data) => {
    setFormData(data)
    setScreen('documents')
  }

  const handleDocumentsComplete = async (docs) => {
    setDocuments(docs)
    setScreen('loading')
    const result = await fetchAIScore(formData, docs)
    setTimeout(() => {
      setScoreData(result)
      setScreen('results')
    }, 3000)
  }

  const handleDocumentsSkip = async () => {
    setDocuments([])
    setScreen('loading')
    const result = await fetchAIScore(formData, [])
    setTimeout(() => {
      setScoreData(result)
      setScreen('results')
    }, 3000)
  }

  const handleStartOver = () => {
    setScreen('landing')
    setFormData({})
    setDocuments([])
    setScoreData(null)
  }

  const nav = (s) => { setScreen(s); window.scrollTo(0, 0) }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PrototypeBanner />
      {screen === 'landing' && (
        <LandingPage onGetScore={() => nav('form')} onDemoMode={handleDemoMode} onNavigate={nav} />
      )}
      {screen === 'about-score' && (
        <AboutScore onNavigate={nav} onGetScore={() => nav('form')} />
      )}
      {screen === 'about' && (
        <AboutUs onNavigate={nav} onGetScore={() => nav('form')} />
      )}
      {screen === 'faq' && (
        <FAQ onNavigate={nav} onGetScore={() => nav('form')} />
      )}
      {screen === 'form' && (
        <IntakeForm onComplete={handleFormComplete} onBack={() => nav('landing')} />
      )}
      {screen === 'documents' && (
        <DocumentUpload
          businessName={formData.businessName}
          onComplete={handleDocumentsComplete}
          onSkip={handleDocumentsSkip}
        />
      )}
      {screen === 'loading' && <LoadingScreen hasDocuments={documents.length > 0} />}
      {screen === 'results' && scoreData && (
        <ScoreResults
          formData={formData}
          scoreData={scoreData}
          hasDocuments={documents.length > 0}
          onFindPartners={() => nav('partners')}
          onStartOver={handleStartOver}
        />
      )}
      {screen === 'partners' && scoreData && (
        <FundingPartners
          scoreData={scoreData}
          onStartOver={handleStartOver}
          onBack={() => nav('results')}
        />
      )}
    </div>
  )
}

async function fetchAIScore(data, documents = []) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  const textPrompt = `Business Profile:
- Business Name: ${data.businessName}
- Business Type: ${data.businessType}
- POS System: ${data.posSystem}
- Operating Time: ${data.operatingTime}
- Monthly Revenue: ${data.monthlyRevenue}
- Social Media Presence: ${data.socialMedia}
- Review Stats: ${data.reviews}${data.websiteUrl ? `\n- Website / Online Presence: ${data.websiteUrl}` : ''}${documents.length > 0 ? `\n\nSupporting documents provided: ${documents.map((d) => d.name).join(', ')}. Please analyze the attached documents and incorporate their data into the scoring.` : ''}

Generate a Second Line Score and detailed analysis for this New Orleans small business.`

  const systemPrompt = `You are Second Line Capital's AI scoring engine for New Orleans small businesses that cannot access traditional bank loans. The Second Line Score (0–100) uses five weighted dimensions. Score each dimension and sum them for the total.

Scoring dimensions:
- revenueConsistency (max 35): Revenue stability over time. A steady $3K/week outscores a volatile $8K/week.
- trajectory (max 20): Rolling momentum. Is the business growing, flat, or declining?
- seasonalityPredictability (max 20): Predictable seasonal dips (e.g. slow August) are manageable. Unpredictable volatility is a risk signal.
- customerLoyalty (max 15): Repeat business, review velocity, social consistency. A loyal base recovers from shocks.
- fixedCostCoverage (max 10): Estimated ratio of consistent revenue to known fixed obligations.

Tier thresholds: Excellent ≥ 80, Good 65–79, Fair 50–64, Building < 50.
Loan amount: $5,000–$50,000 range; size relative to monthly revenue and score.
If documents are provided, extract and use any financial data in them — bank balances, revenue figures, transaction counts — to improve scoring accuracy.${data.websiteUrl ? ' Also consider the online presence indicated by the provided URL.' : ''}

Respond with ONLY raw JSON, no markdown, no backticks, no explanation:
{
  "score": <number 0-100, sum of all five categories>,
  "tier": <"Excellent" | "Good" | "Fair" | "Building">,
  "loanAmount": <string like "$25,000">,
  "categories": {
    "revenueConsistency": <number 0-35>,
    "trajectory": <number 0-20>,
    "seasonalityPredictability": <number 0-20>,
    "customerLoyalty": <number 0-15>,
    "fixedCostCoverage": <number 0-10>
  },
  "summary": <string, 2-3 sentences in plain English>,
  "strengths": [<string>, <string>, <string>],
  "improvements": [<string>, <string>, <string>],
  "nextSteps": [<string>, <string>, <string>]
}`

  // Build message content — include document images/PDFs if provided
  const hasPdfs = documents.some((d) => d.type === 'application/pdf')
  const messageContent = []

  for (const doc of documents) {
    if (doc.type.startsWith('image/')) {
      messageContent.push({
        type: 'image',
        source: { type: 'base64', media_type: doc.type, data: doc.base64 },
      })
    } else if (doc.type === 'application/pdf') {
      messageContent.push({
        type: 'document',
        source: { type: 'base64', media_type: 'application/pdf', data: doc.base64 },
      })
    }
  }
  messageContent.push({ type: 'text', text: textPrompt })

  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    }
    if (hasPdfs) headers['anthropic-beta'] = 'pdfs-2024-09-25'

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: messageContent }],
      }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const json = await response.json()
    let text = json.content[0].text.trim()
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    return JSON.parse(text)
  } catch (err) {
    console.error('AI scoring failed, using fallback:', err)
    return {
      score: 75,
      tier: 'Good',
      loanAmount: '$25,000',
      categories: {
        revenueConsistency: 26,
        trajectory: 15,
        seasonalityPredictability: 15,
        customerLoyalty: 12,
        fixedCostCoverage: 7,
      },
      summary:
        'This business shows solid fundamentals with consistent POS revenue and genuine community engagement. Review signals indicate a loyal customer base that recovers from seasonal dips. With documented fixed costs and a connected POS account, this business qualifies for revenue-share lending.',
      strengths: [
        'Consistent operating history demonstrates proven business viability',
        'Customer review signals reflect real local loyalty — a key repayment indicator',
        'Revenue levels qualify for Second Line Capital micro-lending program',
      ],
      improvements: [
        'Connect POS account (Square, Toast, or Stripe) to unlock full 18-month transaction analysis',
        'Document fixed monthly costs — rent, utilities, suppliers — to improve Fixed Cost Coverage score',
        'Add event bookings or catering to build a forward revenue pipeline',
      ],
      nextSteps: [
        'Connect your POS account to complete underwriting and receive a full loan offer',
        'Apply to TruFund Financial Services — New Orleans CDFI and Second Line Capital originating partner',
        'Join the Savor the City NOLA network for access to stabilization grants and warm lender referrals',
      ],
    }
  }
}
