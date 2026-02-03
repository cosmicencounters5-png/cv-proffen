"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

type Mode = "cv" | "application";

export default function CvPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [hasCv, setHasCv] = useState(false);
  const [hasApplication, setHasApplication] = useState(false);
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

      setHasCv(data.has_cv);
      setHasApplication(!!data.has_application);
      setLoading(false);
    }

    checkAccess();
  }, [router, supabase]);

  async function generate(formData: FormData) {
    setGenerating(true);
    setResult(null);

    const endpoint =
      mode === "cv" ? "/api/generate-cv" : "/api/generate-application";

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
        {/* VENSTRE: FORM / OPPGRADERING */}
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>
            {mode === "cv" ? "CV-generator" : "Jobbsøknad"}
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
                background:
                  mode === "application" ? "#111" : "#eee",
                color:
                  mode === "application" ? "white" : "#111",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Søknad
            </button>
          </div>

          {/* 🔒 OPPGRADERING */}
          {mode === "application" && !hasApplication && (
            <div
              style={{
                border: "2px solid #111",
                padding: "1.5rem",
                borderRadius: "8px",
              }}
            >
              <h2>Jobbsøknad er ikke inkludert</h2>

              <p style={{ marginTop: "0.5rem" }}>
                Du har allerede tilgang til CV. Legg til målrettet
                jobbsøknad for å få full pakke.
              </p>

              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginTop: "1rem",
                }}
              >
                100 kr
              </p>

              <form
                method="POST"
                action="/api/stripe/checkout"
                style={{ marginTop: "1rem" }}
              >
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1Swe8d2Ly9NpxKWhXtP3o5pA"
                />
                <button
                  className="primary"
                  style={{ width: "100%" }}
                >
                  Oppgrader nå
                </button>
              </form>
            </div>
          )}

          {/* 📝 SKJEMA */}
          {(mode === "cv" || hasApplication) && (
            <form action={generate}>
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
                <textarea
                  name="experience"
                  rows={6}
                  required
                />
              </label>

              <label>
                Utdanning (valgfritt)
                <textarea name="education" rows={4} />
              </label>

              <button
                type="submit"
                disabled={generating}
                style={{ marginTop: "1rem" }}
              >
                {generating
                  ? "Genererer…"
                  : mode === "cv"
                  ? "Generer CV"
                  : "Generer søknad"}
              </button>
            </form>
          )}
        </div>

        {/* HØYRE: RESULTAT */}
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          <h2>Resultat</h2>
          {result
            ? result
            : "Resultatet vises her etter generering."}
        </div>
      </div>
    </main>
  );
}