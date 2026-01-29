import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

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
  } catch (err) {
    console.error("❌ Webhook signature error", err)
    return new NextResponse("Webhook error", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.client_reference_id
    const priceId = session.line_items?.data?.[0]?.price?.id

    if (!userId) {
      console.error("❌ Mangler client_reference_id")
      return NextResponse.json({ received: true })
    }

    const hasApplication =
      priceId === process.env.STRIPE_PRICE_CV_AND_APPLICATION

    // ⬇️ HER ER DET KRITISKE
    const { error } = await supabaseAdmin
      .from("user_entitlements")
      .upsert({
        user_id: userId,
        has_cv: true,
        has_application: hasApplication,
        expires_at: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (error) {
      console.error("❌ Supabase insert error:", error)
    }
  }

  return NextResponse.json({ received: true })
}