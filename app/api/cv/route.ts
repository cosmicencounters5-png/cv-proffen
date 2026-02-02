import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Ikke innlogget" },
      { status: 401 }
    );
  }

  const data = await req.json();

  const prompt = `
Lag en profesjonell norsk CV basert kun på denne informasjonen.
IKKE finn på utdanning eller erfaring.

Data:
${JSON.stringify(data, null, 2)}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    cv: completion.choices[0].message.content,
  });
}