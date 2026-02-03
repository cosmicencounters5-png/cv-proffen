import Link from "next/link";

export const metadata = {
  title: "Jobbsøknad på norsk – Slik skriver du en god søknad | CV-Proffen",
  description:
    "Lær hvordan du skriver en profesjonell jobbsøknad på norsk. Struktur, innhold og vanlige feil.",
};

export default function JobbsoknadPage() {
  return (
    <main style={{ padding: "3rem 1rem" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1>Jobbsøknad på norsk</h1>

        <p>
          En jobbsøknad utdyper og forklarer informasjonen i CV-en. Den skal være
          presis, relevant og basert på faktiske opplysninger.
        </p>

        <h2>Hva bør en søknad inneholde?</h2>

        <ul>
          <li>Hvorfor du søker stillingen</li>
          <li>Relevant erfaring</li>
          <li>Kort avslutning</li>
        </ul>

        <h2>Vanlige feil</h2>

        <ul>
          <li>Generiske formuleringer</li>
          <li>Gjentakelse av CV</li>
          <li>Påstander uten grunnlag</li>
        </ul>

        <h2>Skriv søknad med CV-Proffen</h2>

        <p>
          CV-Proffen hjelper deg å formulere en strukturert jobbsøknad basert kun
          på informasjonen du selv legger inn.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/">
            <button className="cta">Skriv søknad nå</button>
          </Link>
        </div>

        {/* INTERN LENKING */}
        <hr style={{ margin: "3rem 0" }} />

        <h3>Relaterte sider</h3>
        <ul>
          <li>
            <Link href="/lage-cv">Hvordan lage en profesjonell CV</Link>
          </li>
          <li>
            <Link href="/cv-offentlig-sektor">
              CV og søknad til offentlig sektor
            </Link>
          </li>
        </ul>
      </article>
    </main>
  );
}