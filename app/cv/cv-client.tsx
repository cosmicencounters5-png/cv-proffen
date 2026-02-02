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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem",
    marginTop: "0.25rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

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
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* FORM */}
        <form
          action={generateCv}
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h1 style={{ marginBottom: "1.5rem" }}>CV-generator</h1>

          <label>
            Navn
            <input name="name" required style={inputStyle} />
          </label>

          <label>
            Stilling du søker
            <input name="job" required style={inputStyle} />
          </label>

          <label>
            Arbeidserfaring
            <textarea
              name="experience"
              rows={6}
              required
              style={inputStyle}
            />
          </label>

          <label>
            Utdanning (valgfritt)
            <textarea name="education" rows={4} style={inputStyle} />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#111",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Genererer CV…" : "Generer CV"}
          </button>
        </form>

        {/* RESULTAT */}
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
