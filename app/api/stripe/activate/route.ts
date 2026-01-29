import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("authorization")
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sessionId } = await req.json()

    // 1️⃣ Hent Stripe-session
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    if (!checkoutSession || !checkoutSession.line_items) {
      return NextResponse.json({ error: "Ugyldig Stripe-session" }, { status: 400 })
    }

    // 2️⃣ Finn hvilket produkt som ble kjøpt
    const priceId = checkoutSession.line_items.data[0].price?.id

    let packageType: string

    if (priceId === process.env.STRIPE_PRICE_CV_ONLY) {
      packageType = "cv_only"
    } else if (priceId === process.env.STRIPE_PRICE_CV_AND_APPLICATION) {
      packageType = "cv_and_application"
    } else {
      return NextResponse.json({ error: "Ukjent pakke" }, { status: 400 })
    }

    // 3️⃣ Hent user_id fra auth token
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(auth.replace("Bearer ", ""))

    if (userError || !user) {
      return NextResponse.json({ error: "Fant ikke bruker" }, { status: 401 })
    }

    // 4️⃣ Lag kjøp (3 dager tilgang)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 3)

    await supabaseAdmin.from("purchases").insert({
      user_id: user.id,
      package: packageType,
      expires_at: expiresAt.toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("ACTIVATE ERROR:", err)
    return NextResponse.json(
      { error: "Kunne ikke aktivere pakken" },
      { status: 500 }
    )
  }
}