"use client";

import { useState } from "react";

export default function PricingClient() {
  const [loading, setLoading] = useState<"cv" | "cv_plus" | null>(null);
  const [error, setError] = useState("");

  async function checkout(product: "cv" | "cv_plus") {
    try {
      setError("");
      setLoading(product);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      if (!res.ok) {
        throw new Error("Kunne ikke starte betaling");
      }

      const data = await res.json();

      if (!data.url) {
        throw new Error("Ingen betalingslenke mottatt");
      }

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Noe gikk galt");
      setLoading(null);
    }
  }

  return (
    <div className="container">
      <h1>Priser</h1>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>
          {error}
        </p>
      )}

      <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
        {/* CV */}
        <div className="card">
          <h2>Profesjonell CV</h2>
          <p>AI-generert CV basert kun på dine ekte data</p>
          <h3>299 kr</h3>

          <button
            disabled={loading === "cv"}
            onClick={() => checkout("cv")}
          >
            {loading === "cv" ? "Sender deg til betaling…" : "Kjøp CV"}
          </button>
        </div>

        {/* CV + Søknad */}
        <div className="card">
          <h2>CV + Søknad</h2>
          <p>Komplett pakke: CV + målrettet søknad</p>
          <h3>499 kr</h3>

          <button
            disabled={loading === "cv_plus"}
            onClick={() => checkout("cv_plus")}
          >
            {loading === "cv_plus"
              ? "Sender deg til betaling…"
              : "Kjøp CV + Søknad"}
          </button>
        </div>
      </div>
    </div>
  );
}