import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature")

  if (!sig) {
    return new NextResponse("Missing signature", { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Webhook signature error", err)
    return new NextResponse("Webhook error", { status: 400 })
  }

  // ✅ Kun ferdig betaling
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any

    const userId = session.metadata?.user_id
    const packageType = session.metadata?.package

    if (!userId || !packageType) {
      console.error("❌ Mangler metadata", session.metadata)
      return NextResponse.json({ ok: false })
    }

    // ⏱ 3 dager tilgang
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 3)

    await supabaseAdmin.from("entitlements").insert({
      user_id: userId,
      package: packageType,
      expires_at: expiresAt.toISOString(),
    })
  }

  return NextResponse.json({ received: true })
}