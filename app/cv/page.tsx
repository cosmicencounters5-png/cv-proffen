"use client"

import { useState } from "react"
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
  const [loading, setLoading] = useState(false)

  async function generateSummary() {
    setLoading(true)

    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: cv.personal.title,
        experience: cv.experience
          .map((e) => `${e.role} hos ${e.company}`)
          .join(", "),
      }),
    })

    const data = await res.json()

    setCv({ ...cv, summary: data.summary })
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <input
        placeholder="Ønsket stilling"
        className="border p-2 w-full"
        value={cv.personal.title}
        onChange={(e) =>
          setCv({
            ...cv,
            personal: { ...cv.personal, title: e.target.value },
          })
        }
      />

      <button
        onClick={generateSummary}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Genererer..." : "Generer sammendrag med AI"}
      </button>

      <CVPreview cv={cv} />
    </div>
  )
}