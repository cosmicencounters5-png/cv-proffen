"use client"

import { useEffect, useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"
import ExperienceSection from "@/components/ExperienceSection"
import EducationSection from "@/components/EducationSection"

function createEmptyCV(): CV {
  return {
    id: crypto.randomUUID(),
    personal: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
    },
    experience: [],
    education: [],
    skills: [],
  }
}

export default function CVPage() {
  const [cv, setCV] = useState<CV>(createEmptyCV())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/cv")
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) setCV(res.data)
      })
  }, [])

  async function saveCV(updatedCV: CV) {
    setCV(updatedCV)
    setSaving(true)

    await fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCV),
    })

    setSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* PERSONALIA */}
      <section className="space-y-2">
        <h1 className="text-xl font-bold">CV</h1>

        <input
          className="border p-2 w-full"
          placeholder="Fornavn"
          value={cv.personal.firstName}
          onChange={(e) =>
            saveCV({
              ...cv,
              personal: {
                ...cv.personal,
                firstName: e.target.value,
              },
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Etternavn"
          value={cv.personal.lastName}
          onChange={(e) =>
            saveCV({
              ...cv,
              personal: {
                ...cv.personal,
                lastName: e.target.value,
              },
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Ønsket stilling"
          value={cv.personal.title}
          onChange={(e) =>
            saveCV({
              ...cv,
              personal: {
                ...cv.personal,
                title: e.target.value,
              },
            })
          }
        />
      </section>

      {/* ARBEIDSERFARING */}
      <ExperienceSection cv={cv} onChange={saveCV} />

      {/* UTDANNING */}
      <EducationSection cv={cv} onChange={saveCV} />

      {/* PREVIEW */}
      <CVPreview cv={cv} />

      {saving && (
        <p className="text-sm text-gray-500">Lagrer…</p>
      )}
    </div>
  )
}