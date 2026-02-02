"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          color: "white",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
              padding: "80px 0",
            }}
          >
            <div>
              <h1 style={{ fontSize: "44px", marginBottom: "20px" }}>
                Lag en profesjonell CV <br /> med AI – på minutter
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  opacity: 0.95,
                  marginBottom: "30px",
                }}
              >
                CV-Proffen bruker OpenAI til å forbedre dine
                <strong> ekte opplysninger</strong>.
                Ingen oppdiktet utdanning. Ingen løgner.
                Kun en CV som faktisk fungerer i Norge.
              </p>

              <div style={{ display: "flex", gap: "16px" }}>
                <Link href="/register">
                  <button>Kom i gang gratis</button>
                </Link>
                <Link href="/pricing">
                  <button
                    style={{
                      background: "white",
                      color: "#1e40af",
                    }}
                  >
                    Se priser
                  </button>
                </Link>
              </div>
            </div>

            <div
              style={{
                background: "white",
                color: "#111827",
                borderRadius: "16px",
                padding: "24px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>
                Eksempel på resultat
              </h3>
              <p style={{ fontSize: "14px", color: "#374151" }}>
                «Motivert og erfaren prosessoperatør med solid
                bakgrunn innen drift og produksjon. Dokumentert
                erfaring fra norsk industri, med fokus på kvalitet,
                sikkerhet og effektivitet.»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Derfor velger folk CV-Proffen
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            <div className="card">
              <h3>🎯 Ekte informasjon</h3>
              <p>
                AI-en får kun det du selv skriver inn.
                Ingen falsk utdanning eller erfaring.
              </p>
            </div>

            <div className="card">
              <h3>🇳🇴 Norsk arbeidsmarked</h3>
              <p>
                Språk, struktur og nivå tilpasset norske
                rekrutterere og ATS-systemer.
              </p>
            </div>

            <div className="card">
              <h3>⚡ Ferdig på minutter</h3>
              <p>
                Fyll ut skjemaet – få profesjonell CV og
                søknad umiddelbart.
              </p>
            </div>

            <div className="card">
              <h3>📄 PDF klar til bruk</h3>
              <p>
                Last ned en ren, moderne PDF – klar til
                Finn.no, LinkedIn og e-post.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#f3f4f6",
          marginTop: "60px",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Klar for å få flere jobbintervjuer?</h2>
          <p style={{ marginBottom: "24px" }}>
            Start gratis – betal kun når du vil laste ned.
          </p>
          <Link href="/register">
            <button>Lag CV nå</button>
          </Link>
        </div>
      </section>
    </main>
  );
}