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
Du er norsk karriereveileder og erfaren recruiter.

MÅL:
Lag en profesjonell norsk CV som føles skrevet av en menneskelig rådgiver.

KRITISKE REGLER:

- Bruk KUN informasjon brukeren har gitt.
- IKKE legg til ferdigheter, erfaringer eller fakta.
- IKKE skriv generiske AI-setninger.
- Unngå tomme ord som:
  "motivert", "hardtarbeidende", "resultatorientert"
  uten konkret kontekst.

STIL:

- Profesjonell norsk tone.
- Konkret språk.
- Recruiter-perspektiv.
- Ingen fluff.

STRUKTUR:

NAVN

PROFIL
Kort, konkret oppsummering basert på erfaring og ønsket stilling.
Fokus på hva kandidaten faktisk gjør.

KJERNEKOMPETANSE
Punktliste basert kun på oppgitt erfaring.

ERFARING

STILLING – ARBEIDSGIVER (hvis oppgitt)
Periode (hvis oppgitt)

Ansvar:
- konkrete arbeidsoppgaver

Resultat / verdi:
- hvordan arbeidet bidro i praksis
- konkret kontekst

UTDANNING
Kun hvis oppgitt.

BRUKERDATA:

Navn:
${name}

Stilling:
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