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
Skriv en profesjonell og fyldig jobbsøknad basert KUN på informasjonen brukeren har gitt.

VIKTIGE REGLER:
- Bruk KUN opplysningene brukeren har skrevet
- IKKE legg til nye erfaringer, ferdigheter eller egenskaper
- Du kan utdype og forklare det brukeren allerede har skrevet
- IKKE anta motivasjon eller personlighet som ikke er nevnt
- Skriv sammenhengende, naturlig norsk
- Tonen skal være saklig, trygg og profesjonell

STRUKTUR:
1. Innledning – hvorfor søknaden sendes
2. Relevant erfaring (utfyllende, men faktabasert)
3. Eventuell utdanning (kun hvis oppgitt)
4. Avslutning – kort og profesjonell

RETNING:
- Bruk hele avsnitt
- Forklar sammenhenger
- Ikke vær unødvendig kortfattet

IKKE INKLUDER:
- Kontaktinformasjon
- Dato / sted
- Overskrift
- Signatur
- Referanser

BRUKERENS OPPLYSNINGER:

Stilling det søkes på:
${job}

Arbeidserfaring:
${experience}

Utdanning:
${education}

LEVERANSEN:
Returner kun ferdig søknadstekst. Ingen forklaringer.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.35,
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