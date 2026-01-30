"use client"

import LogoutButton from "@/components/LogoutButton"
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
      // 1️⃣ Sjekk login
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      const userId = session.user.id

      // 2️⃣ Sjekk tilgang (has_cv + expires_at)
      const { data: entitlement, error } = await supabase
        .from("user_entitlements")
        .select("has_cv, expires_at")
        .eq("user_id", userId)
        .maybeSingle()

      console.log("ENTITLEMENT FRONTEND:", entitlement)

      if (
        error ||
        !entitlement ||
        !entitlement.has_cv ||
        !entitlement.expires_at ||
        new Date(entitlement.expires_at) < new Date()
      ) {
        router.replace("/pricing")
        return
      }

      // 3️⃣ Last CV
      const res = await fetch("/api/cv", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const json = await res.json()
      if (json?.data) {
        setCv(json.data)
      }

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
return (
  <div className="max-w-5xl mx-auto p-6 space-y-4">
    <div className="flex justify-end">
      <LogoutButton />
    </div>

    <CVPreview cv={cv} />
  </div>
)