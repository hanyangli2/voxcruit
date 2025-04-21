import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, problem, code } = await req.json()

    // You could add problem-specific context here based on problemId
    const systemPrompt = `
    You are an experienced technical interviewer at a top tech company. 
    The candidate is solving a problem: "${problem}".
    
    Here is their current code (which may be incomplete):
    \`\`\`
    ${code || 'No code submitted yet.'}
    \`\`\`
    
    Your job is to help the candidate think through the problem:
    - Ask clarifying questions about their approach
    - Explore edge cases they may have missed
    - Challenge their assumptions about time and space complexity
    - Do NOT give the full solution. Act like a human interviewer.
    `
    // Call OpenAI API 
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // or your preferred model
      messages: [
        {
          role: "system",
          content: systemPrompt
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