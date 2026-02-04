"use client";

import { useRouter } from "next/navigation";

export default function GratisPage() {
  const router = useRouter();

  function activateFreeTrial() {
    localStorage.setItem("cvproffen_free_trial", "true");
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
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "10px",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1>Gratis tilgang i 24 timer</h1>

        <p style={{ marginTop: "1rem" }}>
          Test CV-Proffen gratis uten betaling.
        </p>

        <button
          onClick={activateFreeTrial}
          style={{
            marginTop: "1.5rem",
            background: "#111",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Aktiver gratis tilgang
        </button>
      </div>
    </main>
  );
}