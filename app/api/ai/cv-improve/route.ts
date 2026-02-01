import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { section, text } = await req.json()

    if (!section || !text) {
      return NextResponse.json(
        { error: "Missing section or text" },
        { status: 400 }
      )
    }

    const prompt = `
Du er en profesjonell karriererådgiver.
Forbedre teksten nedenfor slik at den passer i en moderne CV.

Seksjon: ${section}

Tekst:
${text}

Krav:
- Kort og profesjonelt
- Aktivt språk
- Ingen emoji
- Ingen overskrifter
- Kun forbedret tekst
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    })

    const improved = completion.choices[0].message.content

    return NextResponse.json({ text: improved })
  } catch (err) {
    console.error("OpenAI error", err)
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    )
  }
}