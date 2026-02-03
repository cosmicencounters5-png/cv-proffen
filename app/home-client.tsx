"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

type CtaState = "loading" | "logged-out" | "has-access" | "no-access";

export default function HomeClient() {
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

    if (ctaState === "logged-out") {
      return (
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <Link href="/register">
            <button className="cta">Registrer deg</button>
          </Link>
          <Link href="/login">
            <button className="secondary">Logg inn</button>
          </Link>
        </div>
      );
    }

    if (ctaState === "has-access") {
      return (
        <Link href="/cv">
          <button className="cta">Gå til CV</button>
        </Link>
      );
    }

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
        <h1>Lag profesjonell CV og jobbsøknad – på norsk</h1>
        <p>
          CV-Proffen hjelper deg å skrive en strukturert, korrekt og målrettet
          CV og jobbsøknad basert utelukkende på dine egne opplysninger.
          Ingen antagelser. Ingen automatisk fyll.
        </p>
        {renderCta()}
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card highlight">
          <h3>Basert kun på dine faktiske opplysninger</h3>
          <p>
            Innholdet bygges utelukkende på det du selv legger inn.
            Vi legger ikke til utdanning, erfaring eller ferdigheter.
            Dette gir en korrekt og troverdig CV.
          </p>
        </div>

        <div className="feature-card">
          <h3>Strukturert for stillingen du søker</h3>
          <p>
            CV og søknad struktureres målrettet mot stillingen,
            med tydelig prioritering, korrekt språk og profesjonell fremtoning.
          </p>
        </div>

        <div className="feature-card">
          <h3>Ferdig dokument i PDF-format</h3>
          <p>
            Last ned et ryddig og profesjonelt dokument klart til innsending.
            Egnet for både privat og offentlig sektor.
          </p>
        </div>
      </section>
    </main>
  );
}