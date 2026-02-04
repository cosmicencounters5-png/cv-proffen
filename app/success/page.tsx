// app/success/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function SuccessPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function checkEntitlement() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("user_entitlements")
        .select("has_cv")
        .eq("user_id", user.id)
        .single();

      if (data?.has_cv) {
        router.push("/cv");
        return;
      }
    }

    // sjekk umiddelbart
    checkEntitlement();

    // poll hver 2. sekund (venter på webhook)
    interval = setInterval(checkEntitlement, 2000);

    return () => clearInterval(interval);
  }, [router, supabase]);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 1rem",
        background: "#f8f9fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          maxWidth: "420px",
        }}
      >
        <h1>Kjøp fullført 🎉</h1>
        <p style={{ marginTop: "1rem", color: "#555" }}>
          Vi klargjør tilgangen din nå.
        </p>
        <p style={{ marginTop: "0.5rem", color: "#777" }}>
          Du blir sendt videre automatisk…
        </p>
      </div>
    </main>
  );
}
