import Link from "next/link";

export const metadata = {
  title: "Lage CV på norsk – Profesjonell CV på minutter | CV-Proffen",
  description:
    "Lær hvordan du lager en profesjonell CV på norsk. Struktur, innhold og eksempler – og et verktøy som hjelper deg å skrive korrekt og presist.",
};

export default function LageCvPage() {
  return (
    <main style={{ padding: "3rem 1rem" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1>Lage CV på norsk</h1>

        <p>
          En god CV skal være oversiktlig, presis og korrekt. Den skal gi
          arbeidsgiver et tydelig bilde av din erfaring og bakgrunn – uten
          overdrivelser eller unødvendig informasjon.
        </p>

        <p>
          På denne siden forklarer vi hvordan du lager en profesjonell CV på
          norsk, hva den bør inneholde, og hvordan du kan strukturere innholdet
          slik at det er lett å lese og forstå.
        </p>

        <h2>Hva skal en CV inneholde?</h2>

        <p>
          En CV bør inneholde de mest relevante opplysningene om din bakgrunn.
          For de fleste stillinger betyr dette:
        </p>

        <ul>
          <li>Navn</li>
          <li>Kort profil eller sammendrag</li>
          <li>Arbeidserfaring</li>
          <li>Utdanning</li>
        </ul>

        <p>
          Det er viktig at informasjonen er korrekt og etterprøvbar. Unngå å
          legge til erfaring eller ferdigheter du ikke kan dokumentere.
        </p>

        <h2>Hvordan strukturere en CV</h2>

        <p>
          En ryddig struktur gjør CV-en lettere å lese. Bruk klare overskrifter
          og skriv i hele setninger. Arbeidserfaring bør presenteres i
          kronologisk rekkefølge, med de mest relevante erfaringene først.
        </p>

        <p>
          Profilteksten bør være kort og saklig. Den skal oppsummere erfaringen
          din, ikke fungere som en søknad.
        </p>

        <h2>CV til offentlig og privat sektor</h2>

        <p>
          I offentlig sektor stilles det ofte strengere krav til dokumentasjon
          og presisjon. Da er det ekstra viktig at CV-en kun inneholder
          faktiske opplysninger og er strukturert på en ryddig måte.
        </p>

        <p>
          I privat sektor er kravene ofte noe mer fleksible, men også her er en
          tydelig og korrekt CV en fordel.
        </p>

        <h2>Vanlige feil når man lager CV</h2>

        <ul>
          <li>For mye irrelevant informasjon</li>
          <li>Uklare eller lange beskrivelser</li>
          <li>Ustrukturert oppsett</li>
          <li>Opplysninger som ikke stemmer</li>
        </ul>

        <p>
          En god CV er nøktern og presis. Den skal gjøre det enkelt for
          arbeidsgiver å vurdere om du er aktuell for stillingen.
        </p>

        <h2>Lag CV med hjelp av CV-Proffen</h2>

        <p>
          CV-Proffen hjelper deg å lage en profesjonell CV basert kun på
          opplysningene du selv legger inn. Verktøyet strukturerer og
          språkvasker teksten, uten å legge til nye erfaringer eller
          antagelser.
        </p>

        <p>
          Resultatet er en ryddig CV som er egnet for både privat og offentlig
          sektor.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/">
            <button className="cta">Lag CV nå</button>
          </Link>
        </div>
      </article>
    </main>
  );
}