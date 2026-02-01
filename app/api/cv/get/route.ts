import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("CV fetch error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }

  return NextResponse.json(data)
}