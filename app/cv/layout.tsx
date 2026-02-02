import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function CvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  // 1️⃣ Hent bruker
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2️⃣ Hent entitlement FOR DENNE BRUKEREN
  const { data: entitlement, error } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", user.id)
    .maybeSingle(); // 🔑 VIKTIG

  // ❌ Ingen tilgang
  if (!entitlement) {
    redirect("/pricing");
  }

  // ❌ Utløpt
  if (
    entitlement.expires_at &&
    new Date(entitlement.expires_at) < new Date()
  ) {
    redirect("/pricing");
  }

  // ❌ Mangler CV
  if (!entitlement.has_cv) {
    redirect("/pricing");
  }

  // ✅ OK
  return <>{children}</>;
}