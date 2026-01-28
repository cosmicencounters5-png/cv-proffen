"use client"

import { useEffect, useState } from "react"
import CVPreview from "@/components/CVPreview"
import { CV } from "@/types/cv"

const EMPTY_CV: CV = {
  id: "local",
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

  useEffect(() => {
    async function loadCV() {
      try {
        const res = await fetch("/api/cv")
        if (res.ok) {
          const data = await res.json()
          if (data) setCv(data)
        }
      } catch (err) {
        console.error("Failed to load CV", err)
      } finally {
        setLoading(false)
      }
    }

    loadCV()
  }, [])

  async function saveCV() {
    await fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cv),
    })
    alert("CV lagret")
  }

  if (loading) {
    return <p className="p-8">Laster CV…</p>
  }

  return (
    <div className="flex gap-8 p-8">
      <div className="w-1/2">
        <button
          onClick={saveCV}
          className="mb-4 px-4 py-2 bg-black text-white rounded"
        >
          Lagre CV
        </button>

        {/* Her kommer editor senere */}
        <p className="text-sm text-gray-500">
          (Editor kommer i neste steg)
        </p>
      </div>

      <div className="w-1/2">
        <CVPreview cv={cv} />
      </div>
    </div>
  )
}