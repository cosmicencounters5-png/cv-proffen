"use client";

import { useEffect, useState } from "react";
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

        <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
          Velg pakken som passer deg best. Tilgangen varer i 3 dager.
        </p>

        {state === "loading" && <p>Laster…</p>}

        {/* HAR AKTIV TILGANG */}
        {state === "has-access" && (
          <div className="card" style={{ marginTop: "2rem" }}>
            <h2>Du har allerede aktiv tilgang ✅</h2>
            <p>
              Du kan gå rett til CV-generatoren og fortsette der du slapp.
            </p>

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
              <p style={{ marginTop: "0.5rem" }}>
                Lag en profesjonell CV basert kun på dine egne opplysninger.
              </p>

              <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
                <li>AI-generert CV</li>
                <li>PDF klar til bruk</li>
                <li>3 dagers tilgang</li>
              </ul>

              <button
                className="primary"
                style={{ width: "100%", marginTop: "1.5rem" }}
                onClick={() => {
                  window.location.href =
                    "/api/stripe/checkout?price_id=price_1SuqYw2Ly9NpxKWhPtgANnw2";
                }}
              >
                Kjøp CV
              </button>
            </div>

            {/* CV + SØKNAD */}
            <div
              className="card"
              style={{
                border: "2px solid var(--primary)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "12px",
                  background: "var(--primary)",
                  color: "white",
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.75rem",
                  borderRadius: "999px",
                }}
              >
                Mest populær
              </div>

              <h3>CV + Søknad</h3>
              <p style={{ marginTop: "0.5rem" }}>
                Full pakke: CV og målrettet jobbsøknad.
              </p>

              <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
                <li>Profesjonell CV</li>
                <li>Målrettet søknad</li>
                <li>PDF klar til bruk</li>
                <li>3 dagers tilgang</li>
              </ul>

              <button
                className="primary"
                style={{ width: "100%", marginTop: "1.5rem" }}
                onClick={() => {
                  window.location.href =
                    "/api/stripe/checkout?price_id=price_1SuqZW2Ly9NpxKWht4M2P6ZP";
                }}
              >
                Kjøp CV + Søknad
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}