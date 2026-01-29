import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const { packageType } = await req.json()

    // 🔐 Hent innlogget bruker (server-side)
    const authHeader = req.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser(token)

    if (!user) {
      return NextResponse.json({ error: "Ugyldig bruker" }, { status: 401 })
    }

    // 💰 Velg riktig pris
    let priceId: string

    if (packageType === "cv_only") {
      priceId = process.env.STRIPE_PRICE_CV_ONLY!
    } else if (packageType === "cv_and_application") {
      priceId = process.env.STRIPE_PRICE_CV_AND_APPLICATION!
    } else {
      return NextResponse.json({ error: "Ugyldig pakke" }, { status: 400 })
    }

    // ✅ HER SKAL client_reference_id SETTES
    const session = await stripe.checkout.sessions.create({
  mode: "payment",
  client_reference_id: user.id,
  metadata: {
    packageType, // ← VIKTIG
  },
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: "https://www.cv-proffen.no/success",
  cancel_url: "https://www.cv-proffen.no/pricing",
})

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("❌ Stripe checkout error:", err)
    return NextResponse.json(
      { error: "Klarte ikke å starte betaling" },
      { status: 500 }
    )
  }
}