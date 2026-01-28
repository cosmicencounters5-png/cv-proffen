"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"

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

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
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