import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PricingClient from "./PricingClient";

export default async function PricingPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ❌ Ikke logget inn → login
  if (!session) {
    redirect("/login");
  }

  const { data: entitlement } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", session.user.id)
    .maybeSingle();

  // ✅ Har gyldig CV → rett til CV
  if (
    entitlement &&
    entitlement.has_cv &&
    (!entitlement.expires_at ||
      new Date(entitlement.expires_at) > new Date())
  ) {
    redirect("/cv");
  }

  // ❌ Ellers: vis pricing
  return <PricingClient />;
}