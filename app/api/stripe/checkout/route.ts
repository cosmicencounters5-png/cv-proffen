import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const priceId = formData.get("price_id");
  const userId = formData.get("user_id");

  if (!priceId || !userId) {
    return NextResponse.json(
      { error: "Missing price_id or user_id" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId as string, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cv`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    metadata: {
      user_id: userId as string,
      price_id: priceId as string,
    },
  });

  return NextResponse.redirect(session.url!, 303);
}