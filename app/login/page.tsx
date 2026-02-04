
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const hasFreeTrial =
      typeof window !== "undefined" &&
      localStorage.getItem("cvproffen_free_trial") === "true";

    // 🆓 GRATIS TILGANG
    if (hasFreeTrial) {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await supabase.from("user_entitlements").upsert(
        {
          user_id: user.id,
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

    // 🔁 NORMAL FLYT
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
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>Logg inn</h1>

        <p style={{ marginBottom: "1.5rem", color: "#555" }}>
          Logg inn for å fortsette til CV-Proffen.
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

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          Har du ikke konto?{" "}
          <Link href="/register" style={{ fontWeight: 600 }}>
            Opprett konto
          </Link>
        </p>
      </form>
    </main>
  );
}