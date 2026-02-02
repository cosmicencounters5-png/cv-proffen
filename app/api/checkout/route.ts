import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { product } = await req.json();

  const priceId =
    product === "cv"
      ? "price_1SuqYw2Ly9NpxKWhPtgANnw2"
      : "price_1SuqZW2Ly9NpxKWht4M2P6ZP";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cv?paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}