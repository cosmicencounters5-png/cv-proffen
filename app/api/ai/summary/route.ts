import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { role, experience } = await req.json()

    const prompt = `
Skriv et profesjonelt CV-sammendrag på norsk.
Ønsket stilling: ${role}
Erfaring: ${experience}
Hold det kort, konkret og jobb-fokusert.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du er en profesjonell CV-rådgiver." },
        { role: "user", content: prompt },
      ],
    })

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("AI error:", error)
    return NextResponse.json(
      { error: "AI-feil" },
      { status: 500 }
    )
  }
}