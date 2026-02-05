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

          setTimeLeft(days >= 1 ? `${days} dager igjen` : `${hours} timer igjen`);
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

  if (loading) return <p style={{ padding: "2rem" }}>Laster…</p>;
  if (!hasAccess) return null;

  return (
    <main className="cv-page">
      <div className="cv-container">

        {/* LEFT PANEL */}
        <form action={generate} className="cv-form">

          <div style={{ marginBottom: "1.25rem" }}>
            <h1>
              {mode === "cv"
                ? "CV Generator"
                : "Jobbsøknad Generator"}
            </h1>

            {timeLeft && (
              <p className="access-badge">
                ⏳ Tilgang aktiv — {timeLeft}
              </p>
            )}
          </div>

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
              placeholder="Beskriv konkrete oppgaver og ansvar..."
              required
            />
          </label>

          <label>
            Utdanning (valgfritt)
            <textarea name="education" rows={4} />
          </label>

          <button className="primary" disabled={generating}>
            {generating ? "AI skriver..." : "Generer"}
          </button>

        </form>

        {/* RIGHT PANEL */}
        <section className="cv-result">

          <div className="cv-result-header">
            <h2>Forhåndsvisning</h2>

            {result && (
              <button
                className="secondary"
                onClick={() => window.print()}
              >
                Last ned PDF
              </button>
            )}

          </div>

          <div id="cv-print" className="cv-document">
            {result ? (
              formatText(result)
            ) : (
              <p className="placeholder">
                Resultatet vises her etter generering.
              </p>
            )}
          </div>

        </section>

      </div>
    </main>
  );
}