import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({
    summary: "AI kommer i fase 2",
  })
}