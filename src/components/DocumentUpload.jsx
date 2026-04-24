import { useState, useRef } from 'react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_FILES = 5
const MAX_MB = 5

function formatSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const WHAT_HELPS = [
  { icon: '📊', label: 'POS transaction export', sub: 'Square, Toast, Stripe — last 6–18 months' },
  { icon: '🏦', label: 'Bank statements', sub: 'Last 3–6 months' },
  { icon: '📋', label: 'Tax return or Schedule C', sub: 'Most recent year' },
  { icon: '📝', label: 'Business license or lease', sub: 'Any official business document' },
]

export default function DocumentUpload({ businessName, onComplete, onSkip }) {
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const inputRef = useRef()

  const addFiles = (incoming) => {
    const valid = Array.from(incoming)
      .filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_MB * 1024 * 1024)
      .slice(0, MAX_FILES - files.length)
    setFiles((prev) => [...prev, ...valid].slice(0, MAX_FILES))
  }

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async () => {
    if (files.length === 0) { onSkip(); return }
    setProcessing(true)
    const processed = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              const base64 = e.target.result.split(',')[1]
              resolve({ name: file.name, type: file.type, base64, size: file.size })
            }
            reader.readAsDataURL(file)
          })
      )
    )
    onComplete(processed)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFB' }}>
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
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

          {/* Security indicator */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-100 rounded-full px-3 py-1.5">
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Encrypted Upload
          </div>
        </div>

        {/* Progress bar — step 2 of 3 */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full transition-all duration-500"
            style={{ width: '66%', background: 'linear-gradient(90deg, #0F6E56, #1B9E7A)' }}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full">

          {/* Header */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            Optional — but raises your score
          </div>

          <h2 className="text-3xl font-black mb-3" style={{ color: '#111827', letterSpacing: '-0.5px' }}>
            Strengthen {businessName}'s score
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Our AI reads your documents directly — the more evidence you provide, the higher and more accurate your Second Line Score.
          </p>

          {/* Drop zone */}
          <div
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className="rounded-3xl border-2 border-dashed cursor-pointer transition-all mb-5 p-10 text-center group"
            style={{
              borderColor: dragging ? '#0F6E56' : '#d1d5db',
              backgroundColor: dragging ? '#E1F5EE' : 'white',
            }}
          >
            {/* Upload icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: dragging ? 'white' : '#E1F5EE' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                style={{ color: '#0F6E56' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>

            <p className="font-bold text-gray-800 text-base mb-1">
              {dragging ? 'Drop files here' : 'Drop files here or click to browse'}
            </p>
            <p className="text-sm text-gray-400">Bank statements · POS reports · Tax returns · Business license</p>
            <p className="text-xs text-gray-300 mt-2">JPG, PNG, PDF · Max {MAX_MB}MB per file · Up to {MAX_FILES} files</p>

            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2.5 mb-6">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100 card-shadow animate-fade-in"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: file.type === 'application/pdf' ? '#FFF3E0' : '#E1F5EE' }}
                  >
                    <span className="text-lg">{file.type === 'application/pdf' ? '📄' : '🖼️'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{file.name}</div>
                    <div className="text-xs text-gray-400">{formatSize(file.size)}</div>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* What helps most */}
          <div className="rounded-3xl p-5 mb-6" style={{ backgroundColor: '#FFF8E1' }}>
            <p className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: '#C49A22' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              What helps most
            </p>
            <div className="space-y-2.5">
              {WHAT_HELPS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 justify-center">
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            256-bit encrypted · Your documents are never stored or sold
          </div>

          {/* Actions */}
          <button
            onClick={handleSubmit}
            disabled={processing}
            className="w-full py-4 rounded-2xl text-white font-bold text-base mb-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: processing ? '#d1d5db' : 'linear-gradient(135deg, #0F6E56, #1B9E7A)',
              cursor: processing ? 'wait' : 'pointer',
              boxShadow: processing ? 'none' : '0 4px 14px rgba(15,110,86,0.35)',
            }}
          >
            {processing
              ? 'Preparing documents...'
              : files.length > 0
              ? `Analyze ${files.length} document${files.length > 1 ? 's' : ''} & Get Score →`
              : 'Skip & Score Without Documents →'}
          </button>

          <button
            onClick={onSkip}
            className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium"
          >
            Skip for now — score based on my answers only
          </button>
        </div>
      </div>
    </div>
  )
}
