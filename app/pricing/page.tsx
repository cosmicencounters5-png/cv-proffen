"use client";

import { Suspense, useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type AccessState = "loading" | "no-access" | "has-access" | "upgrade";

function PricingContent() {
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
        .select("has_cv, has_application, expires_at")
        .eq("user_id", user.id)
        .single();

      const now = new Date();
      const hasValidAccess =
        data?.has_cv &&
        (!data.expires_at || new Date(data.expires_at) > now);

      // 🔑 UPGRADE CASE
      if (data?.has_cv && !data?.has_application) {
        setState("upgrade");
        return;
      }

      if (hasValidAccess) {
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

        <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
          Velg pakken som passer deg best. Tilgangen varer i 3 dager.
        </p>

        {state === "loading" && <p>Laster…</p>}

        {/* FULL TILGANG */}
        {state === "has-access" && (
          <div className="card" style={{ marginTop: "2rem" }}>
            <h2>Du har allerede aktiv tilgang ✅</h2>
            <p>Du kan gå rett til CV-generatoren.</p>

            <a
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
            </a>
          </div>
        )}

        {/* 🔥 UPGRADE */}
        {state === "upgrade" && (
          <div className="card" style={{ marginTop: "3rem" }}>
            <h2>Oppgrader til jobbsøknad</h2>
            <p>
              Du har allerede CV. Legg til målrettet jobbsøknad for å øke
              sjansene dine.
            </p>

            <p
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                margin: "1rem 0",
              }}
            >
              100 kr
            </p>

            <form
              method="POST"
              action="/api/stripe/checkout"
              style={{ marginTop: "1.5rem" }}
            >
              <input
                type="hidden"
                name="price_id"
                value="price_1Stu5cRt72eNJeMc499OeNcy"
              />
              <button className="primary">
                Oppgrader nå
              </button>
            </form>
          </div>
        )}

        {/* INGEN TILGANG */}
        {state === "no-access" && (
          <p>Vis full pricing her (uendret)</p>
        )}
      </div>
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<p style={{ padding: "4rem" }}>Laster…</p>}>
      <PricingContent />
    </Suspense>
  );
}
