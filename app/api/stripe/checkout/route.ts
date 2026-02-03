import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  // 1. Hent bruker server-side (100 % pålitelig)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookies().get(key)?.value,
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // 2. Hent price_id fra form
  const formData = await req.formData();
  const priceId = formData.get("price_id");

  if (!priceId) {
    return NextResponse.json(
      { error: "Missing price_id" },
      { status: 400 }
    );
  }

  // 3. Opprett Stripe Checkout
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId as string, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cv`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    metadata: {
      user_id: user.id,
      price_id: priceId as string,
    },
  });

  return NextResponse.redirect(session.url!, 303);
}