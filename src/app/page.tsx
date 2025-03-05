import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Voxcruit</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl">
              Master technical interviews with our conversational AI-powered interview simulator. 
              Practice coding problems with a virtual interviewer that guides you just like a real tech interview.
            </p>
            <Link 
              href="/setup" 
              className="group flex items-center bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Start Now
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Filter Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Find Your Challenge</h2>
          
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
          
          {/* Featured Problems */}
          <h3 className="text-2xl font-bold mb-6 text-white">Featured Problems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <Link 
                key={problem.id}
                href={`/setup?problem=${problem.id}`}
                className="bg-slate-700 rounded-lg p-5 hover:bg-slate-600 transition-colors shadow-md shadow-black/20"
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
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-300 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Choose a Problem</h3>
              <p className="text-slate-300">Select from our library of coding challenges or get a random one.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-300 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Meet Your Interviewer</h3>
              <p className="text-slate-300">Choose an AI interviewer that matches your preferred interview style.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-300 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Code & Communicate</h3>
              <p className="text-slate-300">Solve the problem while explaining your approach to your AI interviewer.</p>
            </div>
          </div>
        </div>
      </section>
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
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.'
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'Merge two sorted linked lists and return it as a sorted list.'
  }
]
