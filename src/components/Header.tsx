'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path ? 'border-blue-500' : 'border-transparent hover:border-slate-600'
  }

  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center text-xl font-bold text-white"
            >
              Voxcruit
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="flex items-center">
            <nav className="flex space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-slate-200 ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                href="/problems"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-slate-200 ${isActive('/problems')}`}
              >
                Problems
              </Link>
            </nav>
          </div>

          {/* Right side - Profile (placeholder) */}
          <div className="flex items-center">
            <button className="text-slate-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 