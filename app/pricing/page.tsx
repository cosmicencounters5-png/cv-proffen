import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const supabase = createSupabaseServerClient();

  // 1️⃣ Hent bruker (IKKE session)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2️⃣ Hent entitlement for brukeren
  const { data: entitlement } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", user.id)
    .maybeSingle();

  // 3️⃣ Har aktiv CV → send rett til /cv
  if (
    entitlement?.has_cv &&
    (!entitlement.expires_at ||
      new Date(entitlement.expires_at) > new Date())
  ) {
    redirect("/cv");
  }

  // 4️⃣ Ellers: vis priser
  return <PricingClient />;
}