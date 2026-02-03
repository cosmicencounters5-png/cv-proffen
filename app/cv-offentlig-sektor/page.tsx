import Link from "next/link";

export const metadata = {
  title: "CV til offentlig sektor – Slik skriver du en korrekt CV | CV-Proffen",
  description:
    "Hvordan skrive en korrekt og ryddig CV til offentlig sektor. Krav, struktur og vanlige feil.",
  alternates: {
    canonical: "/cv-offentlig-sektor",
  },
};

export default function CvOffentligSektorPage() {
  return (
    <main style={{ padding: "3rem 1rem" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1>CV til offentlig sektor</h1>

        <p>
          Offentlige arbeidsgivere stiller ofte strengere krav til dokumentasjon
          og korrekthet. CV-en må være ryddig og etterprøvbar.
        </p>

        <h2>Hva vektlegges i offentlig sektor?</h2>

        <ul>
          <li>Korrekt arbeidserfaring</li>
          <li>Relevant utdanning</li>
          <li>Tydelige beskrivelser av ansvar</li>
        </ul>

        <h2>Vanlige feil</h2>

        <ul>
          <li>Uklare beskrivelser</li>
          <li>For mye irrelevant informasjon</li>
          <li>Opplysninger som ikke stemmer</li>
        </ul>

        <h2>Lag CV til offentlig jobb med CV-Proffen</h2>

        <p>
          CV-Proffen hjelper deg å lage en korrekt og strukturert CV basert kun
          på dine egne opplysninger.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/">
            <button className="cta">Lag CV til offentlig jobb</button>
          </Link>
        </div>

        {/* INTERN LENKING */}
        <hr style={{ margin: "3rem 0" }} />

        <h3>Relaterte sider</h3>
        <ul>
          <li>
            <Link href="/lage-cv">Lage CV på norsk</Link>
          </li>
          <li>
            <Link href="/jobbsoknad">Slik skriver du jobbsøknad</Link>
          </li>
        </ul>
      </article>
    </main>
  );
}