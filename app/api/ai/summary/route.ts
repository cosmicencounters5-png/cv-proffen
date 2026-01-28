import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const cv = await req.json()

    const name =
      cv?.personal?.firstName || cv?.personal?.lastName
        ? `${cv.personal.firstName} ${cv.personal.lastName}`.trim()
        : "Kandidaten"

    const title = cv?.personal?.title || "en relevant stilling"

    const summary = `${name} søker ${title}. Har erfaring innen relevante områder og er motivert for nye utfordringer. Strukturert, lærevillig og opptatt av å levere kvalitet.`

    return NextResponse.json({ summary })
  } catch (error) {
    return NextResponse.json(
      { error: "Kunne ikke generere sammendrag" },
      { status: 500 }
    )
  }
}