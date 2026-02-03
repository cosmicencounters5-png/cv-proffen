import Link from "next/link";

export const metadata = {
  title: "Lage CV – Slik lager du en profesjonell CV på norsk | CV-Proffen",
  description:
    "Lær hvordan du lager en profesjonell CV på norsk. Struktur, innhold og tips for både privat og offentlig sektor. Lag CV enkelt med CV-Proffen.",
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
          En CV (curriculum vitae) er en oversikt over din arbeidserfaring,
          utdanning, kompetanse og relevante ferdigheter. Målet med CV-en er
          å vise hvorfor du er kvalifisert for stillingen du søker.
        </p>

        <h2>Hvordan lage en god CV</h2>
        <p>
          Når du skal lage CV, bør du fokusere på struktur, relevans og
          tydelig språk. En god CV inneholder vanligvis:
        </p>

        <ul>
          <li>Personopplysninger</li>
          <li>Kort profil eller sammendrag</li>
          <li>Arbeidserfaring (i omvendt kronologisk rekkefølge)</li>
          <li>Utdanning</li>
          <li>Kompetanse og ferdigheter</li>
        </ul>

        <h2>Tilpass CV-en til stillingen</h2>
        <p>
          Det er viktig å tilpasse CV-en til hver stilling du søker.
          Fremhev erfaring og kompetanse som er relevant for jobben,
          og bruk et nøkternt og profesjonelt språk.
        </p>

        <h2>CV i offentlig og privat sektor</h2>
        <p>
          I offentlig sektor stilles det ofte krav til dokumentasjon og
          tydelig struktur, mens privat sektor gjerne vektlegger
          resultater og erfaring. Uansett sektor bør CV-en være korrekt,
          oversiktlig og ærlig.
        </p>

        <h2>Lag CV med CV-Proffen</h2>
        <p>
          Med CV-Proffen kan du lage en profesjonell CV basert utelukkende
          på dine egne opplysninger. Verktøyet hjelper deg å strukturere
          innholdet riktig, uten å legge til erfaring eller utdanning
          du ikke har.
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
          <h3>Klar til å lage din egen CV?</h3>
          <p>
            Opprett en konto og kom i gang med å lage en profesjonell
            CV og jobbsøknad på norsk.
          </p>
          <Link href="/register">
            <button className="cta">Lag CV nå</button>
          </Link>
        </div>
      </article>
    </main>
  );
}