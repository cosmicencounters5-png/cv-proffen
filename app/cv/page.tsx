"use client"

import { useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"

const EMPTY_CV: CV = {
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

export default function CVPage() {
  const [cv, setCV] = useState<CV>(EMPTY_CV)

  async function saveCV() {
    const res = await fetch("/api/cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cv),
    })

    if (!res.ok) {
      alert("Feil ved lagring")
      return
    }

    alert("CV lagret 🎉")
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={saveCV}
        className="mb-4 px-4 py-2 bg-black text-white rounded"
      >
        Lagre CV
      </button>

      <CVPreview cv={cv} />
    </div>
  )
}