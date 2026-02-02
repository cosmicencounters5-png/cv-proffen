// app/api/generate-cv/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const experience = formData.get("experience") as string;
  const education = formData.get("education") as string;
  const job = formData.get("job") as string;

  const prompt = `
Du er en profesjonell norsk karriereveileder.

VIKTIGE REGLER:
- Bruk KUN informasjonen brukeren har gitt
- IKKE legg til utdanning, erfaring eller ferdigheter
- IKKE anta noe
- Skriv på profesjonelt norsk
- Lag en ryddig CV

BRUKERDATA:
Navn: ${name}
Stilling det søkes på: ${job}

Erfaring:
${experience}

Utdanning (kun hvis oppgitt):
${education || "Ikke oppgitt"}

Lag en ferdig CV-tekst.
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const json = await res.json();

  return NextResponse.json({
    cv: json.choices[0].message.content,
  });
}
