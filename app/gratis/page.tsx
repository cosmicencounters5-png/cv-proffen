"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GratisPage() {
  useEffect(() => {
    // Marker at brukeren kom via gratis-lenke
    localStorage.setItem("cvproffen_free_trial", "true");
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "0.75rem" }}>
          🎉 Gratis tilgang aktivert
        </h1>

        <p style={{ color: "#555", lineHeight: 1.6 }}>
          Du har fått <strong>24 timers gratis tilgang</strong> til CV-Proffen.
          <br />
          Ingen betaling. Ingen binding.
        </p>

        <p style={{ marginTop: "1rem", color: "#555" }}>
          Logg inn eller opprett konto for å aktivere tilgangen.
        </p>

        <div
          style={{
            marginTop: "1.75rem",
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <Link href="/login">
            <button
              style={{
                padding: "0.6rem 1.1rem",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Logg inn
            </button>
          </Link>

          <Link href="/register">
            <button
              style={{
                padding: "0.6rem 1.1rem",
                background: "#eee",
                color: "#111",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Opprett konto
            </button>
          </Link>
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            color: "#777",
          }}
        >
          Tilgangen starter når du logger inn.
        </p>
      </div>
    </main>
  );
}