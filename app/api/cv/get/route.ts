import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

const USER_ID = "00000000-0000-0000-0000-000000000001"

export async function GET() {
  const { data, error } = await supabaseServer
    .from("cvs")
    .select("data")
    .eq("user_id", USER_ID)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return NextResponse.json({ cv: null })
  }

  return NextResponse.json({ cv: data.data })
}