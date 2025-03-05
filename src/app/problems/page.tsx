'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProblemsPage() {
  return (
    <main className="py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10 text-white">Practice Problems</h1>
        
        {/* Problem Filter Section - Moved from home page */}
        <div className="bg-slate-700 rounded-xl shadow-md shadow-black/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
              <select className="w-full p-3 border border-slate-600 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select className="w-full p-3 border border-slate-600 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Any Category</option>
                <option value="array">Arrays</option>
                <option value="string">Strings</option>
                <option value="hashmap">Hash Maps</option>
                <option value="linkedlist">Linked Lists</option>
                <option value="tree">Trees</option>
                <option value="graph">Graphs</option>
                <option value="dp">Dynamic Programming</option>
                <option value="slidingwindow">Sliding Window</option>
              </select>
            </div>
            
            {/* Random Problem Button */}
            <div className="flex items-end">
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Random Problem
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
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
              <p className="text-slate-300">{problem.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

// Sample problems data (this would come from your database/API)
const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'
  },
  // ... other problems
] 