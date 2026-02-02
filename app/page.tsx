import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <h1>Klar på minutter.</h1>
        <p>
          Lag en målrettet CV og søknad basert <strong>kun</strong> på dine egne
          opplysninger. Ingen gjetting. Ingen tull.
        </p>

        <Link href="/cv">
          <button className="cta">Gå til CV</button>
        </Link>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card highlight">
          <h3>Ingen hallusinasjoner</h3>
          <p>
            Vi bruker kun informasjonen du selv legger inn. Ingen oppdiktet
            erfaring. Ingen falsk utdanning.
          </p>
        </div>

        <div className="feature-card">
          <h3>Tilpasset stillingen</h3>
          <p>
            CV og søknad skrives direkte mot jobben du søker – med riktig språk
            og prioritering.
          </p>
        </div>

        <div className="feature-card">
          <h3>PDF klar til bruk</h3>
          <p>
            Last ned dokumentet og send det rett til arbeidsgiver. Ingen ekstra
            redigering nødvendig.
          </p>
        </div>
      </section>
    </main>
  );
}