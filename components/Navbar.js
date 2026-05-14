'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f4]/90 backdrop-blur-md border-b border-teal-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="white" strokeWidth="1.5"/>
                <line x1="5" y1="6" x2="13" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="5" y1="9" x2="13" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="5" y1="12" x2="9" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-display text-lg font-semibold text-teal-900 tracking-tight">ClauseKit</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#how-it-works" className="text-sm text-slate-600 hover:text-teal-700 transition-colors">How it works</Link>
            <Link href="/#examples" className="text-sm text-slate-600 hover:text-teal-700 transition-colors">Examples</Link>
            <Link href="/builder" className="inline-flex items-center gap-1.5 bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors">
              Build a Clause
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-teal-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-teal-100 bg-[#faf8f4] px-4 py-4 flex flex-col gap-4">
          <Link href="/#how-it-works" className="text-sm text-slate-600" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link href="/#examples" className="text-sm text-slate-600" onClick={() => setMenuOpen(false)}>Examples</Link>
          <Link href="/builder" className="inline-flex items-center gap-1.5 bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg w-fit" onClick={() => setMenuOpen(false)}>
            Build a Clause →
          </Link>
        </div>
      )}
    </nav>
  )
}