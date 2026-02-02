import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();

  // 1️⃣ Sjekk innlogget bruker
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Ikke innlogget" },
      { status: 401 }
    );
  }

  // 2️⃣ Hent produkt
  const { product } = await req.json();

  let priceId: string;

  if (product === "cv") {
    priceId = "price_1SuqYw2Ly9NpxKWhPtgANnw2";
  } else if (product === "cv_plus") {
    priceId = "price_1SuqZW2Ly9NpxKWht4M2P6ZP";
  } else {
    return NextResponse.json(
      { error: "Ugyldig produkt" },
      { status: 400 }
    );
  }

  // 3️⃣ Opprett Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    // 🔑 KRITISK: knytt betaling til bruker
    metadata: {
      user_id: user.id,
      product,
    },

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cv?paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}