import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseServer } from "@/lib/supabaseServer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { packageType, userId } = body

    if (!packageType || !userId) {
      return NextResponse.json(
        { error: "Missing packageType or userId" },
        { status: 400 }
      )
    }

    // 🎯 Pris per pakke
    const price =
      packageType === "cv_only"
        ? 9900
        : packageType === "cv_and_application"
        ? 14900
        : null

    if (!price) {
      return NextResponse.json(
        { error: "Invalid packageType" },
        { status: 400 }
      )
    }

    // 1️⃣ Opprett Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name:
                packageType === "cv_only"
                  ? "CV – 3 dagers tilgang"
                  : "CV + Søknad – 3 dagers tilgang",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        user_id: userId,
        package_type: packageType,
      },
    })

    // 2️⃣ Lagre kjøpet umiddelbart (MVP-safe)
    const { error } = await supabaseServer.from("purchases").insert({
      user_id: userId,
      package_type: packageType,
      expires_at: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 3 // 3 dager
      ).toISOString(),
    })

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error)
      return NextResponse.json(
        { error: "Failed to store purchase" },
        { status: 500 }
      )
    }

    // 3️⃣ Send Checkout URL tilbake
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("STRIPE CHECKOUT ERROR:", err)
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    )
  }
}