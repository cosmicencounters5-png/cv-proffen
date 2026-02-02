// app/cv/page.tsx

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CvClient from "./cv-client";

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

  return <CvClient />;
}
