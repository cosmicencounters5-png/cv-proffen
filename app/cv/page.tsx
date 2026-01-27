"use client"

import { useEffect, useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"
import ExperienceSection from "@/components/ExperienceSection"
import EducationSection from "@/components/EducationSection"
import SkillsSection from "@/components/SkillsSection"

const EMPTY_CV: CV = {
  id: "new",
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

export default function CVPage() {
  const [cv, setCV] = useState<CV>(EMPTY_CV)
  const [loaded, setLoaded] = useState(false)

  // Load CV
  useEffect(() => {
    fetch("/api/cv")
      .then((res) => res.json())
      .then((data) => {
        if (data) setCV(data)
        setLoaded(true)
      })
  }, [])

  // Auto-save
  useEffect(() => {
    if (!loaded) return
    fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cv),
    })
  }, [cv, loaded])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Editor */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 print-hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Bygg CV</h1>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Last ned PDF
            </button>
          </div>

          {/* Personalia */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Personalia</h2>

            {[
              ["Fornavn", "firstName"],
              ["Etternavn", "lastName"],
              ["Tittel / rolle", "title"],
              ["E-post", "email"],
              ["Telefon", "phone"],
            ].map(([label, key]) => (
              <input
                key={key}
                placeholder={label}
                value={(cv.personal as any)[key]}
                onChange={(e) =>
                  setCV({
                    ...cv,
                    personal: {
                      ...cv.personal,
                      [key]: e.target.value,
                    },
                  })
                }
                className="w-full border rounded px-3 py-2"
              />
            ))}
          </section>

          <ExperienceSection cv={cv} setCV={setCV} />
          <EducationSection cv={cv} setCV={setCV} />
          <SkillsSection cv={cv} setCV={setCV} />
        </div>

        {/* Preview */}
        <div className="sticky top-6 h-fit">
          <CVPreview cv={cv} />
        </div>
      </div>
    </div>
  )
}