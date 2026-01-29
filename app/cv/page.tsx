"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import CVPreview from "@/components/CVPreview"
import { CV } from "@/types/cv"

const EMPTY_CV: CV = {
  id: "",
  personal: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
}

export default function CVPage() {
  const router = useRouter()
  const [cv, setCv] = useState<CV>(EMPTY_CV)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // 1️⃣ Sjekk innlogging
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const userId = session.user.id

      // 2️⃣ Sjekk aktiv pakke
      const { data: purchase } = await supabase
        .from("purchases") // ← bruk ditt faktiske tabellnavn
        .select("id")
        .eq("user_id", userId)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle()

      if (!purchase) {
        // ❌ Ingen aktiv pakke → kjøp
        router.push("/cv")
        return
      }

      // 3️⃣ Last CV
      const res = await fetch("/api/cv", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const json = await res.json()
      if (json?.data) setCv(json.data)

      setLoading(false)
    }

    load()
  }, [router])

  if (loading) {
    return <p className="p-8">Laster CV…</p>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <CVPreview cv={cv} />
    </div>
  )
}