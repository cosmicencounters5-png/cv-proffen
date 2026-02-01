import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")

  if (!auth) {
    return NextResponse.json({ access: false }, { status: 401 })
  }

  const token = auth.replace("Bearer ", "")

  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser(token)

  if (error || !user) {
    return NextResponse.json({ access: false }, { status: 401 })
  }

  const { data: purchase } = await supabaseServer
    .from("purchases")
    .select("id, expires_at, package")
    .eq("user_id", user.id)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle()

  if (!purchase) {
    return NextResponse.json({ access: false })
  }

  return NextResponse.json({
    access: true,
    package: purchase.package,
    expires_at: purchase.expires_at,
  })
}