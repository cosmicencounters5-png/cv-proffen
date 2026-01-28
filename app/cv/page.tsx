"use client"

import { useEffect, useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"
import ExperienceSection from "@/components/ExperienceSection"
import EducationSection from "@/components/EducationSection"

const EMPTY_CV: CV = {
  id: "local",
  summary: "",
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
  const [loading, setLoading] = useState(true)

  // 🔁 Hent CV ved refresh
  useEffect(() => {
    fetch("/api/cv/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.cv) setCV(data.cv)
        setLoading(false)
      })
  }, [])

  async function saveCV() {
    await fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cv),
    })
    alert("CV lagret")
  }

  if (loading) return <p>Laster…</p>

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <button
          onClick={saveCV}
          className="mb-4 px-4 py-2 bg-black text-white rounded"
        >
          Lagre CV
        </button>

        <ExperienceSection
          experience={cv.experience}
          onChange={(experience) =>
            setCV({ ...cv, experience })
          }
        />

        <EducationSection
          cv={cv}
          setCV={setCV}
        />
      </div>

      <CVPreview cv={cv} />
    </div>
  )
}