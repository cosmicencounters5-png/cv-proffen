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
        <div className="hero-buttons">
          <Link href="/register">
            <button className="cta">Start gratis</button>
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
          <button className="cta">Gå til CV-generator</button>
        </Link>
      );
    }

    return (
      <Link href="/pricing">
        <button className="cta">Få tilgang</button>
      </Link>
    );
  }

  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">

          <span className="hero-badge">
            Norsk CV-standard • Ingen AI-hallusinasjoner
          </span>

          <h1>
            Lag en profesjonell CV og jobbsøknad
            <br />
            som faktisk fungerer i Norge
          </h1>

          <p className="hero-description">
            CV-Proffen hjelper deg å skrive en strukturert og målrettet CV
            basert kun på dine egne opplysninger. Ingen generiske tekster.
            Ingen oppdiktede ferdigheter.
          </p>

          {renderCta()}

        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust">
        <p>
          Designet for norsk arbeidsliv • Privat og offentlig sektor • ATS-vennlig struktur
        </p>
      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card highlight">
          <h3>Kun dine opplysninger</h3>
          <p>
            CV-Proffen legger aldri til informasjon du ikke har oppgitt.
            Resultatet er en troverdig og profesjonell CV.
          </p>
        </div>

        <div className="feature-card">
          <h3>Tilpasset stillingen</h3>
          <p>
            Struktur og språk optimaliseres mot jobben du søker,
            slik norske arbeidsgivere forventer.
          </p>
        </div>

        <div className="feature-card">
          <h3>PDF klar på sekunder</h3>
          <p>
            Last ned ferdig dokument klart til innsending.
            Ingen redigering nødvendig.
          </p>
        </div>

      </section>

    </main>
  );
}