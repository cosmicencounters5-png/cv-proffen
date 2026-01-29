import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Webhook signature verification failed", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  // 🎯 DETTE ER HENDELSEN VI BRYR OSS OM
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.client_reference_id
    if (!userId) {
      console.error("❌ Missing client_reference_id")
      return new NextResponse("Missing user reference", { status: 400 })
    }

    const priceId = session.line_items?.data?.[0]?.price?.id

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
      console.error("❌ Supabase insert failed:", error)
      return new NextResponse("Database error", { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}