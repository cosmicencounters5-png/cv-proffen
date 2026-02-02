"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseBrowser"

import LogoutButton from "@/components/LogoutButton"
import CVPreview from "@/components/CVPreview"
import EditableTextSection from "@/components/EditableTextSection"
import EditableExperience from "@/components/EditableExperience"
import EditableEducation from "@/components/EditableEducation"
import EditableSkills from "@/components/EditableSkills"

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
  const supabase = useMemo(() => createClient(), [])

  const [cv, setCv] = useState<CV>(EMPTY_CV)
  const [loading, setLoading] = useState(true)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  // 🔐 Session + entitlement + CV
  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      setSessionToken(session.access_token)
      const userId = session.user.id

      // ✅ Entitlement-sjekk
      const { data: entitlement, error } = await supabase
        .from("user_entitlements")
        .select("has_cv")
        .eq("user_id", userId)
        .maybeSingle()

      if (error || !entitlement?.has_cv) {
        router.replace("/pricing")
        return
      }

      // 📄 Hent CV
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

  // 💾 Lagre CV
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

  // 🤖 AI – forbedre hele CV
  const improveFullCv = async () => {
    if (!sessionToken) return

    setAiLoading(true)

    try {
      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          type: "full-cv",
          content: cv,
        }),
      })

      if (!res.ok) {
        alert("AI-feil")
        return
      }

      const { result } = await res.json()

      const improvedCv = JSON.parse(result)

      await saveCv({
        ...cv,
        ...improvedCv,
      })
    } catch (err) {
      console.error(err)
      alert("Kunne ikke forbedre CV-en")
    } finally {
      setAiLoading(false)
    }
  }

  if (loading) {
    return <p className="p-8">Laster CV…</p>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <button
          onClick={improveFullCv}
          disabled={aiLoading}
          className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-50"
        >
          🤖 {aiLoading ? "Forbedrer…" : "Forbedre hele CV-en"}
        </button>

        <LogoutButton />
      </div>

      {/* ✍️ REDIGERING */}
      <section className="space-y-6">
        <EditableTextSection
          title="Profil / Sammendrag"
          value={cv.summary}
          onSave={summary =>
            saveCv({
              ...cv,
              summary,
            })
          }
        />

        <EditableExperience
          value={cv.experience}
          onSave={experience =>
            saveCv({
              ...cv,
              experience,
            })
          }
        />

        <EditableEducation
          value={cv.education}
          onSave={education =>
            saveCv({
              ...cv,
              education,
            })
          }
        />

        <EditableSkills
          value={cv.skills}
          onSave={skills =>
            saveCv({
              ...cv,
              skills,
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