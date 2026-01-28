"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"

const USER_ID = "00000000-0000-0000-0000-000000000001"

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
  const [cv, setCv] = useState<CV>(EMPTY_CV)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchCV = async () => {
      const { data } = await supabase
        .from("cvs")
        .select("id, data")
        .eq("user_id", USER_ID)
        .single()

      if (data?.data) {
        setCv({ ...data.data, id: data.id })
      }

      setLoading(false)
    }

    fetchCV()
  }, [])

  const saveCV = async () => {
    setSaving(true)

    await supabase
      .from("cvs")
      .upsert(
        {
          user_id: USER_ID,
          data: cv,
        },
        { onConflict: "user_id" }
      )

    setSaving(false)
  }

  if (loading) return <p className="p-8">Laster CV…</p>

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Rediger CV</h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Fornavn"
          value={cv.personal.firstName}
          onChange={(e) =>
            setCv({
              ...cv,
              personal: { ...cv.personal, firstName: e.target.value },
            })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Etternavn"
          value={cv.personal.lastName}
          onChange={(e) =>
            setCv({
              ...cv,
              personal: { ...cv.personal, lastName: e.target.value },
            })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Ønsket stilling"
          value={cv.personal.title}
          onChange={(e) =>
            setCv({
              ...cv,
              personal: { ...cv.personal, title: e.target.value },
            })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Sammendrag"
          value={cv.summary}
          onChange={(e) => setCv({ ...cv, summary: e.target.value })}
        />

        <button
          onClick={saveCV}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Lagre CV
        </button>
      </div>

      <CVPreview cv={cv} />
    </div>
  )
}