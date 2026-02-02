"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

type CtaState = "loading" | "logged-out" | "has-access" | "no-access";

export default function HomePage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [ctaState, setCtaState] = useState<CtaState>("loading");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // ❌ Ikke innlogget
      if (!user) {
        setCtaState("logged-out");
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
        setCtaState("has-access");
      } else {
        setCtaState("no-access");
      }
    }

    checkUser();
  }, [supabase]);

  function renderCta() {
    if (ctaState === "loading") return null;

    // 🔓 Ikke innlogget
    if (ctaState === "logged-out") {
      return (
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Link href="/register">
            <button className="cta">Registrer deg</button>
          </Link>

          <Link href="/login">
            <button className="secondary">Logg inn</button>
          </Link>
        </div>
      );
    }

    // ✅ Har tilgang
    if (ctaState === "has-access") {
      return (
        <Link href="/cv">
          <button className="cta">Gå til CV</button>
        </Link>
      );
    }

    // 💳 Innlogget uten tilgang
    return (
      <Link href="/pricing">
        <button className="cta">Velg pakke</button>
      </Link>
    );
  }

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <h1>Klar på minutter.</h1>

        <p>
          Lag en målrettet CV og søknad basert kun på dine egne opplysninger.
          Strukturert, presist og klart til bruk.
        </p>

        {renderCta()}
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card highlight">
          <h3>Kun dine opplysninger</h3>
          <p>
            CV og søknad bygges utelukkende på det du selv skriver inn.
            Ingen antagelser. Ingen tillegg.
          </p>
        </div>

        <div className="feature-card">
          <h3>Tilpasset stillingen</h3>
          <p>
            Innholdet struktureres direkte mot jobben du søker, med riktig språk
            og prioritering.
          </p>
        </div>

        <div className="feature-card">
          <h3>PDF klar til bruk</h3>
          <p>
            Last ned ferdig dokument og send det direkte til arbeidsgiver.
            Ingen ekstra redigering nødvendig.
          </p>
        </div>
      </section>
    </main>
  );
}