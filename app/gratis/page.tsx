"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function GratisInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token =
      searchParams.get("token") || crypto.randomUUID();

    // Lagre token midlertidig
    localStorage.setItem("gratis_token", token);

    // Send bruker til login
    router.push("/login");
  }, [router, searchParams]);

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
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1>Gratis tilgang aktiveres</h1>
        <p style={{ marginTop: "1rem", color: "#555" }}>
          Vi klargjør din gratis 24-timers tilgang.
          <br />
          Du blir sendt videre nå…
        </p>
      </div>
    </main>
  );
}

export default function GratisPage() {
  return (
    <Suspense fallback={null}>
      <GratisInner />
    </Suspense>
  );
}