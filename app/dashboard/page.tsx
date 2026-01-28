"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // ❌ Ikke innlogget → send til login
        router.push("/login");
        return;
      }

      // ✅ Innlogget
      setEmail(user.email ?? null);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Laster...</p>;
  }

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Innlogget som: {email}</p>

      <button
        className="mt-6 bg-black text-white px-4 py-2"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Logg ut
      </button>
    </main>
  );
}