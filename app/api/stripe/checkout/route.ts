import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

export async function POST(req: Request) {
  const { product } = await req.json()

  let priceId: string | undefined

  if (product === "cv") {
    priceId = process.env.STRIPE_PRICE_CV
  }

  if (product === "cv_plus") {
    priceId = process.env.STRIPE_PRICE_CV_PLUS
  }

  if (!priceId) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 })
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
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  })

  return NextResponse.json({ url: session.url })
}