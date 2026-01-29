import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      packageType: session.metadata?.package_type,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Stripe session error" },
      { status: 500 }
    )
  }
}