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
Du er norsk karriereveileder med erfaring fra rekruttering.

MÅL:
Skriv en profesjonell norsk CV som faktisk ville blitt godkjent av en recruiter.

REGLER:
- Bruk KUN brukerens informasjon
- Ikke legg til fakta
- Ikke skriv generiske AI-frase
- Unngå tomme ord som "motivert", "dedikert" uten konkret innhold
- Bruk konkrete beskrivelser av oppgaver

STRUKTUR:

NAVN

PROFIL
Kort profesjonell oppsummering (3-4 setninger).
Skal være konkret og basert på erfaring.

NØKKELKOMPETANSE
Punktliste basert på faktisk erfaring.

ARBEIDSERFARING
STILLING – FIRMA
Periode
- Hva ble gjort
- Hvordan jobbet personen
- Konkret kontekst

UTDANNING
Kun hvis oppgitt.

BRUKERDATA:

Navn:
${name}

Stilling (kontekst):
${job}

Erfaring:
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