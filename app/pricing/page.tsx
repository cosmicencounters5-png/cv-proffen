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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setState("no-access");
        return;
      }

      setUserId(user.id);

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

  function CheckoutForm({
    priceId,
    label,
  }: {
    priceId: string;
    label: string;
  }) {
    if (!userId) return null;

    return (
      <form method="POST" action="/api/stripe/checkout">
        <input type="hidden" name="price_id" value={priceId} />
        <input type="hidden" name="user_id" value={userId} />
        <button className="primary" style={{ width: "100%" }}>
          {label}
        </button>
      </form>
    );
  }

  return (
    <main style={{ padding: "4rem 1rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1>Velg pakke</h1>
        <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
          Engangskjøp. Tilgangen varer i 3 dager.
        </p>

        {state === "loading" && <p>Laster…</p>}

        {state === "has-full-access" && (
          <div className="card" style={{ marginTop: "2rem" }}>
            <h2>Du har full tilgang ✅</h2>
            <a href="/cv" className="primary">
              Gå til CV
            </a>
          </div>
        )}

        {state === "can-upgrade" && (
          <div className="card" style={{ marginTop: "2rem" }}>
            <h3>Oppgrader med jobbsøknad</h3>
            <p style={{ fontSize: "2rem", fontWeight: 700 }}>100 kr</p>
            <CheckoutForm
              priceId="price_1Swe8d2Ly9NpxKWhXtP3o5pA"
              label="Oppgrader nå"
            />
          </div>
        )}

        {state === "no-access" && (
          <div
            style={{
              marginTop: "3rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="card">
              <h3>CV</h3>
              <p style={{ fontSize: "2rem", fontWeight: 700 }}>149 kr</p>
              <CheckoutForm
                priceId="price_1SuqYw2Ly9NpxKWhPtgANnw2"
                label="Kjøp CV"
              />
            </div>

            <div className="card" style={{ border: "2px solid var(--primary)" }}>
              <h3>CV + Søknad</h3>
              <p style={{ fontSize: "2rem", fontWeight: 700 }}>249 kr</p>
              <CheckoutForm
                priceId="price_1SuqZW2Ly9NpxKWht4M2P6ZP"
                label="Kjøp CV + Søknad"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}