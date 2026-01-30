import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature")

  if (!sig) {
    console.error("❌ Missing Stripe signature")
    return new NextResponse("Missing signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Webhook verification failed", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const userId = session.client_reference_id
  const packageType = session.metadata?.packageType

  if (!userId || !packageType) {
    console.error("❌ Missing data", { userId, packageType })
    return new NextResponse("Invalid session data", { status: 400 })
  }

  const hasApplication = packageType === "cv_and_application"

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
    console.error("❌ Supabase insert failed", error)
    return new NextResponse("Database error", { status: 500 })
  }

  console.log("✅ Entitlements granted for", userId)
  return NextResponse.json({ received: true })
}