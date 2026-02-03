import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  try {
    // 🔐 Supabase server client (LESER COOKIES KORREKT)
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
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 📦 Håndter både JSON og form POST
    let price_id: string | null = null;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      price_id = body.price_id;
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      price_id = formData.get("price_id") as string | null;
    }

    if (!price_id) {
      return NextResponse.json(
        { error: "Missing price_id" },
        { status: 400 }
      );
    }

    // 💳 Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        user_id: user.id,
        price_id,
      },
    });

    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
