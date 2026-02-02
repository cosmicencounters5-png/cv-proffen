import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

/**
 * Mapper produkt → entitlements
 */
function mapProductToEntitlements(product: string) {
  switch (product) {
    case "cv":
      return {
        has_cv: true,
        has_application: false,
      };

    case "cv_plus":
      return {
        has_cv: true,
        has_application: true,
      };

    default:
      console.error("❌ Unknown product:", product);
      return {
        has_cv: false,
        has_application: false,
      };
  }
}

export async function POST(req: Request) {
  console.log("🔥 STRIPE WEBHOOK HIT", new Date().toISOString());

  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    console.error("❌ Missing Stripe signature");
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook verification failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.metadata?.user_id;
  const product = session.metadata?.product;

  if (!userId || !product) {
    console.error("❌ Missing metadata", { userId, product });
    return new NextResponse("Invalid session metadata", { status: 400 });
  }

  const entitlements = mapProductToEntitlements(product);

  // ⏱️ 3 dager tilgang
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 3);

  const { error } = await supabaseAdmin
    .from("user_entitlements")
    .upsert(
      {
        user_id: userId,
        ...entitlements,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("❌ Supabase upsert failed", error);
    return new NextResponse("Database error", { status: 500 });
  }

  console.log("✅ Entitlements granted for", userId, entitlements);
  return NextResponse.json({ received: true });
}