import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ access: false }, { status: 401 })
  }

  return NextResponse.json({ access: true })
}