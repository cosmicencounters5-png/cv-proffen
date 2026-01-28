import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

const USER_ID = "00000000-0000-0000-0000-000000000001"

/**
 * Hent CV (brukes ved refresh / page load)
 */
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
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ cv: data?.data ?? null })
  } catch (err) {
    console.error("GET /api/cv FAILED", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

/**
 * Lagre CV
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { data, error } = await supabaseServer
      .from("cvs")
      .insert({
        user_id: USER_ID,
        data: body,
      })
      .select()

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