'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import CodeEditor from '@/components/CodeEditor'
import { XMarkIcon, ArrowPathIcon, PlayIcon } from '@heroicons/react/24/outline'
import { getProblemById } from '@/data/problems'
import ChatInterface from '@/components/ChatInterface'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function InterviewPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const problemId = params.problemId as string
  const interviewerId = searchParams.get('interviewer') || 'alex'
  
  const [code, setCode] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showInterviewer, setShowInterviewer] = useState(true)
  
  const [showChat, setShowChat] = useState(true)
  const problem = getProblemById(problemId)
  
  // Initialize code editor with starter code
  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode)
    }
  }, [problem])
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }
  
  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }])
    
    // In a real app, this would call your API endpoint
    setTimeout(() => {
      // Simulate interviewer response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'That approach makes sense. Have you considered edge cases like empty arrays or no valid solution?' 
      }])
    }, 1500)
  }
  
  const runCode = () => {
    setIsRunning(true)
    
    // In a real app, this would execute the code and return results
    setTimeout(() => {
      setIsRunning(false)
      
      // Simulate interviewer feedback on code execution
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Your code ran successfully! The output matches the expected result. Can you explain the time and space complexity of your solution?' 
      }])
    }, 2000)
  }
  
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">{problem?.title || 'Coding Problem'}</h1>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              problem?.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
              problem?.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
              'bg-red-900 text-red-300'
            }`}>
              {problem?.difficulty || 'Unknown'}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Problem Description */}
        <div className="w-1/3 p-6 bg-slate-800 border-r border-slate-700 overflow-y-auto">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-white">{problem?.title}</h2>
            <div className="whitespace-pre-line text-slate-300">
              {problem?.description}
            </div>
          </div>
        </div>
        
        {/* Coding Panel */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 relative">
            <CodeEditor 
              code={code} 
              onChange={handleCodeChange} 
              language={problem?.language || 'javascript'} 
            />
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Interviewer Panel */}
          {showChat && (
            <div className="bg-slate-800 border-t border-slate-700 p-4 flex-1 overflow-y-auto">
              <ChatInterface problem={problem?.title || ''} code={code} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 