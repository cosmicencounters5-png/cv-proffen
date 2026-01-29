"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const activatePurchase = async () => {
      if (!sessionId) {
        setError("Mangler betalingsreferanse.")
        setLoading(false)
        return
      }

      // 1️⃣ Hent innlogget bruker
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const userId = session.user.id

      // 2️⃣ Kall backend for å aktivere pakken
      const res = await fetch("/api/stripe/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ sessionId }),
      })

      if (!res.ok) {
        setError("Noe gikk galt ved aktivering av pakken.")
        setLoading(false)
        return
      }

      setLoading(false)
    }

    activatePurchase()
  }, [router, sessionId])

  if (loading) {
    return <p className="p-8 text-center">Aktiverer pakken din…</p>
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-8 text-center space-y-4">
      <h1 className="text-2xl font-bold">🎉 Betaling fullført!</h1>
      <p>
        Pakken din er aktivert. Du har nå tilgang til CV-verktøyet.
      </p>

      <button
        onClick={() => router.push("/cv")}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Gå til CV-en min
      </button>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Laster…</p>}>
      <SuccessContent />
    </Suspense>
  )
}