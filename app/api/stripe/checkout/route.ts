// app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    const formData = await req.formData();
    const priceId = formData.get("price_id") as string | null;

    if (!priceId) {
      return new NextResponse("Missing price_id", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cv`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        user_id: user.id,
        price_id: priceId,
      },
    });

    // 🔑 DETTE ER MAGIEN
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}