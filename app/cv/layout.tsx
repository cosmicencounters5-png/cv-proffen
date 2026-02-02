import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function CvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  // 1️⃣ Hent innlogget bruker
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2️⃣ Hent entitlement for DENNE brukeren
  const { data: entitlement, error } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", user.id)
    .maybeSingle();

  // ❌ Ingen rad = ingen tilgang
  if (error || !entitlement) {
    redirect("/pricing");
  }

  // ❌ Utløpt
  if (
    entitlement.expires_at &&
    new Date(entitlement.expires_at) < new Date()
  ) {
    redirect("/pricing");
  }

  // ❌ Mangler CV-tilgang
  if (!entitlement.has_cv) {
    redirect("/pricing");
  }

  // ✅ Alt OK
  return <>{children}</>;
}