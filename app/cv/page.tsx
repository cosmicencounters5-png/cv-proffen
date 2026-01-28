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
  const [loadingAI, setLoadingAI] = useState(false)

  const generateSummary = async () => {
    try {
      setLoadingAI(true)

      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cv),
      })

      const data = await res.json()

      if (data.summary) {
        setCv((prev) => ({
          ...prev,
          summary: data.summary,
        }))
      }
    } catch (err) {
      console.error("AI error", err)
      alert("Kunne ikke generere sammendrag")
    } finally {
      setLoadingAI(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* ===== LEFT: FORM ===== */}
      <div>
        <h1 className="text-xl font-bold mb-4">Rediger CV</h1>

        {/* PERSONLIG */}
        <input
          className="border p-2 w-full mb-2"
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
          className="border p-2 w-full mb-2"
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
          className="border p-2 w-full mb-2"
          placeholder="Ønsket stilling"
          value={cv.personal.title}
          onChange={(e) =>
            setCv({
              ...cv,
              personal: { ...cv.personal, title: e.target.value },
            })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="E-post"
          value={cv.personal.email}
          onChange={(e) =>
            setCv({
              ...cv,
              personal: { ...cv.personal, email: e.target.value },
            })
          }
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="Telefon"
          value={cv.personal.phone}
          onChange={(e) =>
            setCv({
              ...cv,
              personal: { ...cv.personal, phone: e.target.value },
            })
          }
        />

        {/* AI BUTTON */}
        <button
          type="button"
          onClick={generateSummary}
          disabled={loadingAI}
          className="bg-black text-white px-4 py-2 mb-4"
        >
          {loadingAI ? "Genererer..." : "✨ Generer sammendrag med AI"}
        </button>

        {/* SUMMARY EDIT */}
        <textarea
          className="border p-2 w-full h-32"
          placeholder="Sammendrag"
          value={cv.summary}
          onChange={(e) => setCv({ ...cv, summary: e.target.value })}
        />
      </div>

      {/* ===== RIGHT: PREVIEW ===== */}
      <CVPreview cv={cv} />
    </div>
  )
}