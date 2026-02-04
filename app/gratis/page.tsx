"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function GratisPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  useEffect(() => {
    async function grantAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Ikke innlogget → send til login
      if (!user) {
        router.push("/login?redirect=/gratis");
        return;
      }

      // Sjekk om bruker allerede har hatt tilgang
      const { data: existing } = await supabase
        .from("user_entitlements")
        .select("expires_at")
        .eq("user_id", user.id)
        .single();

      if (existing?.expires_at) {
        // Har hatt tilgang før → send til pricing
        router.push("/pricing");
        return;
      }

      // Gi 24t gratis tilgang
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);

      await supabase.from("user_entitlements").insert({
        user_id: user.id,
        has_cv: true,
        has_application: false,
        expires_at: expires.toISOString(),
      });

      router.push("/cv");
    }

    grantAccess();
  }, [router, supabase]);

  return (
    <main style={{ padding: "4rem", textAlign: "center" }}>
      <p>Aktiverer gratis tilgang…</p>
    </main>
  );
}