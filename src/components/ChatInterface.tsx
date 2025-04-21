'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

interface ChatInterfaceProps {
    problem: string 
    code: string
}

export default function ChatInterface({ problem, code }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(scrollToBottom, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage: Message = { role: 'user', content: input }
        const updatedMessages = [...messages, userMessage]

        setMessages(updatedMessages)
        setInput('')

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    messages: updatedMessages, 
                    problem,
                    code,
                }),
            })
        

        const data = await res.json()
        const assistantMessage: Message = { role: 'assistant', content: data.message }  
        setMessages (prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('Error calling OpenAI:', error)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I ran into an error. Try Again' },])
        }
    }

    return (
        <div className="flex flex-col h-full bg-slate-900">
            {/* Chat Window */}
            <div className="flex-1 p-4 overflow-auto">
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                    >
                        <div 
                            className={`inline-block max-w-[80%] p-3 rounded-lg ${
                                message.role === 'user' 
                                ? 'bg-blue-700 text-white rounded-br-none' 
                                : 'bg-slate-700 text-slate-200 rounded-bl-none'
                            }`}
                        >
                            {message.role === 'assistant' ? (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                message.content
                            )}
                        </div>
                     </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <form onSubmit={handleSubmit} className="border-t border-slate-700 p-4">
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                        className="flex-1 p-2 border border-slate-600 bg-slate-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
                    >
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    )
}