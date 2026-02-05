import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const job = String(formData.get("job") || "").trim();
    const experience = String(formData.get("experience") || "").trim();
    const education = String(formData.get("education") || "").trim();

    // NEW — style controls (optional hvis ikke sendt enda)
    const level = String(formData.get("level") || "erfaren");
    const tone = String(formData.get("tone") || "direkte");
    const sector = String(formData.get("sector") || "privat");

    if (!name || !job || !experience) {
      return NextResponse.json(
        { error: "Manglende påkrevde felt" },
        { status: 400 }
      );
    }

    const prompt = `
Du er en erfaren norsk rekrutterer med lang erfaring fra ansettelsesprosesser.

Målet er å lage en CV som føles skrevet av en profesjonell kandidat — ikke av AI.

ABSOLUTTE REGLER:

- Ingen generiske formuleringer
- Ingen klisjeer
- Ingen tomme fraser
- Ingen selvskryt uten konkret innhold
- Ingen AI-typiske formuleringer
- Skriv kort, konkret og profesjonelt
- Bruk naturlig norsk arbeidsspråk

STIL:

nivå: ${level}
tone: ${tone}
sektor: ${sector}

STRUKTUR:

NAVN
${name}

PROFIL
- Maks 3 korte linjer
- Basert kun på erfaring

KOMPETANSE
- Punktliste
- Kun konkrete ferdigheter som faktisk fremgår

ARBEIDSERFARING
- Strukturert
- Fokus på ansvar og hva kandidaten faktisk gjorde
- Ingen oppdiktede resultater

UTDANNING
- Kun hvis oppgitt

VIKTIG:
Bruk KUN informasjonen under.
Ikke legg til noe som ikke står her.

DATA:

Stilling det søkes på:
${job}

Arbeidserfaring:
${experience}

Utdanning:
${education}

Returner kun ferdig CV.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2, // lavere = mindre AI-vibes
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