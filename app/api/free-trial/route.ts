import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {

  const body = await req.json();
  const userId = body.user_id;

  if (!userId) {
    return NextResponse.json(
      { error: "Missing user_id" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await supabase.from("user_entitlements").upsert({
    user_id: userId,
    has_cv: true,
    has_application: false,
    expires_at: expiresAt.toISOString(),
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}