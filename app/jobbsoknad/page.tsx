import Link from "next/link";

export const metadata = {
  title: "Jobbsøknad – Slik skriver du en profesjonell jobbsøknad | CV-Proffen",
  description:
    "Lær hvordan du skriver en profesjonell jobbsøknad på norsk. Struktur, innhold og vanlige spørsmål. Lag jobbsøknad korrekt med CV-Proffen.",
  alternates: {
    canonical: "/jobbsoknad",
  },
};

export default function JobbsoknadPage() {
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
            Jobbsøknad – slik skriver du en profesjonell søknad
          </h1>
          <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.7 }}>
            En god jobbsøknad forklarer hvorfor du søker stillingen, hva du kan
            bidra med, og hvordan din erfaring passer til jobben. Her får du en
            praktisk og norsk tilpasset veiledning.
          </p>
        </header>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Hva er en jobbsøknad?</h2>
          <p>
            En jobbsøknad er et formelt brev der du presenterer deg selv og
            forklarer hvorfor du er kvalifisert for stillingen. Søknaden
            utfyller CV-en og gir arbeidsgiver kontekst og motivasjon.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Hvordan skrive en god jobbsøknad</h2>
          <p>En profesjonell jobbsøknad inneholder vanligvis:</p>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
            <li>Innledning med henvisning til stillingen</li>
            <li>Kort presentasjon av deg selv</li>
            <li>Relevant erfaring og kompetanse</li>
            <li>Motivasjon for å søke jobben</li>
            <li>Avslutning og ønske om intervju</li>
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
          <h2 style={{ marginTop: 0 }}>Vanlige spørsmål om jobbsøknad</h2>

          <h3>Hvor lang bør en jobbsøknad være?</h3>
          <p>
            En jobbsøknad bør normalt være på én side. Den skal være presis og
            fokusert på det som er relevant for stillingen.
          </p>

          <h3>Skal man skrive ny søknad til hver jobb?</h3>
          <p>
            Ja. En tilpasset søknad viser at du har satt deg inn i stillingen og
            øker sjansen for intervju betydelig.
          </p>

          <h3>Hva bør man unngå i en jobbsøknad?</h3>
          <p>
            Unngå generelle formuleringer, irrelevante detaljer og påstander som
            ikke kan underbygges med erfaring.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Jobbsøknad i privat og offentlig sektor</h2>
          <p>
            I offentlig sektor legges det ofte vekt på formelle kvalifikasjoner
            og dokumentasjon, mens privat sektor i større grad fokuserer på
            erfaring, resultater og personlig egnethet. Uansett sektor bør
            søknaden være strukturert, korrekt og ærlig.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Skriv jobbsøknad med CV-Proffen</h2>
          <p>
            CV-Proffen hjelper deg å skrive en profesjonell jobbsøknad basert
            kun på dine egne opplysninger. Verktøyet legger ikke til erfaring
            eller kompetanse du ikke har.
          </p>
        </section>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "2rem",
            marginTop: "3rem",
          }}
        >
          <h3>Klar til å skrive jobbsøknad?</h3>
          <p style={{ marginBottom: "1.25rem" }}>
            Opprett en konto og lag en profesjonell jobbsøknad tilpasset
            stillingen du søker.
          </p>
          <Link href="/register">
            <button className="cta">Lag jobbsøknad nå</button>
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
                  name: "Hvor lang bør en jobbsøknad være?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "En jobbsøknad bør normalt være på én side og være tydelig og relevant for stillingen.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Skal man skrive ny søknad til hver jobb?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Ja, det anbefales å tilpasse søknaden til hver stilling for å øke sjansen for intervju.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Hva bør man unngå i en jobbsøknad?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Man bør unngå generelle formuleringer, irrelevante detaljer og udokumenterte påstander.",
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