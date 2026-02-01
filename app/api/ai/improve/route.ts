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

  // 🧠 Prompt per type
  const prompt = getPrompt(type, content)

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Du er en profesjonell norsk karriereveileder som forbedrer CV-tekster. Skriv klart, konkret og uten klisjeer.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.4,
  })

  const improved = completion.choices[0]?.message?.content

  return NextResponse.json({ result: improved })
}

function getPrompt(type: string, content: any) {
  switch (type) {
    case "summary":
      return `Forbedre dette CV-sammendraget på profesjonelt norsk:\n\n${content}`

    case "experience":
      return `Forbedre denne arbeidserfaringen for en CV. Behold fakta, forbedre språk:\n\n${JSON.stringify(
        content,
        null,
        2
      )}`

    case "education":
      return `Forbedre denne utdanningsbeskrivelsen for en CV:\n\n${JSON.stringify(
        content,
        null,
        2
      )}`

    case "full-cv":
      return `Forbedre hele denne CV-en helhetlig og konsistent:\n\n${JSON.stringify(
        content,
        null,
        2
      )}`

    default:
      return content
  }
}