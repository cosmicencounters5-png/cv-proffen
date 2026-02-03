import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const priceId = formData.get("price_id") as string | null;

  if (!priceId) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?error=missing_price`,
      303
    );
  }

  // 🔐 HENT BRUKER FRA COOKIE (IKKE FRA FORM)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      303
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    metadata: {
      user_id: user.id,
      price_id: priceId,
    },
  });

  return NextResponse.redirect(session.url!, 303);
}