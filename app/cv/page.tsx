"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import CVPreview from "@/components/CVPreview"
import BuyButton from "@/components/BuyButton"
import { CV } from "@/types/cv"
import { supabase } from "@/lib/supabaseClient"

const EMPTY_CV: CV = {
  personal: {
    id: "temp",
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
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const res = await fetch("/api/cv", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const json = await res.json()

      if (json?.data) {
        setCv(json.data)

        const expiresAt = new Date(json.expires_at)
        const now = new Date()

        setIsExpired(now > expiresAt)
      }

      setLoading(false)
    }

    load()
  }, [router])

  const saveCV = async () => {
    if (isExpired) return

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

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {isExpired && (
        <div className="border border-red-400 bg-red-50 p-4 rounded">
          <p className="font-semibold text-red-700">
            Tilgangen din er utløpt
          </p>
          <p className="text-sm text-red-600 mt-1">
            Du kan se CV-en, men må kjøpe på nytt for å redigere eller laste ned.
          </p>

          <div className="mt-4">
            <BuyButton packageType="cv_only" />
          </div>
        </div>
      )}

      {!isExpired && (
        <button
          onClick={saveCV}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Lagre CV
        </button>
      )}

      <CVPreview cv={cv} />
    </div>
  )
}