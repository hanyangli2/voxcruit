import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, problemId } = await req.json()
    
    // You could add problem-specific context here based on problemId
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // or your preferred model
      messages: [
        {
          role: "system",
          content: "You are an experienced technical interviewer helping a candidate solve a coding problem. Ask probing questions about their approach, time and space complexity, edge cases, and guide them toward a solution without giving away the answer immediately. Act like a real interviewer at a top tech company."
        },
        ...messages
      ],
      temperature: 0.7,
    })
    
    return NextResponse.json({ 
      message: response.choices[0].message.content 
    })
    
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}