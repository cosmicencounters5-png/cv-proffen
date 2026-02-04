import Link from "next/link";

export const metadata = {
  title: "Lage CV på norsk – Profesjonell CV tilpasset jobben | CV-Proffen",
  description:
    "Lag en profesjonell CV på norsk, tilpasset stillingen du søker. CV-Proffen hjelper deg å skrive en strukturert og korrekt CV basert kun på dine egne opplysninger.",
  alternates: {
    canonical: "/lage-cv",
  },
};

export default function LageCvPage() {
  return (
    <main
      style={{
        padding: "4rem 1rem",
        background: "#f8f9fb",
      }}
    >
      <article
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "2.5rem",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          lineHeight: 1.7,
        }}
      >
        <h1>Lag profesjonell CV på norsk</h1>

        <p>
          Å lage en god CV er avgjørende når du søker jobb i Norge. En
          profesjonell CV skal være tydelig, strukturert og basert på faktiske
          opplysninger – ikke antagelser eller overdrivelser. Med CV-Proffen kan
          du lage en CV på norsk som er tilpasset stillingen du søker, enten det
          er i privat eller offentlig sektor.
        </p>

        <h2>Hva er en god CV?</h2>
        <p>
          En god CV gir arbeidsgiver et raskt og presist bilde av hvem du er, hva
          du kan, og hvorfor du er aktuell for jobben. I Norge forventes det at
          en CV er:
        </p>

        <ul>
          <li>Strukturert og oversiktlig</li>
          <li>Kortfattet, men informativ</li>
          <li>Skrevet på korrekt norsk</li>
          <li>Basert på reell erfaring og utdanning</li>
        </ul>

        <p>
          En CV skal ikke inneholde gjetninger, pyntede formuleringer eller
          ferdigheter du ikke faktisk har. Det kan svekke tilliten og føre til
          avslag.
        </p>

        <h2>Tilpass CV-en til stillingen du søker</h2>
        <p>
          En vanlig feil mange gjør er å bruke samme CV til alle jobber.
          Arbeidsgivere ser etter kandidater som har tilpasset CV-en til
          stillingen. Det betyr at erfaring, kompetanse og formuleringer bør
          vektlegges ulikt avhengig av jobben.
        </p>

        <p>
          Når du lager CV med CV-Proffen, struktureres innholdet direkte mot
          stillingen du søker. Du legger inn dine egne opplysninger, og teksten
          bygges profesjonelt rundt dette – uten å legge til noe som ikke
          stemmer.
        </p>

        <h2>CV basert kun på dine egne opplysninger</h2>
        <p>
          CV-Proffen er laget for deg som vil ha en korrekt og troverdig CV. All
          tekst som genereres bygger utelukkende på informasjonen du selv legger
          inn, som:
        </p>

        <ul>
          <li>Arbeidserfaring</li>
          <li>Utdanning</li>
          <li>Stillingen du søker</li>
          <li>Relevant kompetanse</li>
        </ul>

        <p>
          Det legges ikke til utdanning, erfaring eller ferdigheter automatisk.
          Resultatet er en CV som er ærlig, profesjonell og trygg å sende til
          arbeidsgiver.
        </p>

        <h2>Norsk CV for privat og offentlig sektor</h2>
        <p>
          Kravene til CV kan variere mellom privat og offentlig sektor. I
          offentlig sektor stilles det ofte strengere krav til dokumentasjon,
          presise beskrivelser og struktur. CV-Proffen er tilpasset norsk
          arbeidsliv og kan brukes både til private og offentlige stillinger.
        </p>

        <h2>Ferdig CV i PDF-format</h2>
        <p>
          Når CV-en er generert, kan du laste den ned som ferdig PDF. Dokumentet
          er klart til bruk og kan sendes direkte til arbeidsgiver eller lastes
          opp i søknadsportaler.
        </p>

        <h2>Hvorfor velge CV-Proffen?</h2>
        <ul>
          <li>Lag profesjonell CV på norsk</li>
          <li>Tilpasset stillingen du søker</li>
          <li>Ingen antagelser eller oppdiktet innhold</li>
          <li>Basert kun på dine egne opplysninger</li>
          <li>Ferdig PDF – klar til bruk</li>
        </ul>

        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            borderRadius: "8px",
            background: "#111",
            color: "white",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>
            Klar til å lage CV?
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Kom i gang på få minutter med CV-Proffen.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "white",
              color: "#111",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Lag CV nå
          </Link>
        </div>
      </article>
    </main>
  );
}