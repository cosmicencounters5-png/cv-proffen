"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

type Mode = "cv" | "application";

/**
 * Enkel, defensiv formattering:
 * - Leser linje for linje
 * - Gir seksjonsfølelse
 * - Ingen JSX-triks som kan knekke build
 */
function formatText(text: string) {
  const lines = text.split("\n").filter(Boolean);

  return lines.map((line, i) => {
    const lower = line.toLowerCase();

    if (
      lower.includes("profil") ||
      lower.includes("erfaring") ||
      lower.includes("utdanning") ||
      lower.includes("kompetanse")
    ) {
      return (
        <h3
          key={i}
          style={{
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.25rem",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {line}
        </h3>
      );
    }

    return (
      <p key={i} style={{ marginBottom: "0.5rem" }}>
        {line}
      </p>
    );
  });
}

export default function CvPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [mode, setMode] = useState<Mode>("cv");
  const [result, setResult] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("user_entitlements")
        .select("has_cv, has_application")
        .eq("user_id", user.id)
        .single();

      if (!data?.has_cv) {
        router.push("/pricing");
        return;
      }

      if (mode === "application" && !data.has_application) {
        setMode("cv");
      }

      setHasAccess(true);
      setLoading(false);
    }

    checkAccess();
  }, [router, supabase, mode]);

  async function generate(formData: FormData) {
    setGenerating(true);
    setResult(null);

    const endpoint =
      mode === "cv"
        ? "/api/generate-cv"
        : "/api/generate-application";

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setResult(mode === "cv" ? json.cv : json.application);
    setGenerating(false);
  }

  if (loading) {
    return <p style={{ padding: "2rem" }}>Laster…</p>;
  }

  if (!hasAccess) {
    return null;
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
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        {/* FORM */}
        <form
          action={generate}
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>
            {mode === "cv" ? "CV-generator" : "Søknadsgenerator"}
          </h1>

          {/* TOGGLE */}
          <div style={{ marginBottom: "1.5rem" }}>
            <button
              type="button"
              onClick={() => {
                setMode("cv");
                setResult(null);
              }}
              style={{
                marginRight: "0.5rem",
                padding: "0.4rem 0.75rem",
                background: mode === "cv" ? "#111" : "#eee",
                color: mode === "cv" ? "white" : "#111",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              CV
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("application");
                setResult(null);
              }}
              style={{
                padding: "0.4rem 0.75rem",
                background: mode === "application" ? "#111" : "#eee",
                color: mode === "application" ? "white" : "#111",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Søknad
            </button>
          </div>

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

          <button type="submit" disabled={generating}>
            {generating
              ? "Genererer…"
              : mode === "cv"
              ? "Generer CV"
              : "Generer søknad"}
          </button>
        </form>

        {/* RESULTAT */}
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2>Resultat</h2>

            {result && (
              <button
                onClick={() => window.print()}
                style={{
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.9rem",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Last ned PDF
              </button>
            )}
          </div>

          <div
            id="cv-print"
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              fontFamily: "Georgia, serif",
            }}
          >
            {result
              ? formatText(result)
              : mode === "cv"
              ? "CV-en vises her etter generering."
              : "Søknaden vises her etter generering."}
          </div>
        </div>
      </div>

      {/* PRINT CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #cv-print,
          #cv-print * {
            visibility: visible;
          }

          #cv-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2cm;
            font-size: 12pt;
          }

          button {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
