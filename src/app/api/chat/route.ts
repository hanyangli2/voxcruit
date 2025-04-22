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
      Your job is to:
      - Ask the candidate how they would approach the problem before they start writing code.
      - Once they explain their plan, ask them to implement it.
      - After they finish coding, ask them to walk through their code line by line.
      - Once they've done that, ask them to explain the time and space complexity.
      - Throughout, keep things conversational, realistic, and brief.
      - If they skip a step (e.g., don't walk through their code), gently redirect them back.
      `,
        wrap_up: `
      You're in the *wrap-up stage* of the interview.

      Ask the candidate about:
      - The time and space complexity of their solution
      - Any tradeoffs or alternative approaches they considered
      - What they might improve about their code if given more time

      Then, give brief and constructive feedback on how they approached the problem overall.
      End the conversation positively and professionally, like a real tech interviewer.
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