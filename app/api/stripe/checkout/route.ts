import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // IKKE sett apiVersion
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
              name: "CV Proffen – CV",
            },
            unit_amount: 19900, // 199 kr
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cv`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    )
  }
}