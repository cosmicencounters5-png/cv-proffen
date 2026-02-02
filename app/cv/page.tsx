import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import CvWizard from "./CvWizard";

export default async function CvPage() {
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

  if (!entitlement) redirect("/pricing");

  if (
    entitlement.expires_at &&
    new Date(entitlement.expires_at) < new Date()
  ) {
    redirect("/pricing");
  }

  if (!entitlement.has_cv) redirect("/pricing");

  return <CvWizard />;
}