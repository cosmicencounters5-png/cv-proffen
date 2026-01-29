import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Webhook signature error", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.client_reference_id
    const packageType = session.metadata?.packageType

    if (!userId || !packageType) {
      console.error("❌ Mangler data i Stripe-session")
      return NextResponse.json({ error: "Manglende data" }, { status: 400 })
    }

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 3)

    await supabaseAdmin.from("purchases").insert({
      user_id: userId,
      package_type: packageType,
      expires_at: expiresAt.toISOString(),
    })
  }

  return NextResponse.json({ received: true })
}