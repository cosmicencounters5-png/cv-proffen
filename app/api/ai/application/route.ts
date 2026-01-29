import { NextResponse } from "next/server"
import OpenAI from "openai"
import { CV } from "@/types/cv"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      cv,
      jobTitle,
      company,
      jobAd,
    }: {
      cv: CV
      jobTitle: string
      company: string
      jobAd?: string
    } = body

    if (!cv || !jobTitle || !company) {
      return NextResponse.json(
        { error: "Manglende data" },
        { status: 400 }
      )
    }

    const prompt = `
Du er en profesjonell karriererådgiver.

Skriv en personlig, profesjonell og overbevisende jobbsøknad basert på følgende:

NAVN:
${cv.personal.firstName} ${cv.personal.lastName}

TITTEL:
${cv.personal.title}

ERFARING:
${cv.experience
  .map(
    (e) =>
      `- ${e.role} hos ${e.company} (${e.from} – ${e.to || "nå"})`
  )
  .join("\n")}

UTDANNING:
${cv.education
  .map(
    (e) =>
      `- ${e.degree} ved ${e.school} (${e.from} – ${e.to})`
  )
  .join("\n")}

FERDIGHETER:
${cv.skills.join(", ")}

STILLING:
${jobTitle}

ARBEIDSGIVER:
${company}

${jobAd ? `STILLINGSANNONSE:\n${jobAd}` : ""}

Søknaden skal være:
- På norsk
- Maks 1 A4
- Profesjonell, men personlig
- Strukturert med avsnitt
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du skriver jobbsøknader." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    })

    const text = completion.choices[0]?.message?.content

    return NextResponse.json({ text })
  } catch (err) {
    console.error("AI APPLICATION ERROR:", err)
    return NextResponse.json(
      { error: "AI-feil" },
      { status: 500 }
    )
  }
}