import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { packageType, userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: "Mangler userId" }, { status: 400 })
    }

    let priceId: string

    if (packageType === "cv_only") {
      priceId = process.env.STRIPE_PRICE_CV_ONLY!
    } else if (packageType === "cv_and_application") {
      priceId = process.env.STRIPE_PRICE_CV_AND_APPLICATION!
    } else {
      return NextResponse.json({ error: "Ugyldig pakke" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: "https://www.cv-proffen.no/success",
  cancel_url: "https://www.cv-proffen.no/pricing",
  metadata: {
    user_id: userId,
    package_type: packageType,
  },
})

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("❌ STRIPE CHECKOUT ERROR", err)
    return NextResponse.json({ error: "Stripe-feil" }, { status: 500 })
  }
}