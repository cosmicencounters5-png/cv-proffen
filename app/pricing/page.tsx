"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type AccessState =
  | "loading"
  | "no-access"
  | "has-full-access"
  | "can-upgrade";

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
      const active =
        data?.expires_at && new Date(data.expires_at) > now;

      if (!data || !active) {
        setState("no-access");
        return;
      }

      if (data.has_cv && data.has_application) {
        setState("has-full-access");
        return;
      }

      if (data.has_cv && !data.has_application) {
        setState("can-upgrade");
        return;
      }

      setState("no-access");
    }

    checkAccess();
  }, [supabase]);

  return (
    <main style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1>Velg pakke</h1>

        <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
          Engangskjøp. Tilgangen varer i 3 dager. Ingen abonnement.
        </p>

        {state === "loading" && <p>Laster…</p>}

        {/* FULL TILGANG */}
        {state === "has-full-access" && (
          <div className="card" style={{ marginTop: "2rem" }}>
            <h2>Du har full tilgang ✅</h2>
            <p>CV og jobbsøknad er allerede tilgjengelig.</p>

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

        {/* OPPGRADERING */}
        {state === "can-upgrade" && (
          <div style={{ marginTop: "3rem" }}>
            <div
              className="card"
              style={{ border: "2px solid var(--primary)" }}
            >
              <h3>Oppgrader med jobbsøknad</h3>

              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0",
                }}
              >
                100 kr
              </p>

              <p>
                Du har allerede CV. Legg til målrettet jobbsøknad og få full
                tilgang i resten av perioden.
              </p>

              <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
                <li>Målrettet jobbsøknad</li>
                <li>PDF klar til bruk</li>
                <li>Samme 3 dagers tilgang</li>
              </ul>

              <form
                method="POST"
                action="/api/stripe/checkout"
                style={{ marginTop: "1.5rem" }}
              >
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1Swe8d2Ly9NpxKWhXtP3o5pA"
                />
                <button className="primary" style={{ width: "100%" }}>
                  Oppgrader nå
                </button>
              </form>
            </div>
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

              <p>Lag en profesjonell CV basert på dine egne opplysninger.</p>

              <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
                <li>AI-generert CV</li>
                <li>PDF klar til bruk</li>
                <li>3 dagers tilgang</li>
              </ul>

              <form
                method="POST"
                action="/api/stripe/checkout"
                style={{ marginTop: "1.5rem" }}
              >
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1SuqYw2Ly9NpxKWhPtgANnw2"
                />
                <button className="primary" style={{ width: "100%" }}>
                  Kjøp CV
                </button>
              </form>
            </div>

            {/* CV + SØKNAD */}
            <div
              className="card"
              style={{ border: "2px solid var(--primary)" }}
            >
              <h3>CV + Søknad</h3>
              <p style={{ fontSize: "2rem", fontWeight: 700 }}>249 kr</p>

              <p>Komplett pakke for jobbsøking.</p>

              <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
                <li>Profesjonell CV</li>
                <li>Målrettet søknad</li>
                <li>PDF klar til bruk</li>
                <li>3 dagers tilgang</li>
              </ul>

              <form
                method="POST"
                action="/api/stripe/checkout"
                style={{ marginTop: "1.5rem" }}
              >
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1SuqZW2Ly9NpxKWht4M2P6ZP"
                />
                <button className="primary" style={{ width: "100%" }}>
                  Kjøp CV + Søknad
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}