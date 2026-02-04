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
  const [hasApplication, setHasApplication] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
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

      setHasApplication(!!data.has_application);
      setHasAccess(true);

      if (data.expires_at) {
        const expires = new Date(data.expires_at);
        const diffMs = expires.getTime() - now.getTime();

        if (diffMs > 0) {
          const hours = Math.floor(diffMs / (1000 * 60 * 60));
          const days = Math.floor(hours / 24);

          if (days >= 1) {
            setTimeLeft(`${days} dag${days > 1 ? "er" : ""}`);
          } else {
            setTimeLeft(`${hours} time${hours !== 1 ? "r" : ""}`);
          }
        }
      }

      setLoading(false);
    }

    checkAccess();
  }, [router, supabase]);

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
        {/* VENSTRE */}
        <form action={generate} className="cv-form">
          <h1 style={{ marginBottom: "0.25rem" }}>
            {mode === "cv" ? "Lag profesjonell CV" : "Skriv jobbsøknad"}
          </h1>

          {timeLeft && (
            <p
              style={{
                marginBottom: "1.25rem",
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              ⏳ Tilgangen din varer i {timeLeft}
            </p>
          )}

          <p style={{ marginBottom: "1.25rem", color: "#555" }}>
            Fyll inn opplysningene dine nedenfor. Teksten genereres kun
            basert på det du selv skriver inn.
          </p>

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
                if (!hasApplication) {
                  router.push("/pricing");
                  return;
                }
                setMode("application");
                setResult(null);
              }}
            >
              Søknad
            </button>
          </div>

          <label>
            Fullt navn
            <input name="name" required />
          </label>

          <label>
            Stilling du søker
            <input name="job" required />
          </label>

          <label>
            Arbeidserfaring
            <textarea
              name="experience"
              rows={6}
              placeholder="Beskriv kort dine viktigste arbeidsoppgaver og resultater"
              required
            />
          </label>

          <label>
            Utdanning (valgfritt)
            <textarea
              name="education"
              rows={4}
              placeholder="Utdanning, kurs eller sertifiseringer"
            />
          </label>

          <button type="submit" className="primary" disabled={generating}>
            {generating
              ? "Genererer…"
              : mode === "cv"
              ? "Generer CV"
              : "Generer søknad"}
          </button>
        </form>

        {/* HØYRE */}
        <section className="cv-result">
          <div className="cv-result-header">
            <h2>Forhåndsvisning</h2>
            {result && (
              <button onClick={() => window.print()} className="secondary">
                Last ned PDF
              </button>
            )}
          </div>

          <div id="cv-print" className="cv-document">
            {result ? (
              formatText(result)
            ) : (
              <p style={{ color: "#666" }}>
                Resultatet vises her etter at du har generert teksten.
              </p>
            )}
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