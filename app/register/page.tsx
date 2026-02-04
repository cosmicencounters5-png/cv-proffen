"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const hasFreeTrial =
      typeof window !== "undefined" &&
      localStorage.getItem("cvproffen_free_trial") === "true";

    const { data, error: signUpError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

    if (signUpError || !data.user) {
      setError(signUpError?.message || "Noe gikk galt.");
      setLoading(false);
      return;
    }

    // 🆓 GRATIS 24T TILGANG
    if (hasFreeTrial) {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await supabase.from("user_entitlements").upsert(
        {
          user_id: data.user.id,
          has_cv: true,
          has_application: false,
          expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      localStorage.removeItem("cvproffen_free_trial");

      router.push("/cv");
      router.refresh();
      return;
    }

    router.push("/pricing");
    router.refresh();
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
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>
          Opprett konto
        </h1>

        <p style={{ marginBottom: "1.5rem", color: "#555" }}>
          Kom i gang med CV-Proffen.
        </p>

        <label>
          Navn
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </label>

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
            minLength={6}
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
            padding: "0.8rem",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Oppretter konto…" : "Opprett konto"}
        </button>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          Har du allerede konto?{" "}
          <Link href="/login" style={{ fontWeight: 600 }}>
            Logg inn
          </Link>
        </p>
      </form>
    </main>
  );
}