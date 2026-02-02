// app/cv/page.tsx

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CvPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: entitlements } = await supabase
    .from("user_entitlements")
    .select("has_cv")
    .eq("user_id", user.id)
    .single();

  if (!entitlements?.has_cv) {
    redirect("/pricing");
  }

  async function generateCv(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const experience = formData.get("experience") as string;
    const education = formData.get("education") as string;
    const job = formData.get("job") as string;

    if (!name || !experience || !job) return;

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
    return json.choices[0].message.content as string;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 1rem",
        background: "#f8f9fb",
      }}
    >
      <form
        action={generateCv}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h1>CV-generator</h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Fyll inn informasjonen – vi lager en profesjonell CV.
        </p>

        <label>
          Navn
          <input name="name" required style={{ width: "100%", marginBottom: "1rem" }} />
        </label>

        <label>
          Stilling du søker
          <input name="job" required style={{ width: "100%", marginBottom: "1rem" }} />
        </label>

        <label>
          Arbeidserfaring
          <textarea
            name="experience"
            required
            rows={6}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </label>

        <label>
          Utdanning (valgfritt)
          <textarea
            name="education"
            rows={4}
            style={{ width: "100%", marginBottom: "1.5rem" }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Generer CV
        </button>
      </form>
    </main>
  );
}
