import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

const USER_ID = "00000000-0000-0000-0000-000000000001"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("POST /api/cv BODY:", body)

    const { data, error } = await supabaseServer
      .from("cvs")
      .insert({
        user_id: USER_ID,
        data: body,
      })
      .select()

    console.log("SUPABASE INSERT:", { data, error })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("POST /api/cv FAILED", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}