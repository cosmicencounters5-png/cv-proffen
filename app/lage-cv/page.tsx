import Link from "next/link";

export const metadata = {
  title: "Lage CV på norsk – Profesjonell CV på minutter | CV-Proffen",
  description:
    "Lær hvordan du lager en profesjonell CV på norsk. Struktur, innhold og eksempler – og et verktøy som hjelper deg å skrive korrekt og presist.",
  alternates: {
    canonical: "/lage-cv",
  },
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

        <h2>Hva skal en CV inneholde?</h2>

        <ul>
          <li>Navn</li>
          <li>Kort profil eller sammendrag</li>
          <li>Arbeidserfaring</li>
          <li>Utdanning</li>
        </ul>

        <h2>Vanlige feil</h2>

        <ul>
          <li>For mye irrelevant informasjon</li>
          <li>Uklare formuleringer</li>
          <li>Opplysninger som ikke stemmer</li>
        </ul>

        <h2>Lag CV med CV-Proffen</h2>

        <p>
          CV-Proffen hjelper deg å lage en profesjonell CV basert kun på
          opplysningene du selv legger inn. Ingen erfaring eller utdanning legges
          til automatisk.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/">
            <button className="cta">Lag CV nå</button>
          </Link>
        </div>

        {/* INTERN LENKING */}
        <hr style={{ margin: "3rem 0" }} />

        <h3>Relaterte sider</h3>
        <ul>
          <li>
            <Link href="/jobbsoknad">
              Hvordan skrive en god jobbsøknad
            </Link>
          </li>
          <li>
            <Link href="/cv-offentlig-sektor">
              CV til offentlig sektor
            </Link>
          </li>
        </ul>
      </article>
    </main>
  );
}