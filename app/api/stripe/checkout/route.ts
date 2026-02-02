import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    let price_id: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    // ✅ Håndter JSON
    if (contentType.includes("application/json")) {
      const body = await req.json();
      price_id = body.price_id;
    }

    // ✅ Håndter form POST
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

    // 🔐 Finn bruker via Supabase-session cookie
    const cookieHeader = headers().get("cookie") || "";

    const {
      data: { user },
    } = await supabase.auth.getUser(cookieHeader);

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

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

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}