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
    async function checkAccess() {
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
        const diff = Math.ceil(
          (expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        setDaysLeft(diff > 0 ? diff : 0);
      }

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
        padding: "3rem 1rem",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* 👋 HEADER */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ marginBottom: "0.25rem" }}>
            God dag{ name ? `, ${name}` : "" }
          </h1>

          {daysLeft !== null && (
            <p style={{ color: "var(--muted)" }}>
              Du har <strong>{daysLeft} dag{daysLeft === 1 ? "" : "er"}</strong>{" "}
              igjen av tilgangen din.
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
            {/* TOGGLE */}
            <div style={{ marginBottom: "1.5rem" }}>
              <button
                type="button"
                onClick={() => {
                  setMode("cv");
                  setResult(null);
                }}
                style={{
                  marginRight