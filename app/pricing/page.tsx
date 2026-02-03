"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useSearchParams } from "next/navigation";

type AccessState = "loading" | "no-access" | "has-access";

export default function PricingPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const searchParams = useSearchParams();
  const upgradeTarget = searchParams.get("upgrade"); // "application" | null

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

      const hasValidCvAccess =
        data?.has_cv &&
        (!data.expires_at || new Date(data.expires_at) > now);

      // 🔴 Viktig: Hvis bruker er her for å oppgradere til søknad,
      // skal vi IKKE vise "har allerede tilgang"
      if (upgradeTarget === "application") {
        setState("no-access");
        return;
      }

      if (hasValidCvAccess) {
        setState("has-access");
      } else {
        setState("no-access");
      }
    }

    checkAccess();
  }, [supabase, upgradeTarget]);

  return (
    <main style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1>Velg pakke</h1>

        <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
          Velg pakken som passer deg best. Tilgangen varer i 3 dager.
        </p>

        {state === "loading" && <p>Laster…</p>}

        {/* HAR TILGANG (kun CV og ikke i upgrade-modus) */}
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

        {/* KJØP / OPPGRADER */}
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
            {!upgradeTarget && (
              <div className="card">
                <h3>CV</h3>

                <p style={{ fontSize: "2rem", fontWeight: 700 }}>
                  149 kr
                </p>

                <p>Lag en profesjonell CV basert på dine egne opplysninger.</p>

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
            )}

            {/* CV + SØKNAD */}
            <div
              className="card"
              style={{
                border: "2px solid var(--primary)",
              }}
            >
              <h3>
                {upgradeTarget === "application"
                  ? "Oppgrader til søknad"
                  : "CV + Søknad"}
              </h3>

              <p style={{ fontSize: "2rem", fontWeight: 700 }}>
                249 kr
              </p>

              <p>
                {upgradeTarget === "application"
                  ? "Legg til målrettet jobbsøknad."
                  : "CV og målrettet jobbsøknad."}
              </p>

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
                  {upgradeTarget === "application"
                    ? "Oppgrader nå"
                    : "Kjøp CV + Søknad"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
