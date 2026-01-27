import { NextResponse } from "next/server"
import { CV } from "@/types/cv"

let storedCV: CV | null = null

export async function GET() {
  if (!storedCV) {
    return NextResponse.json(null)
  }
  return NextResponse.json(storedCV)
}

export async function POST(req: Request) {
  const cv: CV = await req.json()
  storedCV = cv
  return NextResponse.json({ success: true })
}