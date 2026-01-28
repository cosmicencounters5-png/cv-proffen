"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import CVPreview from "@/components/CVPreview"
import BuyButton from "@/components/BuyButton"
import { CV } from "@/types/cv"

type Access = {
  active: boolean
  package: "cv_only" | "cv_and_application"
  expires_at: string
}

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
  const [access, setAccess] = useState<Access | null>(null)
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

      // 1️⃣ hent CV
      const cvRes = await fetch("/api/cv", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const cvJson = await cvRes.json()
      if (cvJson?.data) setCv(cvJson.data)

      // 2️⃣ hent tilgang
      const accessRes = await fetch("/api/access", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const accessJson = await accessRes.json()
      setAccess(accessJson)

      setLoading(false)
    }

    load()
  }, [router])

  const saveCV = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) return

    await fetch("/api/cv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(cv),
    })
  }

  if (loading) return <p className="p-8">Laster…</p>

  const canUseApplication =
    access?.active && access.package === "cv_and_application"

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <button
        onClick={saveCV}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Lagre CV
      </button>

      <CVPreview cv={cv} />

      {/* 🔒 Søknad */}
      <div className="border-t pt-6">
        {canUseApplication ? (
          <p className="text-green-700 font-medium">
            ✅ Du har tilgang til søknad og AI
          </p>
        ) : (
          <div className="space-y-3">
            <p className="font-semibold">🔒 Søknad er låst</p>
            <p className="text-sm text-gray-600">
              Oppgrader for å få AI-generert søknad tilpasset stillingen.
            </p>
            <BuyButton packageType="cv_and_application" />
          </div>
        )}
      </div>
    </div>
  )
}