"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

type Mode = "cv" | "application";

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
        <h3 key={i} className="cv-section-title">
          {line}
        </h3>
      );
    }

    return (
      <p key={i} className="cv-paragraph">
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
        .select("has_cv, has_application, expires_at")
        .eq("user_id", user.id)
        .single();

      const now = new Date();

      if (
        !data?.has_cv ||
        (data.expires_at && new Date(data.expires_at) < now)
      ) {
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
  }, [mode, router, supabase]);

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
    <main className="cv-page">
      <div className="cv-container">
        {/* VENSTRE: FORM */}
        <form action={generate} className="cv-form">
          <h1>{mode === "cv" ? "CV-generator" : "Søknadsgenerator"}</h1>

          <div className="mode-toggle">
            <button
              type="button"
              className={mode === "cv" ? "active" : ""}
              onClick={() => {
                setMode("cv");
                setResult(null);
              }}
            >
              CV
            </button>
            <button
              type="button"
              className={mode === "application" ? "active" : ""}
              onClick={() => {
                setMode("application");
                setResult(null);
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

          <button type="submit" className="primary" disabled={generating}>
            {generating
              ? "Genererer…"
              : mode === "cv"
              ? "Generer CV"
              : "Generer søknad"}
          </button>
        </form>

        {/* HØYRE: RESULTAT */}
        <section className="cv-result">
          <div className="cv-result-header">
            <h2>Resultat</h2>
            {result && (
              <button onClick={() => window.print()} className="secondary">
                Last ned PDF
              </button>
            )}
          </div>

          <div id="cv-print" className="cv-document">
            {result
              ? formatText(result)
              : mode === "cv"
              ? "CV-en vises her etter generering."
              : "Søknaden vises her etter generering."}
          </div>
        </section>
      </div>

      {/* PRINT */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-print, #cv-print * {
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
        }
      `}</style>
    </main>
  );
}