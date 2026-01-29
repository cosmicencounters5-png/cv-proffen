import Stripe from "stripe"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("❌ Invalid webhook signature", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const userId = session.metadata?.user_id
      const packageType = session.metadata?.package_type

      if (!userId || !packageType) {
        throw new Error("Manglende metadata")
      }

      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 3)

      await supabaseAdmin.from("user_entitlements").upsert({
        user_id: userId,
        has_cv: true,
        has_application: packageType === "cv_and_application",
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("❌ Webhook processing error", err)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}