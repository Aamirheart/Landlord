'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ClauseOutput from '../../components/ClauseOutput'
import Button from '../../components/Button'
import { generateClause } from '../../lib/clauseGenerator'

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'independentHouse', label: 'Independent House' },
  { value: 'commercialShop', label: 'Commercial Shop' },
  { value: 'sharedAccommodation', label: 'Shared Accommodation' },
]

const CLAUSE_CATEGORIES = [
  { value: 'pet', label: 'Pet Permission', icon: '🐾' },
  { value: 'subletting', label: 'Subletting', icon: '🏠' },
  { value: 'lateRent', label: 'Late Rent Payment', icon: '📅' },
  { value: 'securityDeposit', label: 'Security Deposit', icon: '💰' },
  { value: 'maintenance', label: 'Repairs & Maintenance', icon: '🔧' },
  { value: 'guest', label: 'Guest Stay', icon: '👥' },
  { value: 'earlyTermination', label: 'Early Termination', icon: '📋' },
  { value: 'custom', label: 'Custom Situation', icon: '✏️' },
]

const TONES = [
  { value: 'balanced', label: 'Balanced', desc: 'Fair to both sides' },
  { value: 'strict', label: 'Strict landlord-protective', desc: 'Maximum protection for you' },
  { value: 'friendly', label: 'Friendly but clear', desc: 'Warm tone, still firm' },
]

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh', 'Puducherry',
]

const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
const labelClass = "block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5"

export default function BuilderPage() {
  const [formData, setFormData] = useState({
    landlordName: '',
    tenantName: '',
    city: '',
    state: '',
    propertyType: '',
    category: '',
    situation: '',
    tone: 'balanced',
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.category) newErrors.category = 'Please select a clause category'
    if (!formData.situation.trim()) newErrors.situation = 'Please describe the situation'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    // Simulate a brief loading state for UX
    // TO REPLACE: swap this with an actual async API call
    await new Promise(resolve => setTimeout(resolve, 800))

    const generated = generateClause(formData)
    setResult(generated)
    setLoading(false)

    // Scroll to result
    setTimeout(() => {
      document.getElementById('clause-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    setResult(null)
    setFormData({
      landlordName: '',
      tenantName: '',
      city: '',
      state: '',
      propertyType: '',
      category: '',
      situation: '',
      tone: 'balanced',
    })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f4]">
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">Lease Clause Builder</h1>
                <p className="text-slate-500 text-sm sm:text-base">Describe your situation and get a clear, copy-ready clause in seconds.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FORM */}
            <div className="lg:col-span-2">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Party details */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">1</span>
                      Party & Property Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Landlord Name</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Your full name"
                          value={formData.landlordName}
                          onChange={e => handleChange('landlordName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Tenant Name</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Tenant's full name"
                          value={formData.tenantName}
                          onChange={e => handleChange('tenantName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="e.g. Mumbai, Bengaluru"
                          value={formData.city}
                          onChange={e => handleChange('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>State</label>
                        <select
                          className={inputClass}
                          value={formData.state}
                          onChange={e => handleChange('state', e.target.value)}
                        >
                          <option value="">Select state</option>
                          {INDIAN_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Property Type</label>
                        <select
                          className={inputClass}
                          value={formData.propertyType}
                          onChange={e => handleChange('propertyType', e.target.value)}
                        >
                          <option value="">Select property type</option>
                          {PROPERTY_TYPES.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Clause category */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">2</span>
                      What clause do you need?
                    </h2>
                    {errors.category && (
                      <p className="text-xs text-red-500 mb-3 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6" cy="9" r="0.5" fill="currentColor"/></svg>
                        {errors.category}
                      </p>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CLAUSE_CATEGORIES.map(cat => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => handleChange('category', cat.value)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                            formData.category === cat.value
                              ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                          }`}
                        >
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-center leading-tight">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Situation */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">3</span>
                      Describe the situation
                    </h2>
                    {errors.situation && (
                      <p className="text-xs text-red-500 mb-3 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6" cy="9" r="0.5" fill="currentColor"/></svg>
                        {errors.situation}
                      </p>
                    )}
                    <textarea
                      className={`${inputClass} min-h-[120px] resize-y`}
                      placeholder="Example: My tenant wants to keep a dog in the apartment, but I want them to be responsible for any damage and noise complaints from neighbours."
                      value={formData.situation}
                      onChange={e => handleChange('situation', e.target.value)}
                    />
                    <p className="text-xs text-slate-400 mt-2">Write it like you'd tell a friend. No legal terms needed.</p>
                  </div>

                  {/* Tone */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6">
                    <h2 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">4</span>
                      Clause tone
                    </h2>
                    <div className="space-y-2">
                      {TONES.map(tone => (
                        <label
                          key={tone.value}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.tone === tone.value
                              ? 'bg-teal-50 border-teal-400'
                              : 'bg-white border-slate-200 hover:border-teal-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="tone"
                            value={tone.value}
                            checked={formData.tone === tone.value}
                            onChange={e => handleChange('tone', e.target.value)}
                            className="mt-0.5 accent-teal-600"
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-700">{tone.label}</p>
                            <p className="text-xs text-slate-400">{tone.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-700 text-white font-semibold py-4 px-6 rounded-xl hover:bg-teal-800 active:scale-[0.99] transition-all shadow-lg shadow-teal-900/10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Generating clause...
                      </>
                    ) : (
                      <>
                        Generate Clause
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div id="clause-result">
                  <ClauseOutput result={result} onReset={handleReset} />
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="space-y-4">
              {/* Tips card */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-teal-800 mb-3">💡 Tips for better clauses</h3>
                <ul className="space-y-2">
                  {[
                    'Be specific about what the tenant is asking',
                    'Mention any previous verbal agreements',
                    'Include relevant property details',
                    'Note any special circumstances',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-teal-700">
                      <span className="w-4 h-4 rounded-full bg-teal-200 flex items-center justify-center text-teal-800 font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="#b45309" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M8 6V9" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8" cy="11" r="0.6" fill="#b45309"/>
                  </svg>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Generated clauses are for general drafting help only. Not legal advice. Consult a lawyer for high-value or disputed matters.
                  </p>
                </div>
              </div>

              {/* Popular categories */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Popular categories</h3>
                <div className="space-y-1.5">
                  {CLAUSE_CATEGORIES.slice(0, 5).map(cat => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        if (!result) handleChange('category', cat.value)
                      }}
                      className="w-full text-left text-xs text-slate-600 hover:text-teal-700 py-1.5 flex items-center gap-2 transition-colors"
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}