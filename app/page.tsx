// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "5rem 1rem",
        background: "#f8f9fb",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Profesjonell CV. Klar på minutter.
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#555",
            marginBottom: "2.5rem",
          }}
        >
          CV-Proffen hjelper deg å lage en ryddig, målrettet CV og søknad – uten
          gjetting, uten tull.
        </p>

        <Link
          href="/pricing"
          style={{
            display: "inline-block",
            padding: "0.9rem 1.5rem",
            background: "#111",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Kom i gang
        </Link>

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
            marginTop: "4rem",
            textAlign: "left",
          }}
        >
          <Feature
            title="Ingen hallusinasjoner"
            text="Vi bruker kun informasjonen du selv legger inn. Ingenting blir funnet på."
          />
          <Feature
            title="Tilpasset stillingen"
            text="CV og søknad skrives direkte mot jobben du søker."
          />
          <Feature
            title="PDF klar til bruk"
            text="Last ned dokumentet og send det rett til arbeidsgiver."
          />
        </div>
      </div>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        background: "white",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: "#555", margin: 0 }}>{text}</p>
    </div>
  );
}
