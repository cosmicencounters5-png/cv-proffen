export const metadata = {
  title: "Personvernerklæring | CV-Proffen",
  description:
    "Hvordan CV-Proffen behandler personopplysninger og ivaretar ditt personvern.",
};

export default function PersonvernPage() {
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
        <h1>Personvernerklæring</h1>

        <p>
          CV-Proffen tar personvern på alvor. Denne siden forklarer hvordan vi
          samler inn, bruker og beskytter dine personopplysninger når du bruker
          tjenesten.
        </p>

        <h2>Hvilke opplysninger samles inn</h2>
        <ul>
          <li>Navn og e-post ved registrering</li>
          <li>Opplysninger du selv legger inn for å generere CV</li>
          <li>Teknisk informasjon om bruk av tjenesten</li>
        </ul>

        <h2>Hva brukes opplysningene til</h2>
        <ul>
          <li>Opprette og administrere bruker konto</li>
          <li>Generere CV basert på dine egne opplysninger</li>
          <li>Forbedre tjenesten</li>
        </ul>

        <h2>AI-behandling</h2>
        <p>
          CV-generering skjer ved hjelp av kunstig intelligens. Tekst du oppgir
          kan sendes til eksterne AI-tjenester for behandling. Opplysningene
          brukes kun for å generere dokumentet du ber om.
        </p>

        <h2>Tredjepartstjenester</h2>
        <ul>
          <li>Supabase – brukerhåndtering og database</li>
          <li>Stripe – betaling</li>
          <li>OpenAI – generering av tekst</li>
          <li>Microsoft Clarity – anonymisert analyse av bruksmønster</li>
        </ul>

        <h2>Lagring av data</h2>
        <p>
          Vi lagrer kun opplysninger som er nødvendige for at tjenesten skal
          fungere. Du kan når som helst be om sletting av dine data.
        </p>

        <h2>Dine rettigheter</h2>
        <ul>
          <li>Innsyn i egne data</li>
          <li>Retting av feil</li>
          <li>Sletting av konto</li>
        </ul>

        <h2>Kontakt</h2>
        <p>
          Kontakt oss dersom du har spørsmål om personvern:
          <br />
          kontakt@cv-proffen.no
        </p>
      </article>
    </main>
  );
}