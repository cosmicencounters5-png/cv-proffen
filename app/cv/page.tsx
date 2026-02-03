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
  const [name, setName] = useState<string | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const [hasCv, setHasCv] = useState(false);
  const [hasApplication, setHasApplication] = useState(false);
  const [mode, setMode] = useState<Mode>("cv");

  const [result, setResult] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setName(user.user_metadata?.name ?? null);

      const { data } = await supabase
        .from("user_entitlements")
        .select("has_cv, has_application, expires_at")
        .eq("user_id", user.id)
        .single();

      if (!data?.has_cv) {
        router.push("/pricing");
        return;
      }

      setHasCv(data.has_cv);
      setHasApplication(!!data.has_application);

      if (data.expires_at) {
        const expires = new Date(data.expires_at);
        const now = new Date();
        const diffDays = Math.ceil(
          (expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        setDaysLeft(diffDays > 0 ? diffDays : 0);
      }

      setLoading(false);
    }

    load();
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
        padding: "3rem 1rem",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: "2rem" }}>
          <h1>
            God dag{ name ? `, ${name}` : "" }
          </h1>

          {daysLeft !== null && (
            <p style={{ color: "var(--muted)" }}>
              Du har <strong>{daysLeft}</strong> dag
              {daysLeft === 1 ? "" : "er"} igjen av tilgangen.
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {/* VENSTRE */}
          <div className="card">
            {/* MODE */}
            <div style={{ marginBottom: "1rem" }}>
              <button
                onClick={() => setMode("cv")}
                style={{
                  marginRight: "0.5rem",
                  background: mode === "cv" ? "var(--primary)" : "#eee",
                  color: mode === "cv" ? "white" : "#111",
                  border: "none",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                CV
              </button>

              <button
                onClick={() => setMode("application")}
                style={{
                  background:
                    mode === "application" ? "var(--primary)" : "#eee",
                  color:
                    mode === "application" ? "white" : "#111",
                  border: "none",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Søknad
              </button>
            </div>

            {/* OPPGRADER */}
            {mode === "application" && !hasApplication && (
              <div
                style={{
                  border: "2px solid var(--primary)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                }}
              >
                <h2>Oppgrader til Søknad</h2>
                <p>Legg til målrettet jobbsøknad.</p>

                <p style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                  100 kr
                </p>

                <form method="POST" action="/api/stripe/checkout">
                  <input
                    type="hidden"
                    name="price_id"
                    value="price_1Swe8d2Ly9NpxKWhXtP3o5pA"
                  />
                  <button className="primary" style={{ width: "100%" }}>
                    Oppgrader nå
                  </button>
                </form>
              </div>
            )}

            {/* FORM */}
            {(mode === "cv" || hasApplication) && (
              <form action={generate} style={{ marginTop: "1rem" }}>
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

          {/* RESULTAT */}
          <div className="card" style={{ whiteSpace: "pre-wrap" }}>
            <h2>Resultat</h2>
            {result ?? "Resultatet vises her etter generering."}
          </div>
        </div>
      </div>
    </main>
  );
}