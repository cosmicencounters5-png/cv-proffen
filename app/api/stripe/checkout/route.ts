export const runtime = "nodejs"

import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  console.log("🔥 STRIPE CHECKOUT ROUTE HIT")

  try {
    const { packageType } = await req.json()
    console.log("📦 packageType:", packageType)

    let priceId: string

    if (packageType === "cv_only") {
      priceId = process.env.STRIPE_PRICE_CV_ONLY!
    } else if (packageType === "cv_and_application") {
      priceId = process.env.STRIPE_PRICE_CV_AND_APPLICATION!
    } else {
      return NextResponse.json(
        { error: "Ugyldig pakke" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://www.cv-proffen.no/success",
      cancel_url: "https://www.cv-proffen.no/cv",
    })

    console.log("✅ STRIPE SESSION URL:", session.url)

    if (!session.url) {
      throw new Error("Stripe session mangler URL")
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("❌ STRIPE CHECKOUT ERROR:", err)
    return NextResponse.json(
      { error: "Stripe error" },
      { status: 500 }
    )
  }
}