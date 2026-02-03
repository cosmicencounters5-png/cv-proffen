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
    <main style={{ padding: "4rem 1rem", background: "#f8f9fb" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1>Lage CV – slik lager du en profesjonell CV på norsk</h1>

        <p>
          En god CV er strukturert, presis og tilpasset stillingen du søker.
          Enten du søker jobb i privat eller offentlig sektor, er det viktig
          at CV-en gir et korrekt og profesjonelt bilde av deg og din erfaring.
        </p>

        <h2>Hva er en CV?</h2>
        <p>
          En CV (curriculum vitae) er en oversikt over arbeidserfaring,
          utdanning, kompetanse og relevante ferdigheter. Målet med CV-en
          er å vise hvorfor du er kvalifisert for stillingen du søker.
        </p>

        <h2>Hvordan lage en god CV</h2>
        <p>
          Når du skal lage CV, bør du fokusere på struktur, relevans og
          tydelig språk. En profesjonell CV inneholder vanligvis:
        </p>

        <ul>
          <li>Personopplysninger</li>
          <li>Kort profil eller sammendrag</li>
          <li>Arbeidserfaring</li>
          <li>Utdanning</li>
          <li>Kompetanse og ferdigheter</li>
        </ul>

        <h2>Vanlige spørsmål om å lage CV</h2>

        <h3>Hvor lang bør en CV være?</h3>
        <p>
          En CV bør normalt være på én til to sider. For de fleste stillinger
          i Norge er én side tilstrekkelig, spesielt tidlig i karrieren.
        </p>

        <h3>Skal man tilpasse CV-en til hver stilling?</h3>
        <p>
          Ja. Det anbefales å tilpasse CV-en til hver stilling du søker,
          slik at relevant erfaring og kompetanse kommer tydelig frem.
        </p>

        <h3>Hva bør ikke stå i en CV?</h3>
        <p>
          En CV bør ikke inneholde uriktige opplysninger, irrelevante
          erfaringer eller private detaljer som ikke har betydning
          for stillingen.
        </p>

        <h3>Er det forskjell på CV i privat og offentlig sektor?</h3>
        <p>
          Ja. Offentlig sektor legger ofte større vekt på formell
          utdanning og dokumentasjon, mens privat sektor i større grad
          fokuserer på erfaring og resultater.
        </p>

        <h2>Lag CV med CV-Proffen</h2>
        <p>
          CV-Proffen hjelper deg å lage en profesjonell CV basert
          utelukkende på dine egne opplysninger. Verktøyet legger ikke
          til utdanning, erfaring eller ferdigheter du ikke har.
        </p>

        <div
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h3>Klar til å lage CV?</h3>
          <p>
            Opprett en konto og lag en profesjonell CV og jobbsøknad
            på norsk.
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
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Hvor lang bør en CV være?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "En CV bør normalt være på én til to sider. For de fleste stillinger i Norge er én side tilstrekkelig."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Skal man tilpasse CV-en til hver stilling?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Ja, det anbefales å tilpasse CV-en til hver stilling slik at relevant erfaring og kompetanse kommer tydelig frem."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hva bør ikke stå i en CV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "En CV bør ikke inneholde uriktige opplysninger, irrelevante erfaringer eller private detaljer uten betydning for stillingen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Er det forskjell på CV i privat og offentlig sektor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Ja. Offentlig sektor vektlegger ofte formell utdanning og dokumentasjon, mens privat sektor fokuserer mer på erfaring og resultater."
                  }
                }
              ]
            })
          }}
        />
      </article>
    </main>
  );
}