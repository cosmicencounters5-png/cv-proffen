"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import BuyButton from "@/components/BuyButton"
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
  const [hasAccess, setHasAccess] = useState(false)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      // 1️⃣ sjekk tilgang
      const accessRes = await fetch(
        `/api/access?userId=${session.user.id}`
      )
      const accessJson = await accessRes.json()

      setHasAccess(accessJson.access)
      setExpiresAt(accessJson.expiresAt)

      // regn ut dager igjen
      if (accessJson.expiresAt) {
        const now = new Date()
        const expiry = new Date(accessJson.expiresAt)
        const diffMs = expiry.getTime() - now.getTime()
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
        setDaysLeft(diffDays > 0 ? diffDays : 0)
      }

      // 2️⃣ last CV kun hvis tilgang
      if (accessJson.access) {
        const res = await fetch("/api/cv", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })

        const json = await res.json()
        if (json?.data) setCv(json.data)
      }

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

  if (loading) {
    return <p className="p-8">Laster…</p>
  }

  // ❌ INGEN TILGANG → KJØP
  if (!hasAccess) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Fullfør kjøp</h1>
        <p>
          Du må ha aktiv tilgang for å redigere og laste ned CV-en din.
        </p>
        <BuyButton packageType="cv_only" />
      </div>
    )
  }

  // ✅ TILGANG → CV
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      {daysLeft !== null && (
        <div className="rounded bg-yellow-100 text-yellow-800 px-4 py-2 text-sm">
          {daysLeft === 0
            ? "Tilgangen din utløper i dag"
            : `Du har ${daysLeft} dag${daysLeft > 1 ? "er" : ""} igjen av tilgangen`}
        </div>
      )}

      <button
        onClick={saveCV}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Lagre CV
      </button>

      <CVPreview cv={cv} />
    </div>
  )
}