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

  // 1. Session
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !data?.session) {
    redirect("/login");
  }

  const userId = data.session.user.id;

  // 2. Hent tilgang (try/catch-style)
  const { data: access, error } = await supabase
    .from("user_entitlements")
    .select("has_cv, expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  // Hvis tabell / RLS feiler → send til pricing
  if (error || !access) {
    redirect("/pricing");
  }

  // 3. Valider tilgang
  const hasCv = access.has_cv === true;

  const expiresAt = access.expires_at
    ? new Date(access.expires_at)
    : null;

  const isValid =
    hasCv &&
    expiresAt instanceof Date &&
    !isNaN(expiresAt.getTime()) &&
    expiresAt > new Date();

  if (!isValid) {
    redirect("/pricing");
  }

  // 4. OK
  return <CvWizard />;
}