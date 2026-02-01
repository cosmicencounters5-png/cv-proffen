"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseBrowser"
import CVPreview from "@/components/CVPreview"
import LogoutButton from "@/components/LogoutButton"
import { CV } from "@/types/cv"
import EditableSection from "@/components/EditableSection"

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
  const supabase = createClient()

  const [cv, setCv] = useState<CV>(EMPTY_CV)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // 1️⃣ Session fra RIKTIG browser-client
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      // 2️⃣ Last CV fra riktig endpoint
      const res = await fetch("/api/cv/get", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!res.ok) {
        console.error("CV fetch failed", res.status)
        router.replace("/pricing")
        return
      }

      const data = await res.json()

      // API returnerer array
      if (Array.isArray(data) && data.length > 0) {
        setCv(data[0])
      } else {
        // Ingen CV enda → tom mal
        setCv(EMPTY_CV)
      }

      setLoading(false)
    }

    load()
  }, [router, supabase])

  if (loading) {
    return <p className="p-8">Laster CV…</p>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex justify-end">
        <LogoutButton />
      </div>

      <CVPreview cv={cv} />
    </div>
  )
}