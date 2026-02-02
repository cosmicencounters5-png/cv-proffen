import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CvWizard from "./CvWizard";

export default async function CvPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: entitlement, error } = await supabase
    .from("user_entitlements")
    .select("has_cv, has_application, expires_at")
    .eq("user_id", session.user.id)
    .maybeSingle(); // ⬅️ VIKTIG

  // ❌ Ingen rad → send til pricing
  if (!entitlement) {
    redirect("/pricing");
  }

  // ❌ Utløpt
  if (entitlement.expires_at && new Date(entitlement.expires_at) < new Date()) {
    redirect("/pricing");
  }

  // ❌ Mangler CV-tilgang
  if (!entitlement.has_cv) {
    redirect("/pricing");
  }

  // ✅ ALT OK
  return <CvWizard />;
}