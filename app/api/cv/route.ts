import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const { data, error } = await supabase
    .from("cvs")
    .insert({
      user_id: user.id,
      title: body.title ?? "Min CV",
      content: body.content,
    })
    .select()
    .single()

  if (error) {
    console.error("CV insert error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }

  return NextResponse.json(data)
}