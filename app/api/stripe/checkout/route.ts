import { NextResponse } from "next/server"
import Stripe from "stripe"

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

      // ⭐ VIKTIGSTE LINJE (fikser betalingsreferanse-problemet)
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    })

    if (!session.url) {
      throw new Error("Stripe session mangler URL")
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