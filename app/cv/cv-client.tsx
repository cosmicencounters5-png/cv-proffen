// app/cv/cv-client.tsx
"use client";

import { useState } from "react";

function formatCv(text: string) {
  // Enkel formattering basert på linjeskift
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  return lines.map((line, i) => {
    if (
      line.toLowerCase().includes("profil") ||
      line.toLowerCase().includes("erfaring") ||
      line.toLowerCase().includes("utdanning")
    ) {
      return (
        <h3
          key={i}
          style={{
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            borderBottom: "1px solid #ddd",
            paddingBottom: "0.25rem",
          }}
        >
          {line}
        </h3>
      );
    }

    return (
      <p key={i} style={{ marginBottom: "0.5rem", lineHeight: 1.6 }}>
        {line}
      </p>
    );
  });
}

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

  const inputStyle = {
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
            <input name="name" r
