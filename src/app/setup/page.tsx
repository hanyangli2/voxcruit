'use client'

import { useState  } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
// import Image from 'next/image'
import { MicrophoneIcon, SpeakerWaveIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const interviewers = [
  { id: 'alex', name: 'Alex', image: '/interviewers/alex.png', description: 'Friendly and encouraging. Provides helpful hints when you get stuck.' },
  { id: 'taylor', name: 'Taylor', image: '/interviewers/taylor.png', description: 'Challenging but fair. Asks thoughtful follow-up questions about your code.' },
  { id: 'jordan', name: 'Jordan', image: '/interviewers/jordan.png', description: 'Straight to the point. Focuses on efficiency and optimal solutions.' },
]

export default function SetupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const problemId = searchParams.get('problem') || 'two-sum'
  
  const [selectedInterviewer, setSelectedInterviewer] = useState(interviewers[0].id)
  const [micTested, setMicTested] = useState(false)
  const [audioTested, setAudioTested] = useState(false)
  const [currentInterviewerIndex, setCurrentInterviewerIndex] = useState(0)
  
  // Rotate through interviewers for selection
  const handlePrevInterviewer = () => {
    setCurrentInterviewerIndex((prev) => 
      prev === 0 ? interviewers.length - 1 : prev - 1
    )
    setSelectedInterviewer(interviewers[currentInterviewerIndex].id)
  }
  
  const handleNextInterviewer = () => {
    setCurrentInterviewerIndex((prev) => 
      prev === interviewers.length - 1 ? 0 : prev + 1
    )
    setSelectedInterviewer(interviewers[currentInterviewerIndex].id)
  }
  
  // Simulate microphone test
  const testMicrophone = () => {
    // In a real app, you would check microphone access here
    setTimeout(() => {
      setMicTested(true)
    }, 1500)
  }
  
  // Simulate audio test
  const testAudio = () => {
    // In a real app, you would play a test sound here
    setTimeout(() => {
      setAudioTested(true)
    }, 1500)
  }
  
  const startInterview = () => {
    router.push(`/interview/${problemId}?interviewer=${selectedInterviewer}`)
  }
  
  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-md shadow-black/20 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Set Up Your Interview</h1>
          
          {/* Interviewer Selection */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-white">Choose Your Interviewer</h2>
            
            <div className="flex justify-center items-center space-x-6">
              <button 
                onClick={handlePrevInterviewer}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                {/* Left arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="w-64 p-6 bg-slate-700 rounded-lg text-center">
                <div className="w-32 h-32 mx-auto bg-blue-800 rounded-full flex items-center justify-center mb-4">
                  {/* This would be a real image in production */}
                  <span className="text-4xl font-bold text-white">
                    {interviewers[currentInterviewerIndex].name[0]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{interviewers[currentInterviewerIndex].name}</h3>
                <p className="text-slate-300">{interviewers[currentInterviewerIndex].description}</p>
              </div>
              
              <button 
                onClick={handleNextInterviewer}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                {/* Right arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Audio Setup */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-600 rounded-lg bg-slate-700">
              <div className="flex items-center mb-4">
                <MicrophoneIcon className="h-6 w-6 text-slate-300 mr-2" />
                <h3 className="text-lg font-medium text-white">Test Your Microphone</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Make sure your microphone is working so your interviewer can hear you.
              </p>
              <button 
                onClick={testMicrophone}
                className={`w-full py-2 px-4 rounded-lg ${
                  micTested 
                    ? 'bg-green-800 text-green-200 border border-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={micTested}
              >
                {micTested ? 'Microphone Working ✓' : 'Test Microphone'}
              </button>
            </div>
            
            <div className="p-6 border border-slate-600 rounded-lg bg-slate-700">
              <div className="flex items-center mb-4">
                <SpeakerWaveIcon className="h-6 w-6 text-slate-300 mr-2" />
                <h3 className="text-lg font-medium text-white">Test Your Audio</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Make sure you can hear your interviewers questions and feedback.
              </p>
              <button 
                onClick={testAudio}
                className={`w-full py-2 px-4 rounded-lg ${
                  audioTested 
                    ? 'bg-green-800 text-green-200 border border-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={audioTested}
              >
                {audioTested ? 'Audio Working ✓' : 'Test Audio'}
              </button>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="mb-10 p-6 bg-slate-700 rounded-lg border border-slate-600">
            <h2 className="text-xl font-semibold mb-4 text-white">How Your Interview Will Work</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-800 text-blue-200 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
                <span className="text-slate-300">Your interviewer will introduce the problem and ask you to solve it.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-800 text-blue-200 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
                <span className="text-slate-300">Talk through your approach before coding - just like in a real interview.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-800 text-blue-200 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
                <span className="text-slate-300">Code your solution in the editor while explaining your thought process.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-800 text-blue-200 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">4</span>
                <span className="text-slate-300">Your interviewer will ask follow-up questions about time/space complexity.</span>
              </li>
            </ul>
          </div>
          
          {/* Start Button */}
          <div className="text-center">
            <button 
              onClick={startInterview}
              className="inline-flex items-center bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Interview
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 