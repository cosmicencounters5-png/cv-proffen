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
      {expiresAt && (
        <p className="text-sm text-gray-500">
          Tilgang utløper:{" "}
          {new Date(expiresAt).toLocaleDateString("no-NO")}
        </p>
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