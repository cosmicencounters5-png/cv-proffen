import Link from "next/link";

export const metadata = {
  title:
    "CV i offentlig sektor – Slik skriver du CV til stat og kommune | CV-Proffen",
  description:
    "Lær hvordan du skriver en profesjonell CV til offentlig sektor. Struktur, krav og tips for stat, kommune og fylke. Lag korrekt CV med CV-Proffen.",
  alternates: {
    canonical: "/cv-offentlig-sektor",
  },
};

export default function CvOffentligSektorPage() {
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
            CV i offentlig sektor – slik skriver du en korrekt CV
          </h1>
          <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Når du søker jobb i offentlig sektor stilles det ofte strengere krav
            til dokumentasjon, struktur og korrekt informasjon. Denne guiden
            viser deg hvordan du lager en profesjonell CV til stat, kommune og
            fylkeskommune.
          </p>
        </header>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Hva kjennetegner CV i offentlig sektor?</h2>
          <p>
            En CV til offentlig sektor skal være oversiktlig, presis og
            dokumenterbar. Arbeidsgiver må kunne vurdere kvalifikasjonene dine
            opp mot formelle krav i utlysningen.
          </p>
          <p>
            Det er viktig at all utdanning, arbeidserfaring og kompetanse er
            korrekt beskrevet og lett å kontrollere.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Hva bør en CV til offentlig sektor inneholde?</h2>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
            <li>Personopplysninger</li>
            <li>Arbeidserfaring med tydelige stillingstitler og datoer</li>
            <li>Utdanning med fullførte grader og årstall</li>
            <li>Relevant kurs og etterutdanning</li>
            <li>Kompetanse og ferdigheter knyttet til stillingen</li>
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
          <h2 style={{ marginTop: 0 }}>Vanlige feil i CV til offentlig sektor</h2>

          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
            <li>Manglende dokumentasjon på utdanning eller erfaring</li>
            <li>Uklare datoer eller stillingstitler</li>
            <li>Irrelevant informasjon som ikke er knyttet til utlysningen</li>
            <li>For generell eller ustrukturert CV</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>CV og jobbsøknad i offentlig sektor</h2>
          <p>
            I offentlig sektor vurderes CV og jobbsøknad samlet. Søknaden bør
            forklare hvordan du oppfyller kvalifikasjonskravene, mens CV-en gir
            en detaljert oversikt over erfaring og utdanning.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2>Lag CV til offentlig sektor med CV-Proffen</h2>
          <p>
            CV-Proffen hjelper deg å lage en strukturert og korrekt CV til
            offentlig sektor, basert utelukkende på dine egne opplysninger.
            Verktøyet legger ikke til erfaring eller utdanning du ikke har.
          </p>
        </section>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "2rem",
            marginTop: "3rem",
          }}
        >
          <h3>Klar til å lage CV til offentlig sektor?</h3>
          <p style={{ marginBottom: "1.25rem" }}>
            Opprett en konto og lag en profesjonell CV og jobbsøknad tilpasset
            kravene i offentlig sektor.
          </p>
          <Link href="/register">
            <button className="cta">Lag CV nå</button>
          </Link>
        </div>
      </article>
    </main>
  );
}