// app/api/stripe/webhook/route.ts

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🔑 LIVE PRICES
const PRICE_CV = "price_1Sx4UG2Ly9NpxKWhFb4sWtIN";
const PRICE_CV_PLUS = "price_1Sx4VJ2Ly9NpxKWheBaclMvl";
const PRICE_UPGRADE = "price_1Sx4W02Ly9NpxKWhA4idXSa2";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Webhook error", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.metadata?.user_id;
  const priceId = session.metadata?.price_id;

  if (!userId || !priceId) {
    return new NextResponse("Missing metadata", { status: 400 });
  }

  // ⏳ 3 dagers tilgang
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 3);

  // 🔍 Hent eksisterende tilgang (hvis finnes)
  const { data: existing } = await supabase
    .from("user_entitlements")
    .select("has_cv, has_application")
    .eq("user_id", userId)
    .single();

  let hasCv = existing?.has_cv ?? false;
  let hasApplication = existing?.has_application ?? false;

  // 🎯 TOLK KJØPET
  if (priceId === PRICE_CV) {
    hasCv = true;
  }

  if (priceId === PRICE_CV_PLUS) {
    hasCv = true;
    hasApplication = true;
  }

  if (priceId === PRICE_UPGRADE) {
    hasApplication = true;
  }

  await supabase
    .from("user_entitlements")
    .upsert(
      {
        user_id: userId,
        has_cv: hasCv,
        has_application: hasApplication,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  return NextResponse.json({ success: true });
}