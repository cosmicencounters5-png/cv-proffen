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
Strukturer og språkvask teksten til en profesjonell CV.

ABSOLUTTE REGLER (må følges):
- Bruk KUN informasjonen brukeren har gitt
- IKKE legg til erfaring, utdanning, ferdigheter eller egenskaper
- IKKE anta noe som ikke er eksplisitt skrevet
- IKKE bruk pynt, klisjeer eller tomme fraser
- Hvis informasjon mangler, utelat seksjonen helt
- Skriv nøkternt, profesjonelt norsk
- Ikke bruk punktlister med mindre teksten naturlig tilsier det

CV-EN SKAL INNEHOLDE:
1. Navn (øverst)
2. Kort profil (2–3 setninger, basert på erfaring og ønsket stilling)
3. Arbeidserfaring (strukturert og ryddig)
4. Utdanning (kun hvis oppgitt)

IKKE INKLUDER:
- Stillingstittel som egen linje
- Personlige egenskaper som ikke er nevnt
- Referanser
- Kontaktinformasjon

BRUKERENS OPPLYSNINGER:

Navn:
${name}

Stilling det søkes på (kun som kontekst, ikke som overskrift):
${job}

Arbeidserfaring:
${experience}

Utdanning:
${education}

LEVERANSEN:
Returner kun ferdig CV-tekst. Ingen forklaringer. Ingen overskrifter utenfor CV-en.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const json = await res.json();
    const cv = json.choices?.[0]?.message?.content;

    if (!cv) {
      return NextResponse.json(
        { error: "Kunne ikke generere CV" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cv });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Serverfeil" },
      { status: 500 }
    );
  }
}