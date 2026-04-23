import { useState, useRef } from 'react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_FILES = 5
const MAX_MB = 5

function formatSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function fileIcon(type) {
  if (type === 'application/pdf') return '📄'
  return '🖼️'
}

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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f9fafb' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F6E56' }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-base" style={{ color: '#0F6E56' }}>Second Line Capital</span>
          </div>
          <span className="text-sm font-medium" style={{ color: '#0F6E56' }}>Almost there</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full">
          <div className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
            Optional — but raises your score
          </div>

          <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A1A1A' }}>
            Strengthen {businessName}'s score
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Upload bank statements, POS reports, or tax documents. Our AI reads them directly — the more evidence, the higher and more accurate your score.
          </p>

          {/* Drop zone */}
          <div
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className="rounded-2xl border-2 border-dashed cursor-pointer transition-all mb-5 p-8 text-center"
            style={{
              borderColor: dragging ? '#0F6E56' : '#d1d5db',
              backgroundColor: dragging ? '#E1F5EE' : 'white',
            }}
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="font-semibold text-gray-700 mb-1">Drop files here or click to browse</p>
            <p className="text-sm text-gray-400">Bank statements · POS reports · Tax returns · Business license</p>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, PDF · Max {MAX_MB}MB per file · Up to {MAX_FILES} files</p>
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
            <div className="space-y-2 mb-6">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                  <span className="text-xl">{fileIcon(file.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{file.name}</div>
                    <div className="text-xs text-gray-400">{formatSize(file.size)}</div>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-gray-300 hover:text-red-400 text-lg leading-none flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* What helps most */}
          <div className="rounded-2xl p-4 mb-6" style={{ backgroundColor: '#FFF8E1' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#C49A22' }}>What helps most</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>📊 POS transaction export (Square, Toast, Stripe) — last 6–18 months</li>
              <li>🏦 Bank statements — last 3–6 months</li>
              <li>📋 Most recent tax return or Schedule C</li>
              <li>📝 Business license or lease agreement</li>
            </ul>
          </div>

          {/* Actions */}
          <button
            onClick={handleSubmit}
            disabled={processing}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg mb-3 transition-all"
            style={{ backgroundColor: processing ? '#d1d5db' : '#0F6E56', cursor: processing ? 'wait' : 'pointer' }}
          >
            {processing
              ? 'Preparing documents...'
              : files.length > 0
              ? `Analyze ${files.length} document${files.length > 1 ? 's' : ''} & Score →`
              : 'Skip & Score Without Documents →'}
          </button>

          <button
            onClick={onSkip}
            className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip for now — score based on my answers only
          </button>
        </div>
      </div>
    </div>
  )
}
