import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <h1>Klar på minutter.</h1>

        <p>
          Lag en målrettet CV og søknad basert kun på dine egne opplysninger.
          Strukturert, presist og klart til bruk.
        </p>

        <Link href="/cv">
          <button className="cta">Gå til CV</button>
        </Link>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card highlight">
          <h3>Kun dine opplysninger</h3>
          <p>
            CV og søknad bygges utelukkende på det du selv skriver inn.
            Ingen antagelser. Ingen tillegg.
          </p>
        </div>

        <div className="feature-card">
          <h3>Tilpasset stillingen</h3>
          <p>
            Innholdet struktureres og formuleres direkte mot jobben du søker,
            med riktig språk og prioritering.
          </p>
        </div>

        <div className="feature-card">
          <h3>PDF klar til bruk</h3>
          <p>
            Last ned ferdig dokument og send det direkte til arbeidsgiver.
            Ingen ekstra redigering nødvendig.
          </p>
        </div>
      </section>
    </main>
  );
}