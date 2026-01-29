import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json(
        { error: "Mangler auth" },
        { status: 401 }
      )
    }

    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user) {
      return NextResponse.json(
        { error: "Ikke logget inn" },
        { status: 401 }
      )
    }

    const { packageType } = await req.json()

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 3)

    const { error } = await supabase
      .from("purchases")
      .upsert(
        {
          user_id: user.id,
          package: packageType,
          expires_at: expiresAt.toISOString(),
        },
        { onConflict: "user_id" }
      )

    if (error) {
      console.error("❌ PURCHASE UPSERT ERROR:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("❌ ACTIVATE ROUTE ERROR:", err)
    return NextResponse.json(
      { error: "Serverfeil" },
      { status: 500 }
    )
  }
}