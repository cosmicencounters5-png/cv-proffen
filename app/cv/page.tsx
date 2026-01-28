"use client"

import { useEffect, useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"

const EMPTY_CV: CV = {
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
  const [saving, setSaving] = useState(false)

  // LAST CV VED REFRESH
  useEffect(() => {
    fetch("/api/cv")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setCV(res.data)
      })
  }, [])

  // LAGRE CV
  async function saveCV(updatedCV: CV) {
    setSaving(true)
    setCV(updatedCV)

    await fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCV),
    })

    setSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Eksempel på input */}
      <input
        className="border p-2 w-full"
        placeholder="Fornavn"
        value={cv.personal.firstName}
        onChange={(e) =>
          saveCV({
            ...cv,
            personal: { ...cv.personal, firstName: e.target.value },
          })
        }
      />

      <CVPreview cv={cv} />

      {saving && <p className="text-sm text-gray-500">Lagrer…</p>}
    </div>
  )
}