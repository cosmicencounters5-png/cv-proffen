"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseBrowser"
import CVPreview from "@/components/CVPreview"
import LogoutButton from "@/components/LogoutButton"
import EditableSection from "@/components/EditableSection"
import { CV } from "@/types/cv"
import EditableExperience from "@/components/EditableExperience"
import EditableEducation from "@/components/EditableEducation"

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
  const [sessionToken, setSessionToken] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      // 1️⃣ Hent session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      setSessionToken(session.access_token)

      // 2️⃣ Hent CV
      const res = await fetch("/api/cv/get", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!res.ok) {
        console.error("CV fetch failed", res.status)
        setLoading(false)
        return
      }

      const data = await res.json()

      if (Array.isArray(data) && data.length > 0) {
        setCv(data[0])
      } else {
        setCv(EMPTY_CV)
      }

      setLoading(false)
    }

    load()
  }, [router, supabase])

  // 3️⃣ Lagre oppdatert CV (brukes av EditableSection)
  const saveCv = async (updatedCv: CV) => {
    if (!sessionToken) return

    const res = await fetch("/api/cv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(updatedCv),
    })

    if (!res.ok) {
      alert("Kunne ikke lagre CV")
      return
    }

    const saved = await res.json()
    setCv(saved)
  }

  if (loading) {
    return <p className="p-8">Laster CV…</p>
  }

  return (
  <div className="max-w-5xl mx-auto p-6 space-y-8">
    <div className="flex justify-end">
      <LogoutButton />
    </div>

    {/* ✍️ REDIGERING */}
    <section className="space-y-6">
      <EditableSection
        title="Profil / Sammendrag"
        value={cv.summary}
        onSave={newText =>
          saveCv({
            ...cv,
            summary: newText,
          })
        }
      />

      <EditableExperience
        value={cv.experience}
        onSave={items =>
          saveCv({
            ...cv,
            experience: items,
          })
        }
      />
    </section>

    {/* 👀 FORHÅNDSVISNING */}
    <section>
      <h2 className="font-semibold mb-2">Forhåndsvisning</h2>
      <CVPreview cv={cv} />
    </section>
  </div>
)
}