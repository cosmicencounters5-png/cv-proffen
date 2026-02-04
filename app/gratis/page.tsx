"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GratisPage() {
  const router = useRouter();

  useEffect(() => {
    // Marker at brukeren kommer fra gratis-tilgang
    if (typeof window !== "undefined") {
      localStorage.setItem("cvproffen_free_trial", "true");
    }
  }, []);

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
      <section
        style={{
          background: "white",
          maxWidth: "560px",
          width: "100%",
          padding: "3rem",
          borderRadius: "14px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "0.75rem" }}>
          🎉 Gratis tilgang i 24 timer
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "#444",
            marginBottom: "1.75rem",
          }}
        >
          Du får full tilgang til å lage profesjonell CV på norsk – helt gratis
          i 24 timer.  
          Ingen betaling. Ingen binding.
        </p>

        <ul
          style={{
            textAlign: "left",
            maxWidth: "420px",
            margin: "0 auto 2rem",
            lineHeight: 1.8,
            color: "#333",
          }}
        >
          <li>✔️ Lag profesjonell CV</li>
          <li>✔️ Tilpasset stillingen du søker</li>
          <li>✔️ Last ned ferdig PDF</li>
          <li>✔️ 24 timer gratis tilgang</li>
        </ul>

        <Link
          href="/register"
          style={{
            display: "inline-block",
            background: "#111",
            color: "white",
            padding: "0.9rem 1.6rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Aktiver gratis tilgang
        </Link>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          Har du allerede konto?{" "}
          <Link href="/login" style={{ fontWeight: 600 }}>
            Logg inn
          </Link>
        </p>
      </section>
    </main>
  );
}