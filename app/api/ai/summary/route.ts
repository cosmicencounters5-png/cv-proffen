import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { cv } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      )
    }

    const prompt = `
Skriv et profesjonelt, kort CV-sammendrag på norsk (3–4 setninger).
Tilpass for jobbsøknad.

Navn: ${cv.personal.firstName} ${cv.personal.lastName}
Ønsket stilling: ${cv.personal.title}

Arbeidserfaring:
${cv.experience
  .map((e: any) => `- ${e.role} hos ${e.company}`)
  .join("\n")}

Ferdigheter:
${cv.skills.map((s: any) => `- ${s.name}`).join("\n")}
`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Du er en profesjonell karriereveileder." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
    })

    const data = await response.json()

    const summary =
      data.choices?.[0]?.message?.content?.trim() || ""

    return NextResponse.json({ summary })
  } catch (err) {
    console.error("AI SUMMARY ERROR:", err)
    return NextResponse.json(
      { error: "AI error" },
      { status: 500 }
    )
  }
}