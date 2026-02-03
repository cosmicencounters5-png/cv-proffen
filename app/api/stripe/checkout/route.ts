import Stripe from "stripe";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs"; // 🔴 VIKTIG

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const priceId = formData.get("price_id");

  if (!priceId) {
    return new Response("Missing price_id", { status: 400 });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Not authenticated", { status: 401 });
  }

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

  // ✅ REN HTTP-REDIRECT (IKKE NextResponse)
  return new Response(null, {
    status: 303,
    headers: {
      Location: session.url!,
    },
  });
}