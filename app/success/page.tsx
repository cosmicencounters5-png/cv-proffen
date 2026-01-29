"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const activate = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      const res = await fetch("/api/activate-purchase", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!res.ok) {
        setError("Noe gikk galt ved aktivering av pakken.")
        setLoading(false)
        return
      }

      router.replace("/cv")
    }

    activate()
  }, [router])

  if (loading) {
    return <p className="p-8">Aktiverer pakken din…</p>
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>
  }

  return null
}