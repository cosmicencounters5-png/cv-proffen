import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

/* =========================
   GET /api/cv
   ========================= */
export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("CV fetch error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }

  return NextResponse.json(data ? [data.data] : [])
}

/* =========================
   POST /api/cv
   ========================= */
export async function POST(req: Request) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cv = await req.json()

  // Upsert = oppdater hvis finnes, ellers opprett
  const { data, error } = await supabase
    .from("cvs")
    .upsert(
      {
        user_id: user.id,
        data: cv,
      },
      { onConflict: "user_id" }
    )
    .select()
    .single()

  if (error) {
    console.error("CV save error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }

  return NextResponse.json(data.data)
}