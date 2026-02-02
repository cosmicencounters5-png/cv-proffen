import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import PricingClient from "./PricingClient";

export default async function PricingPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: entitlement } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (
    entitlement &&
    entitlement.has_cv &&
    (!entitlement.expires_at ||
      new Date(entitlement.expires_at) > new Date())
  ) {
    redirect("/cv");
  }

  return <PricingClient />;
}