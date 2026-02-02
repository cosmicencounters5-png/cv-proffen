// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

type UserState = "loading" | "loggedOut" | "loggedIn";

export default function HomePage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [state, setState] = useState<UserState>("loading");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setState(user ? "loggedIn" : "loggedOut");
    }

    checkUser();
  }, [supabase]);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "5rem 1rem",
        background: "#f8f9fb",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Profesjonell CV. Klar på minutter.
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#555",
            marginBottom: "2.5rem",
          }}
        >
          Lag en målrettet CV og søknad basert kun på dine egne opplysninger.
          Ingen gjetting. Ingen tull.
        </p>

        {/* CTA */}
        <div style={{ marginBottom: "3rem" }}>
          {state === "loading" && <span>Laster…</span>}

          {state === "loggedOut" && (
            <>
              <Link
                href="/register"
                style={{
                  marginRight: "1rem",
                  padding: "0.9rem 1.5rem",
                  background: "#111",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Registrer deg
              </Link>

              <Link
                href="/login"
                style={{
                  padding: "0.9rem 1.5rem",
                  background: "#eee",
                  color: "#111",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                Logg inn
              </Link>
            </>
          )}

          {state === "loggedIn" && (
            <Link
              href="/cv"
              style={{
                padding: "0.9rem 1.5rem",
                background: "#111",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Gå til CV
            </Link>
          )}
        </div>

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
            textAlign: "left",
          }}
        >
          <Feature
            title="Ingen hallusinasjoner"
            text="Vi bruker kun informasjonen du selv legger inn."
          />
          <Feature
            title="Tilpasset stillingen"
            text="CV og søknad skrives direkte mot jobben du søker."
          />
          <Feature
            title="PDF klar til bruk"
            text="Last ned dokumentet og send det rett til arbeidsgiver."
          />
        </div>
      </div>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        background: "white",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: "#555", margin: 0 }}>{text}</p>
    </div>
  );
}
