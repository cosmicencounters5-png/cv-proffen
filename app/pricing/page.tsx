"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type AccessState = "loading" | "no-access" | "upgrade" | "has-access";

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
        .select("has_cv, has_application, expires_at")
        .eq("user_id", user.id)
        .single();

      const now = new Date();

      const hasValidCv =
        data?.has_cv &&
        (!data.expires_at || new Date(data.expires_at) > now);

      if (hasValidCv && data?.has_application) {
        setState("has-access");
        return;
      }

      if (hasValidCv && !data?.has_application) {
        setState("upgrade");
        return;
      }

      setState("no-access");
    }

    checkAccess();
  }, [supabase]);

  return (
    <main style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1>Velg tilgang</h1>

        <p style={{ marginTop: "0.5rem", color: "var(--muted)", maxWidth: "640px" }}>
          Lag en profesjonell CV – og eventuelt en målrettet jobbsøknad – basert
          kun på dine egne opplysninger. Tilgangen varer i 3 dager.
        </p>

        {state === "loading" && <p>Laster…</p>}

        {/* FULL TILGANG */}
        {state === "has-access" && (
          <div className="card" style={{ marginTop: "2.5rem" }}>
            <h2>Du har full tilgang ✅</h2>
            <p>Du kan bruke både CV- og søknadsgeneratoren.</p>

            <a
              href="/cv"
              style={{
                display: "inline-block",
                marginTop: "1.25rem",
                padding: "0.6rem 1rem",
                background: "var(--primary)",
                color: "white",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Gå til generatoren
            </a>
          </div>
        )}

        {/* 🔥 OPPGRADER */}
        {state === "upgrade" && (
          <div className="card" style={{ marginTop: "3rem", maxWidth: "520px" }}>
            <h2>Legg til jobbsøknad</h2>

            <p>
              Du har allerede laget CV. Med en målrettet jobbsøknad øker du
              sjansene dine betydelig.
            </p>

            <p style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>
              100 kr
            </p>

            <form method="POST" action="/api/stripe/checkout">
              <input
                type="hidden"
                name="price_id"
                value="price_1Sx8wO2Ly9NpxKWh2lqi2g6i"
              />
              <button className="primary">Oppgrader nå</button>
            </form>
          </div>
        )}

        {/* INGEN TILGANG */}
        {state === "no-access" && (
          <div
            style={{
              marginTop: "3rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* CV */}
            <div className="card">
              <h3>CV</h3>
              <p style={{ fontSize: "2rem", fontWeight: 700 }}>149 kr</p>

              <form method="POST" action="/api/stripe/checkout">
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1Sx8sW2Ly9NpxKWhs77Gnipg"
                />
                <button className="primary" style={{ width: "100%" }}>
                  Kjøp CV
                </button>
              </form>
            </div>

            {/* CV + SØKNAD */}
            <div className="card" style={{ border: "2px solid var(--primary)" }}>
              <h3>CV + Søknad</h3>
              <p style={{ fontSize: "2rem", fontWeight: 700 }}>249 kr</p>

              <form method="POST" action="/api/stripe/checkout">
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1Sx8vC2Ly9NpxKWhpU8ws3Yd"
                />
                <button className="primary" style={{ width: "100%" }}>
                  Kjøp komplett pakke
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
