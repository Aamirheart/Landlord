import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ExampleCard from '../components/ExampleCard'

const trustPoints = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Clear, plain language',
    desc: 'Every clause uses simple English — no legal jargon that leaves you guessing.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: 'Landlord-first protections',
    desc: 'Clauses are drafted to protect your property, income, and rights as the owner.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Built for Indian rental realities',
    desc: 'Covers security deposits, stamp duty notes, police verification, and society rules.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Not a replacement for a lawyer',
    desc: 'We help you draft. For high-value or disputed matters, always consult a qualified lawyer.',
  },
]

const steps = [
  { num: '01', title: 'Describe the situation', desc: 'Type what your tenant is asking for in plain words. No legal knowledge needed.' },
  { num: '02', title: 'Choose category & tone', desc: 'Pick the clause type and how firm you want the language to be — from friendly to strictly landlord-protective.' },
  { num: '03', title: 'Copy the generated clause', desc: 'Get a ready-to-use clause with a plain-English explanation and a landlord checklist.' },
]

const examples = [
  {
    category: 'Pets',
    title: 'Pet Permission Clause',
    preview: 'The Tenant shall not keep any pet or animal at the premises without prior written consent from the Landlord. The Tenant shall be responsible for any damage caused by the pet...',
    icon: 'pet',
  },
  {
    category: 'Subletting',
    title: 'Subletting and Assignment Clause',
    preview: 'The Tenant shall not sublet, underlet, or assign the rented premises or any part thereof without prior written consent from the Landlord. The Tenant shall remain responsible for all dues...',
    icon: 'subletting',
  },
  {
    category: 'Late Rent',
    title: 'Late Rent Payment Clause',
    preview: 'Monthly rent shall be paid on or before the 5th of each month. A grace period of 3 days is provided. Late payment charges of 1% per month apply thereafter...',
    icon: 'lateRent',
  },
  {
    category: 'Maintenance',
    title: 'Repairs and Maintenance Clause',
    preview: 'The Landlord shall be responsible for structural repairs. The Tenant shall be responsible for day-to-day upkeep and damage caused by the Tenant\'s own negligence or misuse...',
    icon: 'maintenance',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#faf8f4]">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
                Made for Indian small landlords
              </div>

              {/* Main headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.1] tracking-tight mb-6 animate-fade-up-delay-1">
                Create rental agreement clauses in plain English
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl animate-fade-up-delay-2">
                For small landlords who need clear lease clauses for pets, subletting, late rent, repairs, deposits, guests, and more — without hiring a lawyer every time.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-up-delay-2">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-800 active:scale-[0.98] transition-all shadow-lg shadow-teal-900/10"
                >
                  Build a Clause
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a
                  href="#examples"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 active:scale-[0.98] transition-all"
                >
                  See Examples
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['S', 'R', 'P', 'A'].map((letter, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-[#faf8f4] ${['bg-teal-700', 'bg-teal-600', 'bg-teal-500', 'bg-teal-400'][i]}`}>
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">Trusted by landlords</span> across India
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DISCLAIMER BANNER */}
        <div className="bg-amber-50 border-y border-amber-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start sm:items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 sm:mt-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="#b45309" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M8 6V9" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="0.6" fill="#b45309"/>
            </svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">Important: </span>
              Generated clauses are for general drafting help only and are not legal advice. Please consult a lawyer for high-value, disputed, or state-specific matters.
            </p>
          </div>
        </div>

        {/* PROBLEM SECTION */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-4">The Problem</p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 mb-6 leading-tight">
                  Most small landlords rely on outdated, copied, or handwritten lease terms
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    When a tenant asks to keep a pet, sublet a room, or pay rent late — many landlords either say yes without documenting it, say no without explanation, or copy a clause from an old agreement they don't fully understand.
                  </p>
                  <p>
                    This creates disputes. Tenants claim they were verbally allowed something. Landlords can't prove what was agreed. Courts see these cases every day.
                  </p>
                  <p className="font-medium text-slate-700">
                    ClauseKit helps you draft a clear, written clause in under 2 minutes — one that protects you and sets expectations honestly.
                  </p>
                </div>
              </div>

              {/* Visual comparison */}
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">❌ Without ClauseKit</p>
                  <p className="text-sm text-slate-600 font-mono leading-relaxed italic">
                    "Tenant can keep dog. Will pay for damage."
                  </p>
                  <p className="text-xs text-red-400 mt-2">Handwritten, vague, unenforceable</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">✓ With ClauseKit</p>
                  <p className="text-sm text-slate-700 font-serif leading-relaxed">
                    "The Tenant shall not keep any pet or animal at the premises without prior written consent from the Landlord. The Tenant shall be solely responsible for any damage caused by the permitted pet to the premises, fixtures, or flooring..."
                  </p>
                  <p className="text-xs text-teal-600 mt-2 font-medium">Clear, practical, copy-ready</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="bg-[#faf8f4] py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Process</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">How it works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="relative">
                  <div className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                    <div className="font-display text-5xl font-bold text-teal-100 mb-4">{step.num}</div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {step.num !== '03' && (
                    <div className="hidden md:block absolute top-1/2 -right-4 z-10 text-slate-200">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXAMPLE CARDS */}
        <section id="examples" className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">Examples</p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900">Common clause templates</h2>
              </div>
              <Link href="/builder" className="text-sm font-medium text-teal-700 hover:text-teal-800 flex items-center gap-1.5 whitespace-nowrap">
                See all clauses →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {examples.map((ex, i) => (
                <ExampleCard key={i} {...ex} />
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="bg-teal-900 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">Why ClauseKit</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">Built for landlords who own 1–10 properties</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustPoints.map((point, i) => (
                <div key={i} className="bg-teal-800/50 border border-teal-700 rounded-2xl p-6 hover:bg-teal-800 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-teal-200 mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{point.title}</h3>
                  <p className="text-teal-300 text-sm leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="bg-[#faf8f4] py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              Ready to protect your rental?
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Create your first clause in under 2 minutes. No sign-up required.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal-800 active:scale-[0.98] transition-all shadow-lg shadow-teal-900/10 text-lg"
            >
              Build a Clause — it's free
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="mt-4 text-xs text-slate-400">Free to use. Always. For landlords, by landlords.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}