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

// STRIPE PRICES
const PRICE_CV = "price_1SuqYw2Ly9NpxKWhPtgANnw2";
const PRICE_CV_PLUS = "price_1SuqZW2Ly9NpxKWht4M2P6ZP";
const PRICE_UPGRADE = "price_1Swe8d2Ly9NpxKWhXtP3o5pA";

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
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
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

  // Standard: 3 dagers tilgang (kun for nye kjøp)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 3);

  // 🟢 KUN CV
  if (priceId === PRICE_CV) {
    await supabase.from("user_entitlements").upsert(
      {
        user_id: userId,
        has_cv: true,
        has_application: false,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  }

  // 🟢 CV + SØKNAD (FULL PAKKE)
  if (priceId === PRICE_CV_PLUS) {
    await supabase.from("user_entitlements").upsert(
      {
        user_id: userId,
        has_cv: true,
        has_application: true,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  }

  // 🟢 OPPGRADERING – KUN SØKNAD
  if (priceId === PRICE_UPGRADE) {
    await supabase
      .from("user_entitlements")
      .update({
        has_application: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  return NextResponse.json({ success: true });
}