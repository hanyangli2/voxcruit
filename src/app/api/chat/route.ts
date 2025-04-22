import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, problem, code, stage } = await req.json()

    const stageInstructions: Record<string, string> = {
      intro: `
      You're in the *intro stage*. Your goal is to start the interview naturally.

      Start by:
      - Introducing yourself as the interviewer
      - Asking the candidate about their background, interests, and coding experience
      - DO NOT introduce the problem yet — wait until the candidate responds

      After the candidate responds:
      - Introduce the problem: "${problem}"
      - Ask if they have any clarifying questions or edge cases in mind

      Respond like a real interviewer — short, friendly, curious.
      Don't lecture or front-load too much info at once.
      `,
        coding: `
      You're in the *coding stage*. The candidate is thinking through or writing their solution.
      Ask them to walk through their thought process before coding.
      Support them as they write code and ask questions.
      When they're done, ask them to step through it line by line.
      Do not give the full solution, just nudge or prompt where needed.
      `,
        wrap_up: `
      You're in the *wrap-up stage*. Ask the candidate about time and space complexity.
      Discuss tradeoffs or alternative approaches.
      End the interview in a professional, encouraging tone.
      Then give brief, constructive feedback on how they did.
      `
    }
    
    const dynamicInstructions = stageInstructions[stage] || stageInstructions.intro
    
    // You could add problem-specific context here based on problemId
    const systemPrompt = `
      You're a friendly, experienced technical interviewer at a top tech company.
      You're chatting with a candidate working on the problem: "${problem}".
      
      Here is their current code (which may be incomplete):
      \`\`\`
      ${code || 'No code submitted yet.'}
      \`\`\`
      
      ${dynamicInstructions}
      
      Always make sure to:
      - Keep your tone conversational and engaging — don't lecture
      - Redirect if candidate skips a phase
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

    // if (messages.length === 0) {
    //   messageHistory.unshift(initialAssistantMessage)
    // }

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