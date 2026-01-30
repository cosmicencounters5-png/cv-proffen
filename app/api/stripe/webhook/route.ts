import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  // 🔥 1. BEVIS at webhooken blir truffet
  console.log("🔥 STRIPE WEBHOOK HIT")

  const body = await req.text()
  const signature = headers().get("stripe-signature")

  if (!signature) {
    console.error("❌ Missing stripe-signature header")
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

  // 🔍 2. Log event-type
  console.log("✅ Event type:", event.type)

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const userId = session.client_reference_id
  const packageType = session.metadata?.packageType

  // 🔍 3. Log session-data
  console.log("🧾 Session data:", {
    userId,
    packageType,
    paymentStatus: session.payment_status,
  })

  if (!userId || !packageType) {
    console.error("❌ Missing userId or packageType", { userId, packageType })
    return new NextResponse("Invalid session data", { status: 400 })
  }

  const hasApplication = packageType === "cv_and_application"

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 3)

  // 🧩 4. Log før DB-skriving
  console.log("🧩 Writing entitlement for user:", userId)

  const { error } = await supabaseAdmin
    .from("user_entitlements")
    .upsert(
      {
        user_id: userId,
        has_cv: true,
        has_application: hasApplication,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" } // 🔑 viktig når user_id er PK
    )

  if (error) {
    console.error("❌ Supabase upsert failed", error)
    return new NextResponse("Database error", { status: 500 })
  }

  console.log("🎉 Entitlements granted for user", userId)

  return NextResponse.json({ received: true })
}