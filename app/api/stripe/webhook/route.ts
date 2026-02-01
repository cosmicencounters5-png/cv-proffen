import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

/**
 * Oversetter Stripe packageType → app-entitlements
 * Dette er grensa mellom Stripe og domenelogikken din
 */
function mapPackageToEntitlements(packageType: string) {
  switch (packageType) {
    case "cv_and_application":
      return {
        has_cv: true,
        has_application: true,
      }

    case "cv_only": // 👈 DENNE MANGLER
      return {
        has_cv: true,
        has_application: false,
      }

    default:
      console.error("❌ Unknown packageType:", packageType)
      return {
        has_cv: false,
        has_application: false,
      }
  }
}

export async function POST(req: Request) {
console.log("🔥 STRIPE WEBHOOK HIT", new Date().toISOString())
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
    console.error("❌ Missing session data", { userId, packageType })
    return new NextResponse("Invalid session data", { status: 400 })
  }

  const entitlements = mapPackageToEntitlements(packageType)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 3)

  const { data, error } = await supabaseAdmin
    .from("user_entitlements")
    .upsert(
      {
        user_id: userId,
        ...entitlements,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()

  console.log("🧾 ENTITLEMENT UPSERT RESULT", data, error)

  if (error) {
    console.error("❌ Supabase upsert failed", error)
    return new NextResponse("Database error", { status: 500 })
  }

  console.log("✅ Entitlements granted for", userId)
  return NextResponse.json({ received: true })
}