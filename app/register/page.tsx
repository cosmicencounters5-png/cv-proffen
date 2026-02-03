"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // 👈 lagres i user_metadata
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
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
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg)",
        padding: "2rem",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h1>Opprett konto</h1>

        <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
          Lag konto for å generere CV og søknad.
        </p>

        <form onSubmit={register} style={{ marginTop: "1.5rem" }}>
          <label>
            Navn
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Per Hansen"
            />
          </label>

          <label>
            E-post
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="per@epost.no"
            />
          </label>

          <label>
            Passord
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minst 6 tegn"
            />
          </label>

          {error && (
            <p style={{ color: "#c00", marginTop: "0.75rem" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="primary"
            style={{ width: "100%", marginTop: "1.5rem" }}
          >
            {loading ? "Oppretter konto…" : "Opprett konto"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem" }}>
          Har du allerede konto?{" "}
          <Link href="/login">Logg inn</Link>
        </p>
      </div>
    </main>
  );
}