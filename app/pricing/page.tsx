"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

type AccessState = "loading" | "no-access" | "has-access";

export default function PricingPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [state, setState] = useState<AccessState>("loading");

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setState("no-access");
        return;
      }

      const { data } = await supabase
        .from("user_entitlements")
        .select("has_cv, expires_at")
        .eq("user_id", user.id)
        .single();

      const now = new Date();

      if (
        data?.has_cv &&
        (!data.expires_at || new Date(data.expires_at) > now)
      ) {
        setState("has-access");
      } else {
        setState("no-access");
      }
    }

    checkAccess();
  }, [supabase]);

  return (
    <main style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1>Velg pakke</h1>

        {state === "loading" && <p>Laster…</p>}

        {/* HAR TILGANG */}
        {state === "has-access" && (
          <div className="card" style={{ marginTop: "2rem" }}>
            <h2>Du har allerede aktiv tilgang ✅</h2>
            <p>
              Du kan gå rett til CV-generatoren og fortsette der du slapp.
            </p>

            <Link
              href="/cv"
              style={{
                display: "inline-block",
                marginTop: "1rem",
                padding: "0.6rem 1rem",
                background: "var(--primary)",
                color: "white",
                borderRadius: "var(--radius)",
                textDecoration: "none",
              }}
            >
              Gå til CV
            </Link>
          </div>
        )}

        {/* INGEN TILGANG */}
        {state === "no-access" && (
          <div style={{ marginTop: "2rem" }}>
            <p style={{ marginBottom: "1.5rem", color: "var(--muted)" }}>
              Velg pakken som passer deg best. Tilgangen varer i 3 dager.
            </p>

            {/* HER LEGGER DU STRIPE-KORTENE DINE */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div className="card">
                <h3>CV</h3>
                <p>Lag en profesjonell CV.</p>
                {/* checkout-knapp */}
              </div>

              <div className="card">
                <h3>CV + Søknad</h3>
                <p>CV og målrettet jobbsøknad.</p>
                {/* checkout-knapp */}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
