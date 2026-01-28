import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

const USER_ID = "00000000-0000-0000-0000-000000000001"

export async function POST(req: Request) {
  try {
    const cv = await req.json()

    const { error } = await supabaseServer
      .from("cvs")
      .upsert({
        user_id: USER_ID,
        data: cv,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabaseServer
    .from("cvs")
    .select("data")
    .eq("user_id", USER_ID)
    .single()

  if (error || !data) {
    return NextResponse.json({ cv: null })
  }

  return NextResponse.json({ cv: data.data })
}