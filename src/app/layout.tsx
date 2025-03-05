import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voxcruit - Conversational AI Technical Interview Practice',
  description: 'Practice technical interviews with an AI assistant that guides you through problems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        <div className="min-h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
} 