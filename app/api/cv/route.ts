import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"
import { CV } from "@/types/cv"

const USER_ID = "demo-user" // midlertidig, auth kommer senere

export async function POST(req: Request) {
  try {
    const cv: CV = await req.json()

    const { error } = await supabaseServer
      .from("cvs")
      .insert({
        user_id: USER_ID,
        data: cv,
      })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}