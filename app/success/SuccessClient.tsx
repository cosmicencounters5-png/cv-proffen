"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SuccessClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const activate = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login")
          return
        }

        const packageType =
          searchParams.get("package") ?? "cv_only"

        const res = await fetch("/api/activate-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ packageType }),
        })

        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error || "Aktivering feilet")
        }

        setLoading(false)
      } catch (err: any) {
        console.error("❌ ACTIVATE ERROR:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    activate()
  }, [router, searchParams])

  if (loading) {
    return <p className="p-8 text-center">Aktiverer pakken din…</p>
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">
          Noe gikk galt
        </h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-8 text-center space-y-6">
      <h1 className="text-3xl font-bold">🎉 Betaling fullført</h1>

      <p>
        Pakken din er aktivert. Du har nå full tilgang til CV-verktøyet.
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