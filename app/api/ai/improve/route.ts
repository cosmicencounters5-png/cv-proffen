import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@/lib/supabaseServer"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const supabase = createClient()

  // 🔐 Auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { type, content } = await req.json()

  if (!type || !content) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 })
  }

  const prompt = getPrompt(type, content)

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
Du er en profesjonell norsk karriereveileder.
DU SKAL KUN SVARE MED GYLDIG JSON.
IKKE forklar noe.
IKKE bruk markdown.
IKKE bruk tekst utenfor JSON.

JSON-format:
{
  "summary": string,
  "experience": [],
  "education": [],
  "skills": []
}
          `.trim(),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content

    if (!raw) {
      throw new Error("Empty AI response")
    }

    // 🔥 KRITISK: valider JSON
    const parsed = JSON.parse(raw)

    return NextResponse.json({ result: parsed })
  } catch (err) {
    console.error("AI error:", err)
    return NextResponse.json(
      { error: "AI processing failed" },
      { status: 500 }
    )
  }
}

function getPrompt(type: string, content: any) {
  switch (type) {
    case "full-cv":
      return `
Forbedre hele denne CV-en helhetlig og profesjonelt.
Behold fakta, forbedre språk og struktur.
Returner KUN gyldig JSON i spesifisert format.

CV:
${JSON.stringify(content)}
      `.trim()

    case "summary":
      return `Forbedre dette sammendraget:\n${content}`

    case "experience":
      return `Forbedre denne arbeidserfaringen:\n${JSON.stringify(content)}`

    case "education":
      return `Forbedre denne utdanningen:\n${JSON.stringify(content)}`

    default:
      return content
  }
}