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
          <button className="cta">Fortsett der du slapp</button>
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
      <section className="hero elite-hero">
        <div className="hero-inner">

          <span className="hero-badge">
            Norsk CV-standard • Ingen AI-hallusinasjoner
          </span>

          <h1>
            CV som faktisk fungerer
            <br />
            i norsk arbeidsliv
          </h1>

          <p className="hero-description">
            Slutt på generiske AI-CV-er. CV-Proffen lager strukturert,
            profesjonell CV og jobbsøknad basert kun på dine egne
            opplysninger — tilpasset norske arbeidsgivere.
          </p>

          {renderCta()}

          <p className="hero-microtrust">
            ✔ Ingen abonnement • ✔ Ferdig PDF • ✔ Norsk struktur
          </p>

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
            Ingen AI som finner på ting. CV-Proffen bruker kun det du
            selv skriver — og gjør det profesjonelt.
          </p>
        </div>

        <div className="feature-card">
          <h3>Norsk struktur</h3>
          <p>
            Optimalisert for norske arbeidsgivere og rekrutterere —
            ikke amerikanske CV-mal-generatorer.
          </p>
        </div>

        <div className="feature-card">
          <h3>Ferdig dokument</h3>
          <p>
            Last ned profesjonell PDF klar til innsending.
            Ingen redigering nødvendig.
          </p>
        </div>

      </section>

    </main>
  );
}