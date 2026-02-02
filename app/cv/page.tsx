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

  // 1. Ikke logget inn
  if (!session) {
    redirect("/login");
  }

  // 2. Sjekk om CV finnes
  const { data: existingCv } = await supabase
    .from("cvs")
    .select("id")
    .eq("user_id", session.user.id)
    .maybeSingle();

  // 3. Hvis CV finnes → ALDRI pricing
  if (existingCv) {
    return <CvWizard />;
  }

  // 4. Sjekk betaling
  const { data: payment } = await supabase
    .from("payments")
    .select("id")
    .eq("user_id", session.user.id)
    .eq("status", "paid")
    .maybeSingle();

  if (!payment) {
    redirect("/pricing");
  }

  return <CvWizard />;
}