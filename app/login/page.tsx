"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gratisToken =
    searchParams.get("token") ||
    (typeof window !== "undefined"
      ? localStorage.getItem("gratis_token")
      : null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError("Feil e-post eller passord.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/");
      return;
    }

    // 🔓 Gratis tilgang (24t)
    if (gratisToken) {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await supabase.from("user_entitlements").upsert(
        {
          user_id: user.id,
          has_cv: true,
          has_application: true,
          expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      localStorage.removeItem("gratis_token");
      router.push("/cv");
      return;
    }

    // 🔁 Normal flyt
    const { data } = await supabase
      .from("user_entitlements")
      .select("has_cv, expires_at")
      .eq("user_id", user.id)
      .single();

    const now = new Date();

    if (
      data?.has_cv &&
      (!data.expires_at || new Date(data.expires_at) > now)
    ) {
      router.push("/cv");
    } else {
      router.push("/pricing");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fb",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2.25rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>Logg inn</h1>

        <p style={{ color: "#555", marginBottom: "1.5rem" }}>
          Fortsett til CV-generatoren
        </p>

        <label>
          E-post
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </label>

        <label>
          Passord
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1.25rem" }}
          />
        </label>

        {error && (
          <p style={{ color: "#b00020", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Logger inn…" : "Logg inn"}
        </button>

        <p style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "#555" }}>
          Har du ikke konto?{" "}
          <Link href="/register" style={{ fontWeight: 600 }}>
            Opprett konto
          </Link>
        </p>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}