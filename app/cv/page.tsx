import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CvWizard from "./CvWizard";

export default async function CvPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // 🔐 SJEKK SESSION
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // 💳 SJEKK TILGANG
  const { data: entitlement } = await supabase
    .from("user_entitlements")
    .select("has_cv, has_application, expires_at")
    .eq("user_id", session.user.id)
    .single();

  if (!entitlement) {
    redirect("/pricing");
  }

  if (
    entitlement.expires_at &&
    new Date(entitlement.expires_at) < new Date()
  ) {
    redirect("/pricing");
  }

  if (!entitlement.has_cv) {
    redirect("/pricing");
  }

  // ✅ ALT OK
  return <CvWizard />;
}