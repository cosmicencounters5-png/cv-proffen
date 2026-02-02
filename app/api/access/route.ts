import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ access: false }, { status: 401 })
  }

  return NextResponse.json({ access: true })
}