import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ access: false })
  }

  const { data } = await supabaseServer
    .from("purchases")
    .select("expires_at")
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle()

  return NextResponse.json({
    access: !!data,
    expiresAt: data?.expires_at ?? null,
  })
}