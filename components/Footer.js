import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-teal-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-teal-600 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="14" height="14" rx="2" stroke="white" strokeWidth="1.5"/>
                  <line x1="5" y1="6" x2="13" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="5" y1="9" x2="13" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="5" y1="12" x2="9" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-display text-base font-semibold text-white">ClauseKit</span>
            </div>
            <p className="text-teal-300 text-sm leading-relaxed max-w-xs">
              Simple lease clause drafting for small landlords. Clear language. Practical terms. Built for India.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-teal-300 text-sm hover:text-white transition-colors">How it works</Link></li>
              <li><Link href="/#examples" className="text-teal-300 text-sm hover:text-white transition-colors">Examples</Link></li>
              <li><Link href="/builder" className="text-teal-300 text-sm hover:text-white transition-colors">Build a Clause</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Legal Notice</h4>
            <p className="text-teal-300 text-xs leading-relaxed">
              Generated clauses are for general drafting help only and are not legal advice. Please consult a lawyer for high-value, disputed, or state-specific matters.
            </p>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-teal-400 text-xs">© {new Date().getFullYear()} ClauseKit. Not a legal service.</p>
          <p className="text-teal-500 text-xs">Rental laws vary by state. Always verify with a local lawyer.</p>
        </div>
      </div>
    </footer>
  )
}