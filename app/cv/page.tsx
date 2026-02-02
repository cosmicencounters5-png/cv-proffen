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

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 1rem",
        background: "#f8f9fb",
      }}
    >
      <div
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
        <p style={{ color: "#555" }}>
          Du har tilgang til CV-funksjonen.
        </p>

        {/* CV-generator kommer i neste steg */}
      </div>
    </main>
  );
}
