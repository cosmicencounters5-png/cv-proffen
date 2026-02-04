import Link from "next/link";

export const metadata = {
  title: "Lage CV – Slik lager du en profesjonell CV på norsk | CV-Proffen",
  description:
    "Lær hvordan du lager en profesjonell CV på norsk. Struktur, innhold og vanlige spørsmål om CV. Lag CV enkelt og korrekt med CV-Proffen.",
  alternates: {
    canonical: "/lage-cv",
  },
};

export default function LageCvPage() {
  return (
    <main
      style={{
        background: "#f8f9fb",
        padding: "4rem 1rem",
      }}
    >
      <article
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          background: "white",
          padding: "3rem",
          borderRadius: "10px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
        }}
      >
        <header style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
            Lage CV – slik lager du en profesjonell CV på norsk
          </h1>
          <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.7 }}>
            En god CV er strukturert, presis og tilpasset stillingen du søker.
            Denne guiden viser deg hvordan du lager en profesjonell CV som
            fungerer både i privat og offentlig sektor.
          </p>
        </header>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Hva er en CV?</h2>
          <p>
            En CV (curriculum vitae) er en oversikt over arbeidserfaring,
            utdanning, kompetanse og relevante ferdigheter. Målet er å gi
            arbeidsgiver et korrekt og tydelig bilde av deg som kandidat.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Hvordan lage en god CV</h2>
          <p>En profesjonell CV inneholder vanligvis:</p>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
            <li>Personopplysninger</li>
            <li>Kort profil eller sammendrag</li>
            <li>Arbeidserfaring</li>
            <li>Utdanning</li>
            <li>Kompetanse og ferdigheter</li>
          </ul>
        </section>

        <section
          style={{
            background: "#f4f6fa",
            padding: "1.75rem",
            borderRadius: "8px",
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Vanlige spørsmål om CV</h2>

          <h3>Hvor lang bør en CV være?</h3>
          <p>
            En CV bør som hovedregel være én til to sider. For mange
            stillinger i Norge er én side tilstrekkelig.
          </p>

          <h3>Skal CV-en tilpasses hver stilling?</h3>
          <p>
            Ja. En tilpasset CV gjør det enklere for arbeidsgiver å se
            hvorfor du er relevant for akkurat denne stillingen.
          </p>

          <h3>Hva bør ikke stå i en CV?</h3>
          <p>
            Unngå uriktige opplysninger, irrelevante erfaringer og private
            detaljer som ikke er relevante for jobben.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Lag CV med CV-Proffen</h2>
          <p>
            CV-Proffen hjelper deg å lage en strukturert og korrekt CV basert
            kun på dine egne opplysninger. Vi legger ikke til erfaring,
            utdanning eller ferdigheter du ikke har.
          </p>
        </section>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "2rem",
            marginTop: "3rem",
          }}
        >
          <h3>Klar til å lage CV?</h3>
          <p style={{ marginBottom: "1.25rem" }}>
            Opprett en konto og lag en profesjonell CV og jobbsøknad på norsk.
          </p>
          <Link href="/register">
            <button className="cta">Lag CV nå</button>
          </Link>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Hvor lang bør en CV være?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "En CV bør normalt være på én til to sider. For mange stillinger i Norge er én side tilstrekkelig.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Skal CV-en tilpasses hver stilling?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Ja, det anbefales å tilpasse CV-en til hver stilling for å fremheve relevant erfaring.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Hva bør ikke stå i en CV?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "En CV bør ikke inneholde uriktige opplysninger, irrelevante erfaringer eller private detaljer.",
                  },
                },
              ],
            }),
          }}
        />
      </article>
    </main>
  );
}