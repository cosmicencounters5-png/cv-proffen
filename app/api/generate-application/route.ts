import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const job = String(formData.get("job") || "").trim();
    const experience = String(formData.get("experience") || "").trim();
    const education = String(formData.get("education") || "").trim();

    if (!name || !job || !experience) {
      return NextResponse.json(
        { error: "Manglende påkrevde felt" },
        { status: 400 }
      );
    }

    const prompt = `
Du er en erfaren norsk karriereveileder.

OPPGAVE:
Skriv en profesjonell, ryddig jobbsøknad basert KUN på informasjonen brukeren har gitt.

ABSOLUTTE REGLER (må følges):
- Bruk KUN opplysningene brukeren har skrevet
- IKKE legg til erfaring, utdanning, ferdigheter eller personlige egenskaper
- IKKE anta motivasjon, interesse eller egenskaper som ikke er eksplisitt nevnt
- IKKE bruk klisjeer eller generiske formuleringer
- Hvis informasjon mangler, ikke skriv om det
- Skriv nøkternt, korrekt norsk
- Tonen skal være saklig, profesjonell og trygg

STRUKTUR:
1. Kort innledning – hvorfor søknaden sendes (uten smiger)
2. Relevant erfaring (basert på teksten brukeren har gitt)
3. Eventuell utdanning (kun hvis oppgitt)
4. Avslutning – kort og nøytral

IKKE INKLUDER:
- Kontaktinformasjon
- Dato eller sted
- Overskrift som “Søknad”
- Signatur
- Referanser
- Personlige egenskaper som ikke er eksplisitt nevnt

BRUKERENS OPPLYSNINGER:

Navn (kun som kontekst – ikke bruk i teksten):
${name}

Stilling det søkes på:
${job}

Arbeidserfaring:
${experience}

Utdanning:
${education}

LEVERANSEN:
Returner kun ferdig søknadstekst. Ingen forklaringer. Ingen punktlister.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.25,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const json = await res.json();
    const application = json.choices?.[0]?.message?.content;

    if (!application) {
      return NextResponse.json(
        { error: "Kunne ikke generere søknad" },
        { status: 500 }
      );
    }

    return NextResponse.json({ application });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Serverfeil" },
      { status: 500 }
    );
  }
}