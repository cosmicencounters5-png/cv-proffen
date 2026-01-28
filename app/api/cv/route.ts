import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

const USER_ID = "00000000-0000-0000-0000-000000000001"

export async function GET() {
  const { data, error } = await supabaseServer
    .from("cvs")
    .select("data")
    .eq("user_id", USER_ID)
    .single()

  if (error) {
    return NextResponse.json({ data: null })
  }

  return NextResponse.json({ data: data?.data ?? null })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Sjekk om CV allerede finnes
    const { data: existing } = await supabaseServer
      .from("cvs")
      .select("id")
      .eq("user_id", USER_ID)
      .single()

    if (existing) {
      // UPDATE
      const { error } = await supabaseServer
        .from("cvs")
        .update({ data: body })
        .eq("user_id", USER_ID)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    } else {
      // INSERT (første gang)
      const { error } = await supabaseServer
        .from("cvs")
        .insert({
          user_id: USER_ID,
          data: body,
        })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}