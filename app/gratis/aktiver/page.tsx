"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function GratisAktiver() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  useEffect(() => {
    async function run() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/gratis/aktiver");
        return;
      }

      const { data: existing } = await supabase
        .from("user_entitlements")
        .select("expires_at")
        .eq("user_id", user.id)
        .single();

      if (existing?.expires_at) {
        router.push("/pricing");
        return;
      }

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

    run();
  }, [router, supabase]);

  return <p style={{ padding: "2rem" }}>Aktiverer gratis tilgang…</p>;
}