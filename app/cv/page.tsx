// app/cv/page.tsx

"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function CvPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
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
        .select("has_cv")
        .eq("user_id", user.id)
        .single();

      if (!data?.has_cv) {
        router.push("/pricing");
        return;
      }

      setHasAccess(true);
      setLoading(false);
    }

    checkAccess();
  }, []);

  async function generateCv(formData: FormData) {
    setGenerating(true);
    setResult(null);

    const res = await fetch("/api/generate-cv", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setResult(json.cv);
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
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
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

          <button type="submit" disabled={generating}>
            {generating ? "Genererer…" : "Generer CV"}
          </button>
        </form>

        {/* RESULTAT */}
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
          {result ? result : "CV-en vises her etter generering."}
        </div>
      </div>
    </main>
  );
}
