'use client'
import { useState } from 'react'
import Button from './Button'

export default function ClauseOutput({ result, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.clause)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = result.clause
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Success badge */}
      <div className="flex items-center gap-2 text-teal-700">
        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm font-medium">Clause generated successfully</span>
      </div>

      {/* Clause title */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Clause Title</p>
        <h3 className="font-display text-xl font-semibold text-slate-800">{result.title}</h3>
      </div>

      {/* The actual clause */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Generated Clause</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 9V2h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copy Clause
              </>
            )}
          </button>
        </div>
        <div className="clause-text text-sm leading-8 text-slate-700 whitespace-pre-line font-serif">
          {result.clause}
        </div>
      </div>

      {/* Plain English explanation */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.5" stroke="#0d9488" strokeWidth="1.2"/>
            <path d="M8 7V11" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="5" r="0.75" fill="#0d9488"/>
          </svg>
          <span className="text-sm font-semibold text-teal-800">Plain-English Explanation</span>
        </div>
        <p className="text-sm text-teal-700 leading-relaxed">{result.explanation}</p>
      </div>

      {/* Landlord checklist */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#64748b" strokeWidth="1.2"/>
            <path d="M5 8L7 10L11 6" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-semibold text-slate-700">Landlord Checklist</span>
        </div>
        <ul className="space-y-2.5">
          {result.checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4.5 7.5L8 3" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-sm text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
            <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="#b45309" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M8 6V9" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="11" r="0.6" fill="#b45309"/>
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Risk Note</p>
            <p className="text-sm text-amber-700 leading-relaxed">{result.riskNote}</p>
          </div>
        </div>
      </div>

      {/* State-specific warning */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-semibold text-slate-600">State-specific note: </span>
          Rental laws, stamp duty requirements, and registration rules vary by Indian state. This clause is a general draft. Please verify its validity under your state's Rent Control Act or model tenancy laws before including it in a signed agreement.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400 leading-relaxed text-center">
          Generated clauses are for general drafting help only and are not legal advice. Please consult a lawyer for high-value, disputed, or state-specific matters.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} variant="primary">
          {copied ? '✓ Copied to clipboard' : 'Copy Clause'}
        </Button>
        <Button onClick={onReset} variant="danger">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.5 2.5L2.5 11.5M2.5 2.5L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Start over
        </Button>
      </div>
    </div>
  )
}