import Link from "next/link";

export const metadata = {
  title: "Jobbsøknad på norsk – Slik skriver du en god søknad | CV-Proffen",
  description:
    "Lær hvordan du skriver en profesjonell jobbsøknad på norsk. Struktur, innhold og vanlige feil – og et verktøy som hjelper deg å formulere søknaden presist.",
};

export default function JobbsoknadPage() {
  return (
    <main style={{ padding: "3rem 1rem" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1>Jobbsøknad på norsk</h1>

        <p>
          En jobbsøknad skal utdype og forklare informasjonen i CV-en. Den gir
          arbeidsgiver en bedre forståelse av hvordan erfaringen din er relevant
          for stillingen du søker.
        </p>

        <p>
          En god søknad er saklig, presis og strukturert. Den skal være lett å
          lese og basert på faktiske opplysninger, uten overdrivelser eller
          generelle formuleringer.
        </p>

        <h2>Hva skal en jobbsøknad inneholde?</h2>

        <p>
          Innholdet i en jobbsøknad bør være tydelig og relevant for stillingen.
          Vanligvis består en søknad av:
        </p>

        <ul>
          <li>Kort innledning om hvorfor du søker stillingen</li>
          <li>Beskrivelse av relevant arbeidserfaring</li>
          <li>Eventuell utdanning, dersom den er relevant</li>
          <li>En kort avslutning</li>
        </ul>

        <p>
          Søknaden bør ikke gjenta hele CV-en, men forklare og utdype de delene
          som er mest relevante.
        </p>

        <h2>Hvordan tilpasse søknaden til stillingen</h2>

        <p>
          En søknad bør alltid tilpasses den aktuelle stillingen. Les
          stillingsannonsen nøye og bruk formuleringer som viser hvordan din
          erfaring samsvarer med kravene som stilles.
        </p>

        <p>
          Unngå generelle beskrivelser. Konkret informasjon gir et bedre
          grunnlag for vurdering.
        </p>

        <h2>Søknad i offentlig og privat sektor</h2>

        <p>
          I offentlig sektor er det ofte krav om tydelig dokumentasjon av
          erfaring og utdanning. Søknaden bør derfor være ekstra presis og
          strukturert.
        </p>

        <p>
          I privat sektor kan tonen være noe friere, men også her er klarhet og
          relevans avgjørende.
        </p>

        <h2>Vanlige feil i jobbsøknader</h2>

        <ul>
          <li>For lange og lite konkrete tekster</li>
          <li>Generiske formuleringer</li>
          <li>Påstander uten grunnlag</li>
          <li>Gjentakelse av CV uten forklaring</li>
        </ul>

        <p>
          En god jobbsøknad er balansert og saklig. Den skal gi arbeidsgiver et
          realistisk bilde av din bakgrunn.
        </p>

        <h2>Skriv jobbsøknad med CV-Proffen</h2>

        <p>
          CV-Proffen hjelper deg å formulere en profesjonell jobbsøknad basert
          kun på informasjonen du selv legger inn. Verktøyet strukturerer og
          språkvasker teksten, uten å legge til nye opplysninger.
        </p>

        <p>
          Resultatet er en ryddig og troverdig søknad som kan brukes både i
          privat og offentlig sektor.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/">
            <button className="cta">Skriv jobbsøknad nå</button>
          </Link>
        </div>
      </article>
    </main>
  );
}