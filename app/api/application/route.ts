import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({}, { status: 401 })

  const { data: user } = await supabaseAdmin.auth.getUser(token)
  if (!user?.user) return NextResponse.json({}, { status: 401 })

  const { data } = await supabaseAdmin
    .from("applications")
    .select("*")
    .eq("user_id", user.user.id)
    .maybeSingle()

  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({}, { status: 401 })

  const { data: user } = await supabaseAdmin.auth.getUser(token)
  if (!user?.user) return NextResponse.json({}, { status: 401 })

  const { content } = await req.json()

  await supabaseAdmin.from("applications").upsert({
    user_id: user.user.id,
    content,
  })

  return NextResponse.json({ ok: true })
}