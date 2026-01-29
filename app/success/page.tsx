"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const activatePackage = async () => {
      try {
        // 1️⃣ Sjekk innlogging
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError || !session) {
          router.push("/login")
          return
        }

        const userId = session.user.id

        // 2️⃣ Sjekk om bruker allerede har aktiv pakke
        const { data: existingPurchase } = await supabase
          .from("purchases")
          .select("id")
          .eq("user_id", userId)
          .gt("expires_at", new Date().toISOString())
          .maybeSingle()

        if (existingPurchase) {
          // Allerede aktiv → rett til CV
          router.push("/cv")
          return
        }

        // 3️⃣ Finn siste kjøpte pakke (fra Stripe-flowen din)
        // Midlertidig: default til cv_only (kan utvides senere)
        const packageType: "cv_only" | "cv_and_application" = "cv_only"

        // 4️⃣ Sett utløp (3 dager)
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 3)

        // 5️⃣ Opprett purchase
        const { error: insertError } = await supabase
          .from("purchases")
          .insert({
            user_id: userId,
            package_type: packageType,
            expires_at: expiresAt.toISOString(),
          })

        if (insertError) {
          console.error(insertError)
          setError("Noe gikk galt ved aktivering av pakken.")
          return
        }

        // 6️⃣ Ferdig → CV
        router.push("/cv")
      } catch (err) {
        console.error(err)
        setError("Noe gikk galt. Prøv igjen.")
      } finally {
        setLoading(false)
      }
    }

    activatePackage()
  }, [router])

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h1 className="text-xl font-semibold">Aktiverer pakken din…</h1>
        <p className="text-gray-600 mt-2">
          Dette tar bare et øyeblikk
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h1 className="text-xl font-semibold text-red-600">
          Noe gikk galt
        </h1>
        <p className="text-gray-700 mt-3">{error}</p>
        <button
          onClick={() => router.push("/pricing")}
          className="mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Gå til priser
        </button>
      </div>
    )
  }

  return null
}