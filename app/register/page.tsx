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
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    // ✅ Opprett bruker
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (signUpError || !data.user) {
      setError("Kunne ikke opprette konto.");
      setLoading(false);
      return;
    }

    const user = data.user;

    // 🔥 GRATIS TRIAL FLOW
    const freeTrial =
      typeof window !== "undefined"
        ? localStorage.getItem("cvproffen_free_trial")
        : null;

    if (freeTrial === "true") {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await supabase.from("user_entitlements").upsert({
        user_id: user.id,
        has_cv: true,
        has_application: false,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      });

      localStorage.removeItem("cvproffen_free_trial");

      router.push("/cv");
      return;
    }

    // 🚫 Normal flow
    router.push("/pricing");
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
          borderRadius: "14px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h1>Opprett konto</h1>

        <p style={{ color: "#555", marginBottom: "1.5rem" }}>
          Kom i gang med CV-Proffen
        </p>

        <label>
          Navn
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ?