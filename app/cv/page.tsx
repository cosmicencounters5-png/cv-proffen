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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // 2. Hent tilgang
  const { data: access } = await supabase
    .from("user_access")
    .select("has_cv, expires_at")
    .eq("user_id", session.user.id)
    .maybeSingle();

  const now = new Date();

  const hasValidCvAccess =
    access?.has_cv === true &&
    access?.expires_at &&
    new Date(access.expires_at) > now;

  // 3. Hvis gyldig tilgang → CV
  if (hasValidCvAccess) {
    return <CvWizard />;
  }

  // 4. Ellers → pricing
  redirect("/pricing");
}