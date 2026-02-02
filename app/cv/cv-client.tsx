"use client";

import { useState } from "react";

export default function CvClient() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateCv(formData) {
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
    <main style={{ minHeight: "100vh", padding: "4rem 1rem", background: "#f8f9fb" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        <form
          action={generateCv}
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
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

          <button type="submit">
            {loading ? "Genererer…" : "Generer CV"}
          </button>
        </form>

        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>Resultat<
