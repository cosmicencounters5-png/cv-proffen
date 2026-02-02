// app/pricing/page.tsx

"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

export default function PricingPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user);
    });
  }, [supabase]);

  return (
    <main style={{ padding: "4rem 1rem", background: "#f8f9fb" }}>
      <h1>Velg pakke</h1>

      {loggedIn && (
        <p style={{ marginBottom: "1rem", color: "#555" }}>
          Du er innlogget. Kjøp ny tilgang eller forny eksisterende.
        </p>
      )}

      {/* pakkene dine her – ingen redirects */}
    </main>
  );
}
