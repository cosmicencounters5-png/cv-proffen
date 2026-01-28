"use client"

import { useEffect, useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"

const EMPTY_CV: CV = {
  id: "temp",
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
  const [cv, setCv] = useState<CV>(EMPTY_CV)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCV() {
      const res = await fetch("/api/cv")
      const data = await res.json()

      if (data.cv) {
        setCv(data.cv)
      }

      setLoading(false)
    }

    loadCV()
  }, [])

  if (loading) {
    return <p>Laster CV...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CVPreview cv={cv} />
    </div>
  )
}