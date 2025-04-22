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
    You're a friendly, experienced technical interviewer at a top tech company.
    You're chatting with a candidate working on the problem: "${problem}".
    
    Here is their current code (which may be incomplete):
    \`\`\`
    ${code || 'No code submitted yet.'}
    \`\`\`
    
    Your goals:
  - Guide them through the problem like a real human would
  - Keep your tone conversational and engaging — don't lecture
  - Ask follow-up questions, challenge their assumptions, but never give the full solution
  - Your responses should be brief — think 1–3 sentences, not paragraphs
  - Use natural, informal language. Avoid sounding like a robot.
  - You can use a touch of humor or encouragement, like a real person might.
    `
    // Initial assistant message to start the conversation
    const initialAssistantMessage = {
      role: "assistant",
      content: `Hello! I'm your technical interviewer for today. Let's start with introductions. Can you tell me a bit about yourself and your experience with coding?`
    }
    const messageHistory = [...messages]

    if (messages.length === 0) {
      messageHistory.unshift(initialAssistantMessage)
    }

    // Call OpenAI API 
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // or your preferred model
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...messageHistory
      ],
      temperature: 0.7,
      max_tokens: 150
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