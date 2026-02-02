// app/cv/cv-client.tsx
"use client";

import { useState } from "react";

export default function CvClient() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateCv(formData: FormData) {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/generate-cv", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.cv);
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 1rem",
        background: "#f8f9fb",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Form */}
        <form
          action={generateCv}
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h1>CV-generator</h1>

          <label>
            Navn
            <input name="name" required />
          </label>

          <label>
            Stilling du søker
            <input name="job" required />
          </label>

          <label>
            Arbeidserfaring
            <textarea name="experience" rows={6} required />
          </label>

          <label>
            Utdanning (valgfritt)
            <textarea name="education" rows={4} />
          </label>

          <button disabled={loading}>
            {loading ? "Genererer..." : "Generer CV"}
          </button>
        </form>

        {/* Result */}
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>Resultat</h2>
          {result ? result : "CV-en vises her"}
        </div>
      </div>
    </main>
  );
}
