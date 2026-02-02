// app/api/generate-application/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const experience = formData.get("experience") as string;
  const education = formData.get("education") as string;
  const job = formData.get("job") as string;

  if (!name || !experience || !job) {
    return NextResponse.json(
      { error: "Mangler påkrevde felt" },
      { status: 400 }
    );
  }

  const prompt = `
Du er en profesjonell norsk karriereveileder.

VIKTIGE REGLER:
- Bruk KUN informasjonen brukeren har gitt
- IKKE legg til erfaring, utdanning eller ferdigheter
- IKKE anta noe som helst
- Skriv på profesjonelt, naturlig norsk
- Lag en overbevisende, men ærlig jobbsøknad

BRUKERDATA:
Navn: ${name}
Stilling det søkes på: ${job}

Arbeidserfaring:
${experience}

Utdanning (kun hvis oppgitt):
${education || "Ikke oppgitt"}

Lag en ferdig jobbsøknad rettet direkte mot stillingen.
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

  return NextResponse.json({
    application: json.choices[0].message.content,
  });
}
