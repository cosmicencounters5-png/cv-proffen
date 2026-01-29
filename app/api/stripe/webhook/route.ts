import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  // 🎯 VI BRYR OSS BARE OM FULLFØRT BETALING
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.client_reference_id

    if (!userId) {
      console.error("❌ Mangler client_reference_id (userId)")
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    // 🧠 Finn ut hva som ble kjøpt
    const priceId =
      session.line_items?.data?.[0]?.price?.id ??
      (session.metadata?.price_id as string | undefined)

    const hasApplication =
      priceId === process.env.STRIPE_PRICE_CV_AND_APPLICATION

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 3)

    const { error } = await supabaseAdmin
      .from("user_entitlements")
      .upsert({
        user_id: userId,
        has_cv: true,
        has_application: hasApplication,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (error) {
      console.error("❌ Supabase insert error:", error)
      return NextResponse.json({ error: "DB error" }, { status: 500 })
    }

    console.log("✅ Entitlement opprettet for user:", userId)
  }

  return NextResponse.json({ received: true })
}