"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GratisPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Lagre gratis-token midlertidig slik at login/register kan bruke det
      localStorage.setItem("gratis_token", token);
    }
  }, [token]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "white",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "0.75rem" }}>
          Gratis tilgang aktivert 🎉
        </h1>

        <p style={{ color: "#555", lineHeight: 1.6 }}>
          Du har fått <strong>24 timers gratis tilgang</strong> til CV-Proffen.
          <br />
          Lag profesjonell CV og jobbsøknad basert kun på dine egne opplysninger.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/register">
            <button
              style={{
                padding: "0.65rem 1.2rem",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Opprett konto
            </button>
          </Link>

          <Link href="/login">
            <button
              style={{
                padding: "0.65rem 1.2rem",
                background: "#eee",
                color: "#111",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Logg inn
            </button>
          </Link>
        </div>

        <p
          style={{
            marginTop: "1.75rem",
            fontSize: "0.85rem",
            color: "#777",
          }}
        >
          Ingen betaling. Ingen binding. Tilgangen utløper automatisk.
        </p>
      </div>
    </main>
  );
}