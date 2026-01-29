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
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      // 🔐 SJEKK TILGANG
      const accessRes = await fetch("/api/access", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const accessJson = await accessRes.json()

      if (!accessJson.access) {
        router.push("/pricing")
        return
      }

      // 📄 LAST CV
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