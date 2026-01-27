import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"
import { CV } from "@/types/cv"

const USER_ID = "00000000-0000-0000-0000-000000000001"

export async function GET() {
  const { data, error } = await supabaseServer
    .from("cvs")
    .select("data")
    .eq("user_id", USER_ID)
    .single()

  console.log("GET CV", { data, error })

  if (error || !data) {
    return NextResponse.json(null)
  }

  return NextResponse.json(data.data)
}

export async function POST(req: Request) {
  const cv: CV = await req.json()

  const { error } = await supabaseServer
    .from("cvs")
    .upsert({
      user_id: USER_ID,
      data: cv,
      updated_at: new Date().toISOString(),
    })

  console.log("SAVE CV", { error })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}