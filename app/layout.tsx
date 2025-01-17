import './globals.css'
import type { Metadata } from 'next'
import { titleFont, textFont } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'SOLife - Solana Trading Life Simulator',
  description: 'Trade and upgrade your virtual life on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${titleFont.variable} ${textFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}

