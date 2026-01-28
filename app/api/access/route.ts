import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader) {
    return NextResponse.json(
      { active: false },
      { status: 401 }
    )
  }

  const token = authHeader.replace("Bearer ", "")

  // 1️⃣ verifiser bruker
  const {
    data: { user },
    error: userError,
  } = await supabaseServer.auth.getUser(token)

  if (!user || userError) {
    return NextResponse.json(
      { active: false },
      { status: 401 }
    )
  }

  // 2️⃣ hent tilgang
  const { data, error } = await supabaseServer
    .from("access")
    .select("package, expires_at")
    .eq("user_id", user.id)
    .gt("expires_at", new Date().toISOString())
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !data) {
    return NextResponse.json({ active: false })
  }

  return NextResponse.json({
    active: true,
    package: data.package,
    expires_at: data.expires_at,
  })
}