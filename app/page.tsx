export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Lag en profesjonell CV og søknad med AI</h1>
          <p>
            CV-Proffen hjelper deg å lage en moderne, norsk og
            rekrutteringsklar CV – basert kun på det du selv skriver inn.
          </p>

          <div className="hero-actions">
            <a href="/cv" className="btn-primary">
              Lag CV nå
            </a>
            <a href="#pricing" className="btn-secondary">
              Se priser
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container grid-3">
          <div className="card">
            <h3>🇳🇴 Norsk standard</h3>
            <p>
              Tilpasset norsk arbeidsmarked, språk og forventninger fra
              rekrutterere.
            </p>
          </div>

          <div className="card">
            <h3>🤖 AI – uten å lyve</h3>
            <p>
              OpenAI brukes kun til å forbedre språket, aldri til å finne på
              utdanning eller erfaring.
            </p>
          </div>

          <div className="card">
            <h3>📄 CV + søknad</h3>
            <p>
              Velg pakke med både CV og jobbsøknad – klar til innsending.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="container">
          <h2>Slik fungerer det</h2>

          <div className="grid-3">
            <div className="step">
              <span>1</span>
              <h4>Fyll inn info</h4>
              <p>Du legger inn ekte erfaring, utdanning og ferdigheter.</p>
            </div>

            <div className="step">
              <span>2</span>
              <h4>AI forbedrer</h4>
              <p>Vi gjør teksten profesjonell og strukturert.</p>
            </div>

            <div className="step">
              <span>3</span>
              <h4>Last ned PDF</h4>
              <p>CV og søknad klare som PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing">
        <div className="container grid-3">
          <div className="card price">
            <h3>CV</h3>
            <p className="price-number">299 kr</p>
            <ul>
              <li>✔ Profesjonell CV</li>
              <li>✔ Norsk språk</li>
              <li>✔ PDF-nedlasting</li>
            </ul>
            <a href="/cv" className="btn-primary">
              Velg
            </a>
          </div>

          <div className="card price highlight">
            <h3>CV + Søknad</h3>
            <p className="price-number">499 kr</p>
            <ul>
              <li>✔ CV + jobbsøknad</li>
              <li>✔ Tilpasset stilling</li>
              <li>✔ ATS-vennlig</li>
            </ul>
            <a href="/cv" className="btn-primary">
              Mest populær
            </a>
          </div>

          <div className="card price">
            <h3>Premium</h3>
            <p className="price-number">999 kr</p>
            <ul>
              <li>✔ CV + søknad</li>
              <li>✔ Ekstra forbedring</li>
              <li>✔ Prioritert AI</li>
            </ul>
            <a href="/cv" className="btn-primary">
              Velg
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}