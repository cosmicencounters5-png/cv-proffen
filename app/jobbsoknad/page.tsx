import Link from "next/link";

export const metadata = {
  title: "Jobbsøknad – Slik skriver du en profesjonell jobbsøknad | CV-Proffen",
  description:
    "Lær hvordan du skriver en profesjonell jobbsøknad på norsk. Struktur, innhold og tips for privat og offentlig sektor. Lag jobbsøknad med CV-Proffen.",
  alternates: {
    canonical: "/jobbsoknad",
  },
};

export default function JobbsoknadPage() {
  return (
    <main style={{ padding: "4rem 1rem", background: "#f8f9fb" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1>Jobbsøknad – slik skriver du en profesjonell søknad</h1>

        <p>
          En god jobbsøknad forklarer hvorfor du søker stillingen, hva du kan
          bidra med, og hvordan din erfaring passer til jobben. Søknaden
          utfyller CV-en og gir arbeidsgiver et helhetlig bilde av deg som
          kandidat.
        </p>

        <h2>Hva er en jobbsøknad?</h2>
        <p>
          En jobbsøknad er et formelt brev der du presenterer deg selv og
          begrunner hvorfor du er kvalifisert for stillingen. I Norge
          forventes det som regel en strukturert og saklig søknad, skrevet
          på korrekt norsk.
        </p>

        <h2>Hvordan skrive en god jobbsøknad</h2>
        <p>
          Når du skal skrive jobbsøknad, bør du være tydelig, konkret og
          relevant. En profesjonell jobbsøknad inneholder vanligvis:
        </p>

        <ul>
          <li>Innledning med henvisning til stillingen</li>
          <li>Kort presentasjon av deg selv</li>
          <li>Beskrivelse av relevant erfaring og kompetanse</li>
          <li>Motivasjon for å søke stillingen</li>
          <li>Avslutning og ønske om intervju</li>
        </ul>

        <h2>Tilpass søknaden til stillingen</h2>
        <p>
          En jobbsøknad bør alltid tilpasses stillingen du søker. Les
          stillingsannonsen nøye, og bruk eksempler fra egen erfaring som
          viser at du oppfyller kravene arbeidsgiver stiller.
        </p>

        <h2>Jobbsøknad i offentlig og privat sektor</h2>
        <p>
          I offentlig sektor legges det ofte vekt på formelle kvalifikasjoner
          og dokumentasjon, mens privat sektor i større grad fokuserer på
          erfaring, resultater og personlige egenskaper. Uansett sektor bør
          søknaden være strukturert, korrekt og ærlig.
        </p>

        <h2>Lag jobbsøknad med CV-Proffen</h2>
        <p>
          Med CV-Proffen kan du lage en profesjonell jobbsøknad basert
          utelukkende på dine egne opplysninger. Verktøyet hjelper deg
          å strukturere teksten riktig, uten å legge til erfaring eller
          kompetanse du ikke har.
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
          <h3>Klar til å skrive jobbsøknad?</h3>
          <p>
            Opprett en konto og lag en profesjonell jobbsøknad på norsk,
            tilpasset stillingen du søker.
          </p>
          <Link href="/register">
            <button className="cta">Lag jobbsøknad nå</button>
          </Link>
        </div>
      </article>
    </main>
  );
}