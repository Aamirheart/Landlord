import Link from 'next/link'

const categoryIcons = {
  pet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/>
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
    </svg>
  ),
  subletting: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  lateRent: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      <path d="M12 7v5l3 3"/>
    </svg>
  ),
  maintenance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
}

export default function ExampleCard({ category, title, preview, icon, href }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-teal-200 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
          {categoryIcons[icon] || categoryIcons.maintenance}
        </div>
        <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">{category}</span>
      </div>

      <div>
        <h3 className="font-semibold text-slate-800 text-base mb-1.5">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{preview}</p>
      </div>

      <Link
        href={href || '/builder'}
        className="mt-auto text-sm font-medium text-teal-700 flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
      >
        Use this template
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  )
}