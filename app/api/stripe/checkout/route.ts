import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { packageType } = await req.json()

    const priceId =
      packageType === "cv_only"
        ? process.env.STRIPE_PRICE_CV_ONLY
        : process.env.STRIPE_PRICE_CV_AND_APPLICATION

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing price ID" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cv`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("STRIPE ERROR:", err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}