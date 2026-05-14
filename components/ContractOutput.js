'use client'
import { useState } from 'react'
import Button from './Button'

export default function ContractOutput({ contract, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contract)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = contract
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([contract], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rental-agreement.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rental Agreement</title>
          <style>
            @page { margin: 2cm 2.5cm; }
            body {
              font-family: Georgia, 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.8;
              color: #1e293b;
              max-width: 800px;
              margin: 0 auto;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-family: Georgia, 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.8;
            }
            h1, h2 {
              page-break-after: avoid;
            }
            .page-break {
              page-break-after: always;
            }
          </style>
        </head>
        <body>
          <pre>${contract.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 300)
  }

  // Parse contract into sections for print-friendly rendering
  const renderContract = () => {
    const lines = contract.split('\n')
    return lines.map((line, i) => {
      const trimmed = line.trim()
      // Major headings (all caps lines)
      if (trimmed && trimmed === trimmed.toUpperCase() && trimmed.length > 3 && /^[A-Z\s\d:\.–-]+$/.test(trimmed)) {
        return (
          <p key={i} className="font-bold text-slate-900 text-sm mt-5 mb-1 uppercase tracking-wide">
            {line}
          </p>
        )
      }
      // Numbered clause items
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <p key={i} className="text-sm text-slate-700 leading-relaxed mt-2 ml-2">
            {line}
          </p>
        )
      }
      // Bullet points
      if (/^[-•]\s/.test(trimmed)) {
        return (
          <p key={i} className="text-sm text-slate-700 leading-relaxed mt-1 ml-4">
            {line}
          </p>
        )
      }
      // Empty line
      if (!trimmed) {
        return <div key={i} className="h-3" />
      }
      return (
        <p key={i} className="text-sm text-slate-700 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Success badge */}
      <div className="flex items-center gap-2 text-teal-700">
        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm font-medium">Contract generated successfully</span>
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap gap-2">
        <button onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-lg transition-colors border border-teal-200">
          {copied ? (
            <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied!</>
          ) : (
            <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 9V2h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Copy All</>
          )}
        </button>
        <button onClick={handleDownload}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors border border-slate-200">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 6l3 3 3-3M1.5 10v2h10v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Download .txt
        </button>
        <button onClick={handlePrint}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors border border-slate-200">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="2" y="4" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4V2h5v2M4 10v1h5v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          Print
        </button>
      </div>

      {/* Contract body */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 contract-output print-contract">
        <div className="clause-text font-serif">
          {renderContract()}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400 leading-relaxed text-center">
          AI-generated contract for general drafting help only. Not legal advice. Consult a qualified lawyer for high-value, disputed, or state-specific matters.
        </p>
      </div>

      {/* Reset */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} variant="primary">
          {copied ? '✓ Copied' : 'Copy Contract'}
        </Button>
        <Button onClick={handleDownload} variant="secondary">
          Download .txt
        </Button>
        <Button onClick={onReset} variant="danger">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.5 2.5L2.5 11.5M2.5 2.5L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Start Over
        </Button>
      </div>
    </div>
  )
}