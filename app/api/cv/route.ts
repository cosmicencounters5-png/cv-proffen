import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

const USER_ID = "00000000-0000-0000-0000-000000000001"

// HENT CV
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("cvs")
      .select("data")
      .eq("user_id", USER_ID)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data.data)
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch CV" },
      { status: 500 }
    )
  }
}

// LAGRE CV
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { error } = await supabaseServer.from("cvs").insert({
      user_id: USER_ID,
      data: body,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save CV" },
      { status: 500 }
    )
  }
}