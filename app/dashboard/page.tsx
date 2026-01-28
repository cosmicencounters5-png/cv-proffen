"use client"

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <button
        onClick={() => router.push("/cv")}
        className="mt-4 bg-black text-white px-4 py-2"
      >
        Lag CV
      </button>

      <button
        onClick={logout}
        className="mt-4 ml-4 border px-4 py-2"
      >
        Logg ut
      </button>
    </div>
  )
}