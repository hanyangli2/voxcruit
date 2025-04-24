'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { problems  } from '@/data/problems'

type Difficulty = 'Easy' | 'Medium' | 'Hard' | ''

export default function ProblemsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('')
  const [selectedTag, setSelectedTag] = useState('')

  // Get unique tags from all problems
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    problems.forEach(problem => {
      problem.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter problems based on selected filters
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesDifficulty = !selectedDifficulty || problem.difficulty === selectedDifficulty
      const matchesTag = !selectedTag || problem.tags.includes(selectedTag)
      return matchesDifficulty && matchesTag
    })
  }, [selectedDifficulty, selectedTag])

  // Handle random problem selection
  const handleRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * filteredProblems.length)
    const randomProblem = filteredProblems[randomIndex]
    if (randomProblem) {
      window.location.href = `/setup?problem=${randomProblem.id}`
    }
  }

  return (
    <main className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10 text-white">Practice Problems</h1>
        
        {/* Problem Filter Section */}
        <div className="bg-slate-700 rounded-xl shadow-md shadow-black/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
              <select 
                className="w-full p-3 border border-slate-600 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
              >
                <option value="">Any Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select 
                className="w-full p-3 border border-slate-600 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">Any Category</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Random Problem Button */}
            <div className="flex items-end">
              <button 
                onClick={handleRandomProblem}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Random Problem
              </button>
            </div>
          </div>
          
          {/* Results count */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300">
              Showing {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
            </span>
            <button 
              onClick={() => {
                setSelectedDifficulty('')
                setSelectedTag('')
              }}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <Link 
              key={problem.id}
              href={`/setup?problem=${problem.id}`}
              className="bg-slate-700 rounded-lg p-5 hover:bg-slate-600 transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold text-white">{problem.title}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-slate-300 mb-3">{problem.description}</p>
              <div className="flex flex-wrap gap-2">
                {problem.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* No results message */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-300 text-lg">
              No problems found with the selected filters.
            </p>
          </div>
        )}
      </div>
    </main>
  )
} 