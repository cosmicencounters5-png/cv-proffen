import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: "CV-pakke (test)",
            },
            unit_amount: 4900, // 49.00 NOK
          },
          quantity: 1,
        },
      ],
      success_url: "https://www.cv-proffen.no/success",
      cancel_url: "https://www.cv-proffen.no/cancel",
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("STRIPE ERROR:", error)
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    )
  }
}