import { NextResponse } from "next/server"
import OpenAI from "openai"
import { CV } from "@/types/cv"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const cv: CV = await req.json()

    const prompt = `
Skriv et profesjonelt CV-sammendrag på norsk basert på denne informasjonen:

Navn: ${cv.personal.firstName} ${cv.personal.lastName}
Tittel: ${cv.personal.title}

Arbeidserfaring:
${cv.experience
  .map(
    (e) =>
      `- ${e.role} hos ${e.company} (${e.from} – ${e.to}): ${e.description ?? ""}`
  )
  .join("\n")}

Utdanning:
${cv.education
  .map((e) => `- ${e.degree} ved ${e.school} (${e.from} – ${e.to})`)
  .join("\n")}

Ferdigheter:
${cv.skills.map((s) => s.name).join(", ")}

Sammendraget skal være 3–4 setninger, profesjonelt og selgende.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })

    const summary = completion.choices[0]?.message?.content

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("AI SUMMARY ERROR:", error)
    return NextResponse.json(
      { error: "Kunne ikke generere sammendrag" },
      { status: 500 }
    )
  }
}