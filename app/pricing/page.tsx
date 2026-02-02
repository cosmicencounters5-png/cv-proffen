// app/pricing/page.tsx

export default function PricingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 1rem",
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
        <h1 style={{ marginBottom: "0.5rem" }}>Velg produkt</h1>
        <p style={{ marginBottom: "3rem", color: "#555" }}>
          Engangskjøp. Umiddelbar tilgang.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* CV */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2>CV</h2>
            <p style={{ fontSize: "2rem", fontWeight: 600 }}>149 kr</p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "1.5rem 0",
                color: "#444",
              }}
            >
              <li>✔️ Profesjonell CV</li>
              <li>✔️ Tilpasset stilling</li>
              <li>✔️ Klar til bruk</li>
            </ul>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Velg CV
            </button>
          </div>

          {/* CV + Søknad */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              border: "2px solid #111",
            }}
          >
            <h2>CV + Søknad</h2>
            <p style={{ fontSize: "2rem", fontWeight: 600 }}>249 kr</p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "1.5rem 0",
                color: "#444",
              }}
            >
              <li>✔️ Profesjonell CV</li>
              <li>✔️ Personlig søknad</li>
              <li>✔️ Samme stil og tone</li>
            </ul>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Velg pakke
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
