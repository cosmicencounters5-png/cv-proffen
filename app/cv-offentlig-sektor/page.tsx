import Link from "next/link";

export const metadata = {
  title:
    "CV til offentlig sektor – Slik skriver du en korrekt CV | CV-Proffen",
  description:
    "Lær hvordan du skriver en korrekt og ryddig CV til offentlig sektor. Krav, struktur og vanlige feil – og et verktøy som hjelper deg å skrive presist.",
};

export default function CvOffentligSektorPage() {
  return (
    <main style={{ padding: "3rem 1rem" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1>CV til offentlig sektor</h1>

        <p>
          Når du søker jobb i offentlig sektor, stilles det ofte strengere krav
          til dokumentasjon, presisjon og korrekthet enn i privat sektor. En CV
          til offentlig sektor skal være ryddig, nøktern og basert på faktiske
          opplysninger.
        </p>

        <p>
          Denne siden forklarer hvordan du bør strukturere en CV til statlige,
          fylkeskommunale og kommunale stillinger, og hvilke hensyn du bør ta
          når du skriver CV til offentlig sektor.
        </p>

        <h2>Hva kjennetegner en CV til offentlig jobb?</h2>

        <p>
          I offentlig sektor er det viktig at CV-en gir et korrekt og
          etterprøvbart bilde av din bakgrunn. Informasjonen må være tydelig og
          relevant for stillingen du søker.
        </p>

        <ul>
          <li>Tydelig og korrekt arbeidserfaring</li>
          <li>Utdanning som er relevant for stillingen</li>
          <li>Klare beskrivelser av ansvar og oppgaver</li>
          <li>Oversiktlig struktur</li>
        </ul>

        <p>
          Opplysninger som ikke er dokumenterbare eller relevante bør utelates.
        </p>

        <h2>Struktur og innhold</h2>

        <p>
          En CV til offentlig sektor bør være logisk bygget opp, med klare
          overskrifter og en ryddig rekkefølge. Arbeidserfaring presenteres
          vanligvis i kronologisk rekkefølge, med fokus på oppgaver og ansvar.
        </p>

        <p>
          Profilteksten bør være kort og nøktern. Den skal gi en oversikt over
          erfaringen din, ikke fungere som en søknad.
        </p>

        <h2>Dokumentasjon og korrekthet</h2>

        <p>
          Offentlige arbeidsgivere legger ofte vekt på at opplysningene i CV-en
          kan dokumenteres. Det er derfor viktig at CV-en kun inneholder
          informasjon som er korrekt og etterprøvbar.
        </p>

        <p>
          Unngå generelle formuleringer og påstander som ikke støttes av konkret
          erfaring.
        </p>

        <h2>Vanlige feil i CV til offentlig sektor</h2>

        <ul>
          <li>Uklare beskrivelser av arbeidsoppgaver</li>
          <li>For mye irrelevant informasjon</li>
          <li>Manglende struktur</li>
          <li>Opplysninger som ikke stemmer</li>
        </ul>

        <p>
          En ryddig og korrekt CV gir arbeidsgiver et godt grunnlag for å vurdere
          søknaden din.
        </p>

        <h2>Lag CV til offentlig sektor med CV-Proffen</h2>

        <p>
          CV-Proffen hjelper deg å lage en strukturert og korrekt CV basert kun
          på opplysningene du selv legger inn. Verktøyet språkvasker og
          strukturerer teksten, uten å legge til nye erfaringer eller
          antagelser.
        </p>

        <p>
          Resultatet er en profesjonell CV som er egnet for bruk i offentlig
          sektor.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/">
            <button className="cta">Lag CV til offentlig jobb</button>
          </Link>
        </div>
      </article>
    </main>
  );
}