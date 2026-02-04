"use client";

import { useRouter } from "next/navigation";

export default function GratisPage() {

  const router = useRouter();

  function activateTrial() {

    // 🔥 SETT FREE TRIAL FLAG
    localStorage.setItem("cvproffen_free_trial", "true");

    // Send til register
    router.push("/register");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fb",
        padding: "2rem"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          textAlign: "center",
          maxWidth: "500px"
        }}
      >

        <h1>Gratis tilgang i 24 timer</h1>

        <p style={{ marginTop: "1rem", color: "#555" }}>
          Test CV-Proffen gratis i 24 timer.
          Ingen betaling.
        </p>

        <button
          onClick={activateTrial}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 1.4rem",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Aktiver gratis tilgang
        </button>

      </div>

    </main>
  );
}