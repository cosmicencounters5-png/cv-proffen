import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { packageType } = await req.json()

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
      cancel_url: "https://www.cv-proffen.no/pricing",
    })

    if (!session.url) {
      return NextResponse.json(
        { error: "Mangler Stripe URL" },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("❌ STRIPE CHECKOUT ERROR:", error)
    return NextResponse.json(
      { error: "Stripe checkout feilet" },
      { status: 500 }
    )
  }
}