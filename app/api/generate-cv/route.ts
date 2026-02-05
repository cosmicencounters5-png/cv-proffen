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

    // 🚀 SYSTEM PROMPT = hemmelig sauce
    const systemPrompt = `
Du er en norsk senior recruiter med erfaring fra privat og offentlig sektor.

Du skriver CV slik norske arbeidsgivere forventer.

KRITISKE REGLER:

- Ingen AI-klisjeer.
- Ingen generiske fraser.
- Ingen tomme buzzwords.
- Ingen oppdiktet informasjon.
- Kun brukerens faktiske opplysninger.

SKRIV SOM:

- profesjonell karriererådgiver
- konkret
- tydelig
- norsk naturlig språk

ALDRI skriv:

"Motivert kandidat"
"Resultatorientert person"
"Hardtarbeidende"

med mindre det vises gjennom konkret handling.
`;

    // 🚀 USER PROMPT
    const userPrompt = `
Lag en norsk CV.

STRUKTUR:

${name}

PROFIL
Kort profesjonell oppsummering basert på erfaring og ønsket stilling.

KJERNEKOMPETANSE
Kort punktliste basert på erfaring.

ERFARING
Bryt ned erfaring til konkrete ansvar og praktiske bidrag.

UTDANNING
Kun hvis oppgitt.

DATA:

Stilling:
${job}

Arbeidserfaring:
${experience}

Utdanning:
${education}
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.15, // 🔥 ekstremt viktig (anti AI vibe)
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
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