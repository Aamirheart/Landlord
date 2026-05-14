import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

export const metadata = {
  title: 'ClauseKit — Lease Clause Builder for Landlords',
  description: 'Generate clear, practical lease clauses in plain English. Built for small landlords in India and emerging markets.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-[#faf8f4] text-slate-800 antialiased">
        {children}
      </body>
    </html>
  )
}