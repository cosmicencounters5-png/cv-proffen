import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No user" }, { status: 401 });
  }

  const expires = new Date();
  expires.setHours(expires.getHours() + 24);

  await supabase.from("user_entitlements").upsert({
    user_id: user.id,
    has_cv: true,
    has_application: false,
    expires_at: expires.toISOString(),
  });

  return NextResponse.json({ success: true });
}