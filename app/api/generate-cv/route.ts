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
Strukturer og språkvask teksten til en profesjonell og fyldig CV.

VIKTIGE REGLER:
- Bruk KUN informasjonen brukeren har gitt
- IKKE legg til nye fakta, erfaringer, utdanninger eller ferdigheter
- Du kan utdype, presisere og omformulere eksisterende informasjon
- IKKE anta noe som ikke er eksplisitt skrevet
- Unngå klisjeer og tomme fraser
- Skriv profesjonelt, korrekt norsk
- Hvis informasjon mangler, utelat seksjonen helt

CV-EN SKAL INNEHOLDE:
1. Navn (øverst)
2. Profil (3–4 setninger, basert på erfaring og ønsket stilling)
3. Arbeidserfaring (tydelig strukturert i avsnitt)
4. Utdanning (kun hvis oppgitt)

RETNING:
- Bruk hele setninger
- Forklar ansvar og erfaring litt mer utfyllende
- Ikke gjør teksten kortere enn nødvendig

BRUKERENS OPPLYSNINGER:

Navn:
${name}

Stilling det søkes på (kun som kontekst):
${job}

Arbeidserfaring:
${experience}

Utdanning:
${education}

LEVERANSEN:
Returner kun ferdig CV-tekst. Ingen forklaringer.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
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