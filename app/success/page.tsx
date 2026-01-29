"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const finalizePurchase = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const userId = session.user.id

      // 3 dager tilgang
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 3)

      const { error } = await supabase
        .from("purchases")
        .upsert({
          user_id: userId,
          package: "cv_only", // evt endres senere
          expires_at: expiresAt.toISOString(),
        })

      if (error) {
        console.error("❌ PURCHASE SAVE ERROR:", error)
        setError("Noe gikk galt ved aktivering av pakken.")
        setLoading(false)
        return
      }

      setLoading(false)
    }

    finalizePurchase()
  }, [router])

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-semibold">Aktiverer kjøpet ditt…</h1>
        <p className="mt-2 text-gray-600">Dette tar bare et øyeblikk</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Noe gikk galt
        </h1>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-16 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Betaling fullført!
      </h1>

      <p className="text-gray-700">
        Takk for kjøpet! Du har nå tilgang til CV-byggeren i 3 dager.
      </p>

      <button
        onClick={() => router.push("/cv")}
        className="bg-black text-white px-6 py-3 rounded text-sm hover:opacity-90"
      >
        Gå til CV-en min
      </button>
    </div>
  )
}