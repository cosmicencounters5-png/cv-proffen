import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: authHeader },
      },
    }
  )

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No user" }, { status: 401 })
  }

  const body = await req.json()

  const { error } = await supabaseServer
    .from("cvs")
    .upsert(
      {
        user_id: user.id,
        data: body,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: authHeader },
      },
    }
  )

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No user" }, { status: 401 })
  }

  const { data, error } = await supabaseServer
    .from("cvs")
    .select("data")
    .eq("user_id", user.id)
    .single()

  if (error) {
    return NextResponse.json({ data: null })
  }

  return NextResponse.json({ data: data.data })
}