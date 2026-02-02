import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { product } = await req.json();

  const price =
    product === "premium" ? 49900 : 29900;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name:
              product === "premium"
                ? "CV + Søknad"
                : "Profesjonell CV",
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    success_url:
      process.env.NEXT_PUBLIC_SITE_URL +
      "/cv?paid=true",
    cancel_url:
      process.env.NEXT_PUBLIC_SITE_URL +
      "/",
  });

  return NextResponse.json({ url: session.url });
}