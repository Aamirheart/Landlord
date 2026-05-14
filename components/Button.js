export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-teal-700 text-white px-6 py-3 hover:bg-teal-800 active:scale-[0.98] shadow-sm',
    secondary: 'bg-white text-teal-800 px-6 py-3 border border-teal-200 hover:border-teal-400 hover:bg-teal-50 active:scale-[0.98]',
    ghost: 'text-teal-700 px-4 py-2 hover:bg-teal-50 active:scale-[0.98]',
    danger: 'bg-white text-slate-600 px-4 py-2 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-sm',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}